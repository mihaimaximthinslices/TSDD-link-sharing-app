describe('profile save functionality', () => {
  describe('given the user is logged in', () => {
    beforeEach(() => {
      cy.login('mihai.maxim@thinslices.com', 'password1234')
    })

    describe('given I don t have any links added', () => {
      it('the save button should be disabled', () => {
        cy.get('[data-cy="customize-links-section-save-button"]').should(
          'have.attr',
          'disabled',
          'true',
        )
      })
    })

    describe('given I have links added and profile details added', () => {
      it('should let me save the profile', () => {
        cy.visit('http://localhost:3000/dashboard')
        const platformOptions = [
          'Frontend Mentor',
          'Twitter',
          'LinkedIn',
          'Youtube',
          'Facebook',
        ]

        platformOptions.forEach((platform) => {
          cy.get('[data-cy="customize-links-section-add-link-button"]').click()
          cy.get('[data-cy="link-card-platform"]').last().click()
          cy.get(
            `[data-cy="link-card-platform-option-${platform
              .toLowerCase()
              .replace(/\s+/g, '-')}"]`,
          ).click()
          cy.get('[data-cy="link-card-link"]')
            .last()
            .type(`https://${platform.toLowerCase()}.com/example`)
        })

        cy.get('[data-cy="nav-profile-section-button"]').click()

        cy.get('[data-cy="update-profile-section-first-name-input"]')
          .clear()
          .type('Mihai')

        cy.get('[data-cy="update-profile-section-last-name-input"]')
          .clear()
          .type('Maxim')

        cy.get('[data-cy="customize-links-section-save-button"]').click()

        cy.get('[data-cy="save-confirm-popup"]').should('be.visible')
      })
    })

    describe('given I add links but don t complete them, or inputs do not respect the url format', () => {
      it('should not let me save the profile', () => {
        cy.visit('http://localhost:3000/dashboard')

        const platformOptionsNotCompleted = ['Frontend Mentor', 'Twitter']

        const platformOptionsInvalidUrl = ['Youtube', 'Facebook']

        platformOptionsNotCompleted.forEach((platform) => {
          cy.get('[data-cy="customize-links-section-add-link-button"]').click()
          cy.get('[data-cy="link-card-platform"]').last().click()
          cy.get(
            `[data-cy="link-card-platform-option-${platform
              .toLowerCase()
              .replace(/\s+/g, '-')}"]`,
          ).click()
        })
        platformOptionsInvalidUrl.forEach((platform) => {
          cy.get('[data-cy="customize-links-section-add-link-button"]').click()
          cy.get('[data-cy="link-card-platform"]').last().click()
          cy.get(
            `[data-cy="link-card-platform-option-${platform
              .toLowerCase()
              .replace(/\s+/g, '-')}"]`,
          ).click()
          cy.get('[data-cy="link-card-link"]').last().type(`invalid_url`)
        })

        cy.get('[data-cy="customize-links-section-save-button"]').click()

        cy.get('[data-cy="save-confirm-popup"]').should('not.be.visible')

        cy.contains("Can't be empty")
          .get("span:contains(Can't be empty)")
          .should('have.length', 3)

        cy.contains("Can't be empty")
          .get("span:contains(Can't be empty)")
          .should('have.length', 3)

        cy.contains('Please check the URL')
          .get('span:contains(Please check the URL)')
          .should('have.length', 3)
      })
    })
  })
})
