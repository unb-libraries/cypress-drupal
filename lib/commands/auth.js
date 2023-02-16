const login = (username, password) => {
  cy.session(username, () => {
    cy.visit('/user/login')
    cy.get('form').within(() => {
      cy.get('input[name="name"]').type(username)
      cy.get('input[name="pass"]').type(password)
    }).submit()
  })
}

const loginAs = (userOrRole) => {
  cy.fixture("users").then(users => {
    const user = Array.isArray(users)
      ? users.find(user => user.name === userOrRole || user.roles.includes(userOrRole))
      : Object.values(users).find(user => user.name === userOrRole || user.roles.includes(userOrRole))
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
