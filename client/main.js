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

    $('.delete_todo').on('click', ()=>{     
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
        $('#login').hide()
        $('#logout').show()
        $('#create_todo').show()
        $('#todo_list').show()
        fetchTodo()
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
                    ` 
                    <h3> title: ${todo.title} </h3>
                    <p> description: ${todo.description} </p>
                    <a href="" id="edit_todo">Edit</a>
                    <a href="" class="delete_todo/${todo.id}">Delete</a>
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
