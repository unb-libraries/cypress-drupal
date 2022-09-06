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
