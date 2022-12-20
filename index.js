const auth = require('./lib/commands/auth')
const form = require('./lib/commands/form')
const drupal = require('./lib/selectors/drupal')
const yamlWorkflow = require('./lib/preprocessors/yamlWorkflow')
const createEntity = require('./lib/workflows/createEntity')
const userPermission = require('./lib/workflows/userPermission')

module.exports = {
  auth,
  form,
  drupal,
  yamlWorkflow,
  createEntity,
  userPermission,
}