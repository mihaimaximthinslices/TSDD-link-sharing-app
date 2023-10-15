describe('dashboard-start view', () => {
  describe('given the user is not logged in', () => {
    beforeEach(() => {
      cy.clearCookies()
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

    it('should display the dashboard start view', () => {
      cy.visit('http://localhost:3000/dashboard')
      cy.viewport(1600, 800)
      cy.get('[data-cy="customize-links-section-title"]').should('be.visible')
      cy.get('[data-cy="customize-links-section-info"]').should('be.visible')
      cy.get('[data-cy="profile-view-name-placeholder"]').should('be.visible')
      cy.get(
        '[data-cy="customize-links-section-get-started-ilustration"]',
      ).should('be.visible')
      cy.get('[data-cy="customize-links-section-save-button"]').should(
        'be.visible',
      )

      // Ensure the Navigation section
      cy.get('[data-cy="devlinks-logo"]').should('be.visible')
      cy.get('[data-cy="nav-customize-links-section-button"]').should(
        'be.visible',
      )
      cy.get('[data-cy="nav-profile-section-button"]').should('be.visible')
      cy.get('[data-cy="nav-preview-section-button"]').should('be.visible')

      cy.get(
        '[data-cy="nav-customize-links-profile-picture-placeholder"]',
      ).should('be.visible')
      cy.get('[data-cy="profile-view-name-placeholder"]').should('be.visible')
      cy.get('[data-cy="profile-view-email-placeholder"]').should('be.visible')
      cy.get('[data-cy="profile-view-link-placeholder"]').should(
        'have.length',
        5,
      )
    })
  })
})
