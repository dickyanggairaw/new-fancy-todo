const errorHelper = require('../helpers/errorHelper')

const errorHandler = (err, req, res, next)=>{
    if(err.code == 404){
        res.status(err.code).json({message: err.msg})
    }else if(err.code == 500){
        res.status(err.code).json({message: err.message})
    }else{
        const error = errorHelper(err.errors)
        res.status(500).json(error)
    }
}
module.exports = errorHandler