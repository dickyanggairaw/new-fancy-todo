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

    $('#edit_todo').on('click', (event)=>{
        event.preventDefault()         
        console.log('bisa')
    })

    $('#delete_todo').on('click', (event)=>{   
        event.preventDefault()  
        console.log('bisa')
    })
});

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
function checkLocalStorange(){
    if(localStorage.access_token){        
        fetchTodo()
        $('#login').hide()
        $('#logout').show()
        $('#create_todo').show()
        $('#todo_list').show()
        $('#create-form').hide()
    }else{
        $('#login').show()
        $('#logout').hide()
        $('#create_todo').hide()
        $('#todo_list').hide()
        $('#create-form').hide()
    }
};


function logout(){
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
                    <td>${todo.due_date}</td>
                    <td>${todo.status}</td>
                    <td><a href=""onclick="editTodo(event, ${todo.id})">Edit</a> | <a href="" onclick="deleteTodo(event, ${todo.id})">Delete</a></td>
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
}

function deleteTodo(event, id){
    event.preventDefault()
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