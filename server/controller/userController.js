const {User} = require('../models')
const {comparePassword} = require('../helpers/bcrypt')
const {access} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');


class UserController{
    static async googleOauth(req, res, next) {
        try {
          const id_token = req.body.id_token;
          const client = new OAuth2Client(process.env.CLIENT_ID);
          const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: process.env.CLIENT_ID,
          });
          const { email } = ticket.getPayload();
    
          const user = await User.findOrCreate({
            where: {
              email,
            },
            defaults: {
              email,
              password: `${Math.floor(Math.random() * 1e6)}`,
            },
          });
          const token = access(user[0]);
    
          res.status(200).json({ access_token: token });
        } catch (err) {
          next({
            data: err,
          });
        }
      }
    static registerUser(req, res, next){
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