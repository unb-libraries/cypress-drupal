
class DrupalPreprocessor {
  applies(filePath) {
    return false
  }

  get extname() {
    return '.drupalcy.js'
  }

  transform(spec) {
    return spec
  }
}

module.exports = {
  drupal: new DrupalPreprocessor(),
}