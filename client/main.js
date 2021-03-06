const baseUrl = `http://localhost:3000`

$(document).ready(()=> {
    checkLocalStorange()
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
        console.log('bisa')
        editTodoList()
    })

    $('#delete_todo').on('click', (event)=>{   
        event.preventDefault()  
        console.log('bisa')
    })
});

function checkLocalStorange(){
    if(localStorage.access_token){        
        fetchTodo()
        $('#login').hide()
        $('#logout').show()
        $('#create_todo').show()
        $('#todo_list').show()
        $('#create-form').hide()
        $('#edit-form').hide()
    }else{
        $('#login').show()
        $('#logout').hide()
        $('#create_todo').hide()
        $('#todo_list').hide()
        $('#create-form').hide()
        $('#edit-form').hide()
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
            console.log(err)
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
    $.ajax({
        url: baseUrl + '/todos',
        method: 'GET',
        headers: {
            access_token: localStorage.access_token
        },
    })
        .done(respone=>{
            respone.forEach(todo=>{
                const pubDate = new Date(todo.due_date);
                const month = pubDate.getMonth() + 1;
                const date = pubDate.getDate();
                const fullDate = `${pubDate.getFullYear()}-${
                month <= 9 ? "0" + month : month
                }-${date <= 9 ? "0" + date : date}`;
                console.log(fullDate)
                $('#todo_list').append(
                    `<div class="container">  
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Description</th>
                          <th>Due Date</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      <tr>
                    <td>${todo.title}</td>
                    <td>${todo.description}</td>
                    <td>${fullDate}</td>
                    <td>${todo.status}</td>
                    <td><a href=""onclick="editTodo(event, ${todo.id})">Edit</a> | <a href=""onclick="statusTodo(event, ${todo.id})">Status</a> | <a href="" onclick="deleteTodo(event, ${todo.id})">Delete</a></td>
                    </tr> 
                      </tbody>
                    </table>
                  </div>                                     
                    
                    `
                )
            })           
        })
        .fail(err=>{
            console.log(err)
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
            $('#edit-form').show()
            $('#edit-form').append(
                `
                <div>
                    <form>
                        <label for="title">Title</label>
                        <input type="text" id="edit_title" name="title" value="${response.title}" required><br><br>
                        <label for="description">Description</label>
                        <input type="text" id="edit_description" name="description" value="${response.description}" required><br><br>
                        <label for="due_date">Due Date:</label>
                        <input type="date" id="edit_due_date" name="due_date" value="${fullDate}" required><br><br>
                        <input id="btn-edit" type="submit" value="Submit" onclick="editTodoList(event, ${response.id})")>
                    </form>
                </div>
                `
            )
        })
        .fail(err => {
            console.log(err)
        })
}

function editTodoList(event, id){
    event.preventDefault()
    const title = $('#edit_title').val()
    const description = $('#edit_description').val()
    const due_date = $('#edit_due_date').val()

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
            console.log(err)
        })
}

function deleteTodo(event, id){
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
            console.log(err)
        })
}