module.exports = (type, name) => {
  const Input = (name) => {
    return {
      selector: `[name^="${name}["]`,
      method: 'type',
    }
  }

  const Text = (name) => {
    return Input(name)
  }

  const Number = (name) => {
    return Input(name)
  }
  
  const AutoComplete = (name) => {
    return {
      ...Input(name),
      method: 'drupalSearchAndSelect',
    }
  }
  
  const FileSelect = (name) => {
    return {
      ...Input(name),
      selector: `[name^="files[${name}_"]`,
      method: 'selectFile'
    }
  }

  const types = {
    default: Input,
    input: Input,
    text: Text,
    number: Number,
    autocomplete: AutoComplete,
    file: FileSelect,
  }

  return types.hasOwnProperty(type)
    ? types[type](name)
    : types.default(name)
}