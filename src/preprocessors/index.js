const YAML = require('yaml')

class DrupalPreprocessor {
  applies(filePath) {
    return filePath.match(/.*\.yml/)
  }

  get extname() {
    return '.drupal.cy.js'
  }

  transform(spec) {
    const yaml = YAML.parse(spec)
    return `
      describe('${yaml.title}', () => {
        it('should work', () => {
          expect(true).to.be.true
        })
      })
    `
  }
}

module.exports = {
  drupal: new DrupalPreprocessor(),
}