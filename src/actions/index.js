function grant(path, usernamesOrRoles) {
  if (typeof usernamesOrRoles === 'string') {
    usernamesOrRoles = [usernamesOrRoles]
  }

  usernamesOrRoles.forEach(usernameOrRole => {
    it(`should grant access to "${usernameOrRole}"`, () => {
      if (usernameOrRole !== 'anonymous') {
        cy.loginAs(usernameOrRole)
      }
      cy.request(path)
        .its('status')
        .should('eq', 200)
    })
  })
}

function deny(path, usernamesOrRoles) {
  if (typeof usernamesOrRoles === 'string') {
    usernamesOrRoles = [usernamesOrRoles]
  }

  usernamesOrRoles.forEach(usernameOrRole => {
    it(`should deny access to "${usernameOrRole}"`, () => {
      if (usernameOrRole !== 'anonymous') {
        cy.loginAs(usernameOrRole)
      }
      cy.request({
        url: path, 
        failOnStatusCode: false
      }).its('status')
        .should('match', /4[0-9]{2}/)
    })
  })
}

function enterFormData(data, options) {
  // const { submit, submitName } = {
  //   submit: true,
  //   submitName: 'op',
  //   ...options
  // }

  cy.get('form').within(() => {
    Object.entries(data).forEach(([key, value]) => {
      cy.get(key.includes(':') ? `widget:${key}` : `widget:input:${key}`)
        .enter(value)
    })

    // if (submit) {
    //   cy.get(`[name="${submitName}"]`)
    //     .click()
    // }
  })
}

module.exports = {
  grant,
  deny,
  enterFormData,
}