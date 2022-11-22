const YAML = require('yaml')

class YamlWorkflowPreprocessor {
  applies(filePath) {
    return filePath.match(/.*\.yml/)
  }

  get extname() {
    return '.yml.js'
  }

  transform(spec) {
    const yaml = YAML.parse(spec)
    if (!yaml.workflow) {
      throw new Error('Could not find a workflow ID.')
    }

    const workflowId = Object.keys(yaml.workflow)[0]
    const workflowParams = JSON.stringify(yaml.workflow[workflowId])

    return `
      describe('${yaml.title}', () => {
        Cypress.Workflows.run('${workflowId}', ${workflowParams})
      })
    `
  }
}

module.exports = {
  drupal: new YamlWorkflowPreprocessor(),
}