# Fancy Todo
Fancy Todo is an application to manage your assets. It performs standard CRUD actions based on RESTful concept.

This app has :

RESTful endpoint for asset's CRUD operation
JSON formatted response
 

Tech Stack used to build this app :

Node JS
Express JS framework
PostgreSQL

RESTful endpoints

## POST /todos

### Request Header

### Request Body
``` json
    {
        "title": "belajar",
        "description": "belajar bersama",
        "due_date": "2022-01-05T00:00:00.000Z",
        "updatedAt": "2021-03-01T09:35:22.776Z",
        "createdAt": "2021-03-01T09:35:22.776Z",
        "status": "unfinish"
    }
```
### Respone(201)

#### success
``` json
{
    {
    "succes": true,
    "message": "todo create",
    "newTodo": {
        "id": 23,
        "title": "800",
        "description": "baca one piece",
        "due_date": "2022-01-01T00:00:00.000Z",
        "UserId": 1,
        "updatedAt": "2021-03-02T14:15:29.523Z",
        "createdAt": "2021-03-02T14:15:29.523Z",
        "status": "unfinish"
    }
}
```

#### error
``` json
[
    {
        "msg": "date Invalid"
    }
]
```

## GET Todos

### respone
#### success
``` json
[
    {
        "id": 1,
        "title": "belajar",
        "description": "belajar bersama",
        "status": "unfinish",
        "due_date": "2022-01-05T00:00:00.000Z",
        "createdAt": "2021-03-01T09:35:22.776Z",
        "updatedAt": "2021-03-01T09:35:22.776Z"
    }
]
```
#### errors
``` json
```

## GET Todos/:id
### respone
#### success
``` json
    {
    "id": 1,
    "title": "belajar",
    "description": "belajar bersama",
    "status": "unfinish",
    "due_date": "2022-01-05T00:00:00.000Z",
    "createdAt": "2021-03-01T09:35:22.776Z",
    "updatedAt": "2021-03-01T09:35:22.776Z"
}
```
#### errors
``` json
```

## PUT todos/:id
### respone

#### success
``` json
{
    "id": 1,
    "title": "github",
    "description": "belajar bersama github",
    "status": "unfinish",
    "due_date": "2021-01-04T00:00:00.000Z",
    "createdAt": "2021-03-01T09:35:22.776Z",
    "updatedAt": "2021-03-01T13:14:04.764Z"
}
```

#### error
``` json
{
    "message": "error not found"
}
```

## PATCH /todos/:id
### respone

#### success
``` json
{
    "id": 1,
    "title": "github",
    "description": "belajar bersama github",
    "status": "finish",
    "due_date": "2021-01-04T00:00:00.000Z",
    "createdAt": "2021-03-01T09:35:22.776Z",
    "updatedAt": "2021-03-01T13:20:54.659Z"
}
```

#### error
``` json
{
    "message": "error not found"
}
```

## DELETE todos/:id
### respone

#### success
``` json
{
    "message": "todo success to delete"
}
```

#### error
``` json
```