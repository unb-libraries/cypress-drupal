const searchAndSelect = (subject, values, options) => {
  if (typeof values === 'string') {
    return searchAndSelect(subject, [values], options)
  }
  
  options = {searchTermLength: 3, ...options}
  values.forEach((value, index) => {
    cy.wrap(subject).type((index > 0 ? ', ' : '') + value.substr(0, options.searchTermLength))
    cy.get('ul.ui-widget.ui-autocomplete:visible')
      .contains(value)
      .click()
  })
}

const selectFile = (originalFn, element, files, options) => {
  if (typeof files === 'string') {
    return selectFile(originalFn, element, [files], options)
  }
  
  options = {waitForUpload: false, filesFolder: `${Cypress.config().fixturesFolder}/files`, ...options}
  files = files.map(file => `${options.filesFolder}/${file}`)
  if (options.waitForUpload) {
    cy.location('pathname').then(pathname => {
      cy.intercept('POST', `${pathname}?element_parents=*/widget/*`, req => {
        req.on('response', res => res.setDelay(1000))
      }).as('fileUpload')
      originalFn(element, files, options)
      cy.wait('@fileUpload')
    })
  }
  else {
    originalFn(element, files, options)
  }
}

Cypress.Commands.overwrite('selectFile', selectFile)
Cypress.Commands.add('drupalSearchAndSelect', {prevSubject: 'element'}, searchAndSelect)