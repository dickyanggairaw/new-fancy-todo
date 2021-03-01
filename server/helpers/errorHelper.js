function errorMessage(err){
    let result = err.map(e => {
        let obj = {
            msg: e.message
        }
        return obj
    })
    return result
}

module.exports = errorMessage