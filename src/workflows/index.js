const { createEntity } = require('./createEntity')
const userPermission = require('./userPermission')

module.exports = {
  createEntity,
  ...userPermission,
}