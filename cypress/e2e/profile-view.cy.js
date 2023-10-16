describe('Profile page view tests', () => {
  describe('given I am not logged in', () => {
    describe('given I visit and empty profile', () => {
      it('should see an empty profile page', () => {
        cy.visit('http://localhost:3000/profile/null')
        cy.get('[data-cy="profile-page-card"]').should('exist')
        cy.get('[data-cy="profile-page-image"]').should('not.exist')
        cy.get('[data-cy="profile-page-email"]').should('not.exist')
        cy.get('[data-cy="profile-page-name"]').should('not.exist')
        cy.get('[data-cy="profile-page-link"]').should('not.exist')

        cy.get('[data-cy="profile-page-back-to-editor"]').should('not.exist')
        cy.get('[data-cy="profile-page-share"]').should('not.exist')
      })
    })

    describe('given I visit a valid profile', () => {
      it('should see a full profile page with 3 links', () => {
        cy.visit(
          `http://localhost:3000/profile/2c1ba19e-4340-4e64-ac56-68865ec31e0f`,
        )

        cy.intercept(
          '/api/public/profile/2c1ba19e-4340-4e64-ac56-68865ec31e0f',
        ).as('getProfile')

        cy.wait('@getProfile')
        cy.get('[data-cy="profile-page-card"]').should('exist')
        cy.get('[data-cy="profile-page-image"]').should('exist')
        cy.get('[data-cy="profile-page-email"]').should('exist')
        cy.get('[data-cy="profile-page-name"]').should('exist')
        cy.get('[data-cy="profile-view-link-placeholder"]').should(
          'have.length',
          3,
        )

        cy.get('[data-cy="profile-page-back-to-editor"]').should('not.exist')
        cy.get('[data-cy="profile-page-share"]').should('not.exist')
      })
    })
  })

  describe('given I am logged in', () => {
    beforeEach(() => {
      cy.login('mihai.maxim+full@thinslices.com', 'password1234')
    })

    describe('given I visit an empty profile', () => {
      it('should see an empty profile page and back to editor & share link buttons', () => {
        cy.visit('http://localhost:3000/profile/null')
        cy.get('[data-cy="profile-page-card"]').should('exist')
        cy.get('[data-cy="profile-page-image"]').should('not.exist')
        cy.get('[data-cy="profile-page-email"]').should('not.exist')
        cy.get('[data-cy="profile-page-name"]').should('not.exist')
        cy.get('[data-cy="profile-page-link"]').should('not.exist')

        cy.get('[data-cy="profile-page-back-to-editor"]').should('exist')
        cy.get('[data-cy="profile-page-share"]').should('exist')
      })
    })

    describe('given I visit a valid profile', () => {
      it('should see a full profile page with 3 links and back to editor & share link buttons', () => {
        cy.visit(
          `http://localhost:3000/profile/2c1ba19e-4340-4e64-ac56-68865ec31e0f`,
        )

        cy.intercept(
          '/api/public/profile/2c1ba19e-4340-4e64-ac56-68865ec31e0f',
        ).as('getProfile')

        cy.wait('@getProfile')
        cy.get('[data-cy="profile-page-card"]').should('exist')
        cy.get('[data-cy="profile-page-image"]').should('exist')
        cy.get('[data-cy="profile-page-email"]').should('exist')
        cy.get('[data-cy="profile-page-name"]').should('exist')
        cy.get('[data-cy="profile-view-link-placeholder"]').should(
          'have.length',
          3,
        )

        cy.get('[data-cy="profile-page-back-to-editor"]').should('exist')
        cy.get('[data-cy="profile-page-share"]').should('exist')
      })
    })

    describe('given I click on the back to editor button when i m on my personal profile', () => {
      it('should redirect me to my dashboard page', () => {
        cy.visit(
          `http://localhost:3000/profile/2c1ba19e-4340-4e64-ac56-68865ec31e0f`,
        )
        cy.get('[data-cy="profile-page-back-to-editor"]').click()
        cy.url().should('include', '/dashboard')

        cy.get('[data-cy="link-card"]').should('have.length', 3)
        cy.get('[data-cy="link-card-title"]').should('have.length', 3)
        cy.get('[data-cy="link-card-remove"]').should('have.length', 3)
        cy.get('[data-cy="link-card-platform"]').should('have.length', 3)
        cy.get('[data-cy="link-card-link"]').should('have.length', 3)
      })
    })

    describe('given I click on the share link button when i m on my personal profile', () => {
      it('should copy the link of the profile to dashboard', () => {
        cy.visit(
          `http://localhost:3000/profile/2c1ba19e-4340-4e64-ac56-68865ec31e0f`,
        )
        cy.get('[data-cy="profile-page-share"]').click()

        cy.get('.copy-to-clipboard-toast').should(
          'contain',
          'The link has been copied to your clipboard!',
        )
      })
    })
  })
})
