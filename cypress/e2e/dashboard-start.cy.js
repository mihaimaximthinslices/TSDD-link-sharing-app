describe('dashboard-start view', () => {
  describe('given the user is not logged in', () => {
    beforeEach(() => {
      beforeEach(() => {
        cy.clearCookies()
      })
    })
    it('should redirect me to /login', () => {
      cy.visit('http://localhost:3000/dashboard')

      cy.url().should('include', '/login')
    })
  })

  describe('given the user is logged in with an empty account', () => {
    beforeEach(() => {
      cy.login('mihai.maxim+empty@thinslices.com', 'password1234')
    })
    it('should default me to the customize your link empty page', () => {
      cy.visit('http://localhost:3000/dashboard')

      it('Should check elements in Customize Your Links section', () => {
        cy.get('[data-cy="customize-links-section-title"]').should('be.visible')
        cy.get('[data-cy="customize-links-section-info"]').should('be.visible')
        cy.get('[data-cy="customize-links-section-add-link-button"]').should(
          'be.visible',
        )
        cy.get(
          '[data-cy="customize-links-section-get-started-ilustration"]',
        ).should('be.visible')
        cy.get('[data-cy="customize-links-section-save-button"]').should(
          'be.visible',
        )
      })

      // Ensure the Navigation section
      it('Should check elements in the Navigation section', () => {
        cy.get('[data-cy="devlinks-logo"]').should('be.visible')
        cy.get('[data-cy="nav-customize-links-section-button"]').should(
          'be.visible',
        )
        cy.get('[data-cy="nav-profile-section-button"]').should('be.visible')
        cy.get('[data-cy="nav-preview-section-button"]').should('be.visible')
      })

      // Ensure the illustration on a large screen
      it('Should check elements in the large screen illustration', () => {
        cy.viewport(1200, 800)
        cy.get('[data-cy="nav-customize-links-profile-picture-placeholder"]').should(
          'be.visible',
        )
        cy.get('[data-cy="nav-customize-links-profile-name-placeholder"]').should(
          'be.visible',
        )
        cy.get('[data-cy="nav-customize-links-profile-email-placeholder"]').should(
          'be.visible',
        )
        cy.get('[data-cy="nav-customize-links-profile-link-placeholder"]').should(
          'have.length',
          5,
        )
      })
    })
  })
})
