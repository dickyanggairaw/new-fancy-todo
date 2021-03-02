const {User} = require('../models')
const {comparePassword} = require('../helpers/bcrypt')
const {access} = require('../helpers/jwt')


class UserController{
    static registrasiUser(req, res, next){
        let regData = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(regData)
            .then(user=>{
                res.status(200).json(user)
            })
            .catch(err=>{
                next(err)
            })
    }
    static loginUser(req, res, next){
        User.findOne({where:{email: req.body.email}})
            .then(user=>{
                const correctPassword = comparePassword(req.body.password, user.password)
                if(user && correctPassword){
                    const access_token = access(user)
                    res.status(200).json({access_token})
                }else{
                    next({
                        code: 404,
                        msg: "invalid password or email"
                    })
                }
            })
            .catch(err=>{
                next({
                    code: 404,
                    msg: "invalid password or email"
                })
            })
    }
}

module.exports = UserController