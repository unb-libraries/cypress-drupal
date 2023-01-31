const searchAndSelect = (subject, values, options) => {
  if (typeof values === 'string') {
    return searchAndSelect(subject, [values], options)
  }

  options = {searchTermLength: 3, ...options}
  values.forEach((value, index) => {
    cy.wrap(subject).type((index > 0 ? ', ' : '') + value.substr(0, options.searchTermLength))
    cy.get('ul.ui-widget.ui-autocomplete:visible', {withinSubject: null})
      .contains(value)
      .click()
  })
}

const enter = (subject, value) => {
  // Form
  if (subject.prop('tagName') === 'FORM') {
    return cy.wrap(subject).within(() => {
      Object.entries(value).forEach(([key, value]) => {
        cy.getBySelector(key.includes(':') ? `widget:${key}` : `widget:input:${key}`)
          .enter(value)
      })
    })
  }

  // Autocomplete widget
  if (subject.attr('class').includes('form-autocomplete')) {
    return cy.wrap(subject).searchAndSelect(value)
  }

  // File select widget
  if (subject.attr('type') === 'file') {
    cy.fixture(`files/${value}`).as(value)
    return cy.wrap(subject).selectFile(`@${value}`)
  }

  return cy.wrap(subject).type(value)
}

const submit = (originalFn, element, options) => {
  cy.wrap(element)
    .getBySelector('form:submit:_')
    .click()
}

module.exports = {
  searchAndSelect: {
    type: 'child',
    subject: 'element',
    fn: searchAndSelect,
  },
  enter: {
    type: 'child',
    subject: 'element',
    fn: enter,
  },
  submit: {
    method: 'overwrite',
    type: 'child',
    subject: 'element',
    fn: submit,
  }
}
