const { Todo } = require('../models')
const errorMessage = require('../helpers/errorHelper')

class TodoController{
    static readTodos(req, res){
        Todo.findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err =>{
                res.status(500).json(err)
            })
    }
    static postTodo(req, res){
        let dataTodo = {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date
        }
        Todo.create(dataTodo)
            .then(todo => {
                res.status(201).json({succes: true, message: "todo create", todo})
            })
            .catch(err=>{
                let error = errorMessage(err.errors)

                res.status(500).json(error)
            })
    }
    static readByIdTodo(req, res){
        Todo.findOne({where:{id: req.params.id}})
            .then(data =>{
                if(data){
                    res.status(200).json(data)                    
                }
                else{
                    res.status(404).json({message: "error not found"})
                }
            })
            .catch(err =>{
                console.log(err)
                const errorMessage = err.errors[0].message
                res.status(404).json({message: errorMessage})
            })
    }
    static putTodo(req, res){
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
                        }
                    })
                }else{
                    res.status(404).json({message: "error not found"})
                }
            })
            .then(update => {
                return Todo.findOne({where:{id: update[0]}})
            })
            .then(data=>{
                res.status(200).json(data)
            })
            .catch(err=>{
                let error = errorMessage(err.errors)
                res.status(400).json(error)
            })
    }
    static patchTodo(req,res){
        console.log(req.body)
        let dataUpdate = {
            status: req.body.status
        }
        Todo.findOne({where:{id: req.params.id}})
        .then(data=>{
            if(data){
                return Todo.update(dataUpdate, {
                    where:{
                        id: data.id
                    }
                })
            }else{
                res.status(404).json({message: "error not found"})
            }
        })
        .then(update => {
            return Todo.findOne({where:{id: update[0]}})
        })
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            let error = errorMessage(err.errors)
            res.status(400).json(error)
        })
    }
    static deleteTodo(req, res){
        Todo.destroy({where:{
            id: req.params.id
        }})
            .then((data)=>{
                res.status(200).json({message: 'todo success to delete'})
            })
            .catch(err=>{
                res.status(500).json(err)
            })
    }
}

module.exports = TodoController