const input = (name) => `input[name^="${name}"]`
const text = (name) => `textarea[name^="${name}"]`
const number = input
const autocomplete = (name) => `input[name^="${name}["]`
const fileSelect = (name) => `[name^="files[${name}_"]`
const statusMessage = (type) => `.alert-status.alert-${type}`

module.exports = {
  'widget:input': input,
  'widget:text': text,
  'widget:number': number,
  'widget:autocomplete': autocomplete,
  'widget:fileselect': fileSelect,
  'status': statusMessage,
}