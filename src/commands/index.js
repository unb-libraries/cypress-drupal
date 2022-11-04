const authCommands = require('./auth')
const formCommands = require('./form')

module.exports = {
  ...authCommands,
  ...formCommands,
}