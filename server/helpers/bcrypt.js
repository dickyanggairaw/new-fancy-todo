const bcrypt = require('bcryptjs')

const hashPassword = (password) =>{
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

const comparePassword = (input, passwordDB) => {
    return bcrypt.compareSync(input, passwordDB)
}

module.exports = {hashPassword, comparePassword}