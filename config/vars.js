// create a secret for auth-router.js
module.exports = {
    jwSecret: process.env.JWT_SECRET || 'keepitsecret,keepitsafe!'
}