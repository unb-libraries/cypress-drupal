class Widget {
  constructor(name, options = {}) {
    this.name = name
    this.options = {
      multiValue: false,
      ...options
    }
  }

  get enter() {
    return cy.get(this.selector)[this.method]
  }

  get selector() {
    return `[name="${this.name}${this.selectorIndex}[${this.selectorProperty}]"]`
  }

  get selectorName() {
    return this.name
  }

  get selectorIndex() {
    return !this.options.multiValue ? '[0]' : ''
  }

  get selectorProperty() {
    return 'value'
  }

  get method() {
    return 'type'
  }
}

class Autocomplete extends Widget {
  get selectorProperty() {
    return 'target_id'
  }

  get method() {
    return 'drupalSearchAndSelect'
  }
}

class FileSelect extends Widget {
  get selector() {
    return `[name="files[${this.selectorName}_${this.selectorIndex}]"]`
  }

  get selectorIndex() {
    return !this.options.multiValue ? '0' : ''
  }

  get method() {
    return 'selectFile'
  }
}

module.exports = {
  default: Widget,
  input: Widget,
  number: Widget,
  text: Widget,
  autocomplete: Autocomplete,
  file: FileSelect,
}