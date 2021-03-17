const { Todo } = require('../models')
const axios = require('axios');

class TodoController{
    static readTodos(req, res, next){
        Todo.findAll({
            order:[['id', 'DESC']]
        })
            .then(data => {
                let todos = data.map(el => {
                    return {
                        id: el.id,
                        title: el.title,
                        description: el.title,
                        status: el.status,
                        due_date: el.due_date,
                        UserId: el.UserId
                    }
                })
                res.status(200).json(todos)
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
                    res.status(200).json({
                        id: data.id,
                        title: data.title,
                        description: data.description,
                        status: data.status,
                        due_date: data.due_date,
                        UserId: data.UserId
                    })                    
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
    static async putTodo(req, res, next){
        try {
            const dataUpdate = {
                title: req.body.title,
                description: req.body.description,
                due_date: req.body.due_date
            }
            const todo = await Todo.update(dataUpdate, {
                where:{
                    id: req.params.id
                },
                returning: true
            })
            console.log(todo)
            const todos = todo[1].map(el=>{
                return {
                    id: el.id,
                    title: el.title,
                    description: el.description,
                    status: el.status,
                    due_date: el.due_date,
                    UserId: el.UserId
                }
            })
            res.status(200).json(todos)
        } catch (error) {
            next({
                code: 500,
                message: "internal server error"
            })
        }
    }
    static patchTodo(req, res, next){
        console.log(req.params.id)
        Todo.findOne({where:{id: req.params.id}})
        .then(data=>{
            console.log(data)
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
            res.status(200).json({
                id: data[1][0].id,
                title: data[1][0].title,
                description: data[1][0].description,
                status: data[1][0].status,
                due_date: data[1][0].due_date,
                UserId: data[1][0].UserId
            })
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