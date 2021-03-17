const baseUrl = `https://fancy-todo-ku.herokuapp.com`
// const baseUrl = `http://localhost:3000`

$(document).ready(()=> {
    checkLocalStorange()
    $('#nav-login').on('click', (event)=>{    
        event.preventDefault()    
        $("#login").show()
        $("#register").hide()
    });

    $('#nav-register').on('click', (event)=>{    
        event.preventDefault()    
        $("#login").hide()
        $("#register").show()
    });

    $('#btn-register').on('click', (event)=>{    
        event.preventDefault()    
        register()
    });

    $('#btn-submit').on('click', (event)=>{    
        event.preventDefault()    
        login()
    });

    $('#logout').on('click', (event)=>{
        event.preventDefault() 
        logout()
    })

    $('#create_todo').on('click', (event)=>{
        event.preventDefault()
        $('#todo_list').hide() 
        $('#create-form').show()
    })

    $('#btn-create').on('click', (event)=>{    
        event.preventDefault()    
        create()
    });
    $('#btn-edit').on('click', (event)=>{    
        event.preventDefault()    
        const id = localStorage.selectedId
        editTodoList(id)
    });
});

function checkLocalStorange(){
    if(localStorage.access_token){ 
        $('#login').hide()
        $('#register').hide()
        $('#logout').show()
        $('#create_todo').show()
        $('#todo_list').show()
        $('#create-form').hide()
        $('#edit-form').hide()  
        $('#btn-add').show()   
        $('#nav-login').hide() 
        $('#nav-register').hide()   
        fetchTodo()
    }else{
        $('#login').show()
        $('#register').hide()
        $('#logout').hide()
        $('#create_todo').hide()
        $('#todo_list').hide()
        $('#create-form').hide()
        $('#edit-form').hide()
        $('#nav-login').show() 
        $('#nav-register').show() 
    }
};

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    url: `${baseUrl}/goauth`,
    method: "POST",
    data: {
      id_token,
    },
  })
    .done((res) => {
      localStorage.setItem("access_token", res.access_token);
      checkLocalStorange();
    })
    .fail((err) => {
      alert("Internal Server Error");
    });}

function register(){
    const email = $('#register-email').val()
    const password = $('#register-password').val()

    $.ajax({
        url: baseUrl + '/register',
        method: 'POST',
        data:{
            email,
            password
        }
    })
        .done(()=>{
            alert("Succes register User")
            $("#login").show()
            $("#register").hide()
        })
        .fail(()=>{
            alert("email has required")
        })
        .always(()=>{
            $('#register-email').val("")
            $('#register-password').val("")
        })
}

function login(){
    const email = $('#email').val()
    const password = $('#password').val()
    
    $.ajax({
        url: baseUrl + '/login',
        method: 'POST',
        data:{
            email,
            password
        }
    })
        .done(response => {
            localStorage.setItem("access_token", response.access_token)
            checkLocalStorange()
        })
        .fail(err => {
            alert("Invalid password or email")
        })
        .always(()=>{
            $('#email').val("")
            $('#password').val("")
        });
};


function logout(){
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log("User signed out.");
    });
    localStorage.removeItem("access_token");
    checkLocalStorange()
}

function fetchTodo(){
    $('#todo_list').empty();

    $.ajax({
        url: baseUrl + '/todos',
        method: 'GET',
        headers: {
            access_token: localStorage.access_token
        },
    })
        .done(respone=>{
            for(let i = 0 ; i < respone.length ; i++){
                let todo = respone[i]
                const pubDate = new Date(todo.due_date);
                const month = pubDate.getMonth() + 1;
                const date = pubDate.getDate();
                const fullDate = `${pubDate.getFullYear()}-${
                month <= 9 ? "0" + month : month
                }-${date <= 9 ? "0" + date : date}`;
                $('#todo_list').append(
                    `
                    <div style="margin: 20px" class="col-3">
                        <div>
                            <div class="card">
                            <div class="card-body">
                                <h2 class="card-title" id="edit_title">${todo.title}</h2>
                                <h6 class="card-subtitle mb-2 text-muted" id="edit_description">${todo.description}</h6>
                                <p class="card-text" id="edit_due_date">${fullDate}</p>
                                <p class="card-text" id="edit_due_date">${todo.status}</p>
                                <button class="btn btn-sm btn-primary w-20" onclick="editTodo(event, ${todo.id})">Edit</button> 
                                <button class="btn btn-sm btn-success w-20" onclick="statusTodo(event, ${todo.id})">Status</button>
                                <button class="btn btn-sm btn-danger w-20" onclick="deleteTodo(${todo.id})">Delete</button>
                            </div>
                            </div>
                        </div>
                    </dev>                               
                    
                    `
                )
            }           
        })
        .fail(err=>{
            alert("invalid server")
        })
}

function create(){
    const title = $('#title').val()
    const description = $('#description').val()
    const due_date = $('#due_date').val()
    
    $.ajax({
        url: baseUrl + '/todos',
        method: 'POST',
        headers:{
            access_token: localStorage.access_token
        },
        data:{
            title,
            description,
            due_date
        }
    })
        .done(response => {
            checkLocalStorange()
        })
        .fail(err => {
            console.log(err)
        })
        .always(()=>{
            $('#title').val("")
            $('#description').val("")
            $('#due_date').val("")
        });
};

function editTodo(event, id){
    event.preventDefault()
    $.ajax({
        url: baseUrl + `/todos/${id}`,
        method: 'GET',
        headers:{
            access_token: localStorage.access_token
        },
        data:{}
    })
        .done(response => {
            const pubDate = new Date(response.due_date);
            const month = pubDate.getMonth() + 1;
            const date = pubDate.getDate();
            const fullDate = `${pubDate.getFullYear()}-${month <= 9 ? "0" + month : month}-${date <= 9 ? "0" + date : date}`;
            $('#todo_list').hide()
            $('#btn-add').hide()
            localStorage.setItem('selectedId', response.id)
            $("#edit-title").val(response.title)
            $('#edit-description').val(response.description)
            $('#edit-due-date').val(fullDate)
            $('#edit-form').show()
        })
        .fail(err => {
            alert("cannot edit")
        })
}

function editTodoList(id){
    const title = $("#edit-title").val()
    const description = $('#edit-description').val()
    const due_date = $('#edit-due-date').val()
    $.ajax({
        url: baseUrl + '/todos/' + id,
        method: 'PUT',
        headers:{
            access_token: localStorage.access_token
        },
        data:{
            title,
            description,
            due_date
        }
    })
        .done(response => {
            checkLocalStorange()
        })
        .fail(err => {
            console.log(err)
        })
        .always(()=>{
            $('#edit-form').append("")
        });
}

function statusTodo(event, id){
    event.preventDefault()
    $.ajax({
        url: baseUrl + `/todos/${id}`,
        method: 'PATCH',
        headers:{
            access_token: localStorage.access_token
        },
        data:{}
    })
        .done(response => {
            checkLocalStorange()
        })
        .fail(err => {
            alert("cannot change status")
        })
}

function deleteTodo(id){
    $.ajax({
        url: baseUrl + `/todos/${id}`,
        method: 'DELETE',
        headers:{
            access_token: localStorage.access_token
        },
        data:{}
    })
        .done(response => {
            checkLocalStorange()
        })
        .fail(err => {
            alert("cannot delete")
        })
}