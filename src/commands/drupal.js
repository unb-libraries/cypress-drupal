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
