const { grant, deny } = require('./userPermission')

function createEntity(ctx) {
  const { entityType, users, formUrl, formData, successMessage, successUrl } = {
    entityType: ctx.formUrl.split('/')[0],
    users: {
      authorized: [],
      unauthorized: [],
    },
    successMessage: '',
    successUrl: '',
    ...ctx,
  }

  const { authorized, unauthorized } = users
  if (authorized.length) {
    grant(formUrl, authorized)
  }
  if (unauthorized.length) {
    deny(formUrl, unauthorized)
  }

  context('Form submission', () => {
    it(`should create a new ${entityType} entity`, () => {
      if (authorized.length) {
        cy.loginAs(authorized[0])
      }
      cy.visit(formUrl)
      cy.get('form')
        .enter(formData)
        .submit()
      
      if (successUrl) {
        cy.url()
            .should('match', RegExp(successUrl))
      }
  
      if (successMessage) {
        cy.get('[data-drupal-messages] .alert-success')
          .should('contain', successMessage)
      }
    })
  })
}

module.exports = {
  createEntity,
}