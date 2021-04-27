const {catchJwt} = require('../helpers/jwt')
const {User, Todo} = require('../models')

const authentication = (req, res, next) => {
    try {
        const user = catchJwt(req.headers.access_token)
        
        User.findOne({where:{
            email: user.email
        }})
                .then(()=>{
                    req.currentUser = user
                    next()
                })
                .catch(err=>{
                    throw new Error()
                })   
    } catch (error) {
        next({
            code:401,
            message: "invalid"
        })
    }
    
}

const authorization = (req, res, next) =>{
    Todo.findOne({where:{id: req.params.id}})
        .then(data=>{
            if(data.UserId == req.currentUser.id){
                next()
            }else{
                next({
                    code: 404,
                    message: "data not found"
                })
            }
        })
        .catch(err=>{
            next({
                code: 500,
                message: "internal server error"
            })
        })
}

module.exports = {authentication, authorization}