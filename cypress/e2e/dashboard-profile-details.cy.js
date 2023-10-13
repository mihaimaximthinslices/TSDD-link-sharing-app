describe('dashboard-start view', () => {
  describe('given the user is logged in with an empty account', () => {
    beforeEach(() => {
      cy.login('mihai.maxim+empty@thinslices.com', 'password1234')
    })
    it('should display the dashboard edit profile details section', () => {
      cy.visit('http://localhost:3000/dashboard')
      cy.get('[data-cy="nav-profile-section-button"]').click()

      cy.contains('Profile details title').should('be.visible')

      cy.contains(
        'Add your details to create a personal touch to your profile.',
      ).should('be.visible')

      cy.get('[data-cy="update-profile-section-image-upload-zone"]').should(
        'be.visible',
      )

      cy.get('[data-cy="update-profile-section-first-name-label"]').should(
        'be.visible',
      )
      cy.get('[data-cy="update-profile-section-first-name-input"]').should(
        'be.visible',
      )
      cy.get('[data-cy="update-profile-section-last-name-label"]').should(
        'be.visible',
      )
      cy.get('[data-cy="update-profile-section-last-name-input"]').should(
        'be.visible',
      )
      cy.get('[data-cy="update-profile-section-email-label"]').should(
        'be.visible',
      )
      cy.get('[data-cy="update-profile-section-email-input"]').should(
        'be.visible',
      )

      cy.get('[data-cy="customize-links-section-save-button"]').should(
        'be.visible',
      )
    })
  })
})
