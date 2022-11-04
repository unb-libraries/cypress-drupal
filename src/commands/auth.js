const login = (username, password) => {
  cy.session(username, () => {
    cy.visit('/user/login')
    cy.get('form').within(() => {
      cy.get('input[name="name"]').type(username)
      cy.get('input[name="pass"]').type(password)
    }).submit()
  })
}

const loginAs = (userRole) => {
  cy.fixture("users").then(users => {
    const user = users.find(user => user.roles.includes(userRole))
    cy.login(user.name, user.pass)
  })
}

module.exports = {
  login: {
    fn: login,
  },
  loginAs: {
    fn: loginAs,
  }
}