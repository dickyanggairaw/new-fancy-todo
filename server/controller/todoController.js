const { Todo } = require('../models')
const axios = require('axios');

class TodoController{
    static readTodos(req, res, next){
        Todo.findAll({
            order:[['id', 'ASC']]
        })
            .then(data => {
                console.log(data[0].due_date)
                // data.due_date = data.due_date.toLocaleDateString("fr-CA", {year:"numeric",month:"2-digit", day:"2-digit"})
                res.status(200).json(data)
            })
            .catch(err =>{
                next({
                    code: 500,
                    message: "internal server error"
                })
            })
    }
    static postTodo(req, res, next){
        let dataTodo = {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date,
            UserId: req.currentUser.id
        }
        let newTodo
        Todo.create(dataTodo)
            .then(todo => {
                newTodo = todo
                return axios({
                    method: 'GET',
                    url: `https://onepiececover.com/api/chapters/${todo.id}`
                  })
            })
            .then(response=>{
                let dataManga = response.data.cover_images
                res.status(201).json({succes: true, message: "todo create", newTodo, dataManga})
            })
            .catch(err=>{
                next(err)
            })
    }
    static readByIdTodo(req, res, next){
        Todo.findOne({where:{id: req.params.id}})
            .then(data =>{
                if(data){
                    res.status(200).json(data)                    
                }
                else{
                    next({
                        code:404,
                        message: "error not found"
                    })
                }
            })
            .catch(err =>{
                next({
                    code: 500,
                    message: "internal server error"
                })
            })
    }
    static putTodo(req, res, next){
        let dataUpdate = {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date
        }
        Todo.findOne({where:{id: req.params.id}})
            .then(data=>{
                if(data){
                    return Todo.update(dataUpdate, {
                        where:{
                            id: data.id
                        },
                        returning: true
                    })
                }else{
                    next({
                        code:404,
                        message: "error not found"
                    })
                }
            })
            .then(data=>{
                res.status(200).json(data)
            })
            .catch(err=>{
                next({
                    code: 500,
                    message: "internal server error"
                })
            })
    }
    static patchTodo(req, res, next){
        console.log('tes')
        Todo.findOne({where:{id: req.params.id}})
        .then(data=>{
            if(data){
                if(data.status == "finish"){
                    data.status = "unfinish"
                }else{
                    data.status = "finish"
                }
                let dataUpdate = {
                    status: data.status
                }
                console.log(dataUpdate)
                return Todo.update(dataUpdate, {
                    where:{
                        id: data.id
                    },
                    returning: true
                })
            }else{
                next({
                    code:404,
                    message: "error not found"
                })
            }
        })
        .then(data=>{
            console.log(data)
            res.status(200).json(data)
        })
        .catch(err=>{
            next({
                code: 500,
                message: "internal server error"
            })
        })
    }
    static deleteTodo(req, res, next){
        Todo.destroy({where:{
            id: req.params.id
        }})
            .then((data)=>{
                res.status(200).json({message: 'todo success to delete'})
            })
            .catch(err=>{
                next({
                    code: 500,
                    message: "internal server error"
                })
            })
    }
}

module.exports = TodoController