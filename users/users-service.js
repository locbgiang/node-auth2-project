module.exports = {
    isValidRegister,
    isVlaidLogin
}

function isValidRegister (user){
    return Boolean(user.username && user.password && typeof user.password ==='string' && user.department)
}

function isVlaidLogin(user){
    return Boolean(user.username && user.password && typeof user.password ==='string')
}