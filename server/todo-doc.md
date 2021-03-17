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
```json
  {
    "access_token": "<access_token>"
  }
```

#### Req.body
``` json
{
    "title": "<title>",
    "description": "<description>",
    "due_date": "<date>",
    "UserId": "<userId>"
}
```
### Respone(201)

#### success
``` json
{
    "id": 1,
    "title": "<title>",
    "description": "<description>",
    "UserId": "<UserId>",
    "status": "<status>",
    "due_date": "<date>"
}
```

#### error
``` json
[
    {
        "msg": "<invalid error message>"
    }
]
```

## GET Todos

#### Req header
```json
  {
    "access_token": "<access_token>"
  }
```

### respone
#### success
``` json
[
    {
        "id": "<id>",
        "title": "<title>",
        "description": "<description>",
        "status": "<status>",
        "due_date": "<date>",
        "UserId": "<UserId>"
    }
]
```
#### errors (500 - Internal Server Error)
```json
  {
    "message": "Internal Server Error"
  }
```

## GET Todos/:id

#### Req header
```json
  {
    "access_token": "<access_token>"
  }
```

#### Req.params:
```json
  {
    "id": "<id>"
  }
```

### respone
#### success
``` json
{
    "id": "<id>",
    "title": "<title>",
    "description": "<description>",
    "status": "<status>",
    "due_date": "<date>",
    "UserId": "<UserId>"
}
```
#### errors (404)
``` json
    {"message": "<error message>"}
```

## PUT todos/:id

#### Req header
```json
  {
    "access_token": "<access_token>"
  }
```

#### Req.params:
```json
  {
    "id": "<id>"
  }
```

#### Req.body
``` json
{
    "title": "<title>",
    "description": "<description>",
    "due_date": "<date>"
}
```

### respone

#### success
``` json
{
    "id": 1,
    "title": "<title>",
    "description": "<description>",
    "status": "<status>",
    "due_date": "<date>",
    "UserId": "<UserId>"
}
```

#### error (404)
``` json
{
    "message": "error not found"
}
```

#### error (500)
``` json
{
    "message": "error not found"
}
```

## PATCH /todos/:id

#### Req header
```json
  {
    "access_token": "<access_token>"
  }
```

#### Req.params:
```json
  {
    "id": "<id>"
  }
```

### respone

#### success
``` json
{
    "id": 1,
    "title": "<title>",
    "description": "<description>",
    "status": "<status>",
    "due_date": "<date>"
}
```

#### error (404)
``` json
{
    "message": "error not found"
}
```

#### error (500)
``` json
{
    "message": "error not found"
}
```
## DELETE todos/:id
### respone

#### Req header
```json
  {
    "access_token": "<access_token>"
  }
```

#### Req.params:
```json
  {
    "id": "<id>"
  }
```
#### success
``` json
{
    "message": "todo success to delete"
}
```

#### error
```json
  {
    "message": "Internal Server Error"
  }
```

## POST /Oauth

Req.body:
``` json
  {
    "token": "<access_token>"
  }
```

Response (200 - OK)
```json
  {
    "access_token": "<access_token>"
  }
```

## POST /register


#### Req.body:
```json
  {
    "email": "<email>",
    "password": "<password>"
  }
```

#### Response (200 - OK)
```json
  {
    "id": "<id>",
    "email": "<email>",
  }
```

#### Response (400 - Bad Request)
```json
  {
    "message": "<validation error message>"
  }
```

#### Response (500 - Internal Server Error)
```json
  {
    "message": "Internal Server Error"
  }
```

## POST /login

#### Req.body:
```json
  {
    "email": "<email>",
    "password": "<password>"
  }
```

#### Response (200 - OK)
```json
  {
    "access_token": "<access_token>"
  }
```

#### Response (400 - Bad Request)
```json
  {
    "message": "<validation error message>"
  }
```

#### Response (500 - Internal Server Error)
```json
  {
    "message": "Internal Server Error"
  }
```