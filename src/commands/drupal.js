Cypress.Commands.add('drupalLogin', (username, password) => {
  cy.session(username, () => {
    cy.visit('/user/login')
    cy.get('form').within(() => {
      cy.get('input[name="name"]').type(username)
      cy.get('input[name="pass"]').type(password)
    }).submit()
  })
})

Cypress.Commands.add('drupalLoginAs', (userRole) => {
  cy.fixture("users").then(users => {
    const user = users.find(user => user.roles.includes(userRole))
    cy.drupalLogin(user.name, user.pass)
  })
})

Cypress.Commands.add('drupalSearchAndSelect', {prevSubject: 'element'}, (subject, values, options = {searchTermLength: 3}) => {
  if (typeof values === 'string') {
    cy.wrap(subject).drupalSearchAndSelect([values])
  }
  else {
    values.forEach((value, index) => {
      cy.wrap(subject).type((index > 0 ? ', ' : '') + value.substr(0, options.searchTermLength))
      cy.get('ul.ui-widget.ui-autocomplete:visible')
        .contains(value)
        .click()
    })
  }
})

Cypress.Commands.overwrite('selectFile', (originalFn, element, file, options) => {
  options = {
    waitForUpload: false,
    filesFolder: `${Cypress.config().fixturesFolder}/files`,
    ...options,
  }

  if (typeof file === 'string') {
    file = [file]
  }
  const files = file.map(file => `${options.filesFolder}/${file}`)

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
})
