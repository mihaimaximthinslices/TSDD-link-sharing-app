describe('profile save functionality', () => {
  describe('given the user is logged in', () => {
    beforeEach(() => {
      cy.login('mihai.maxim+empty@thinslices.com', 'password1234')
    })

    describe('given I don t have any links added', () => {
      it('the save button should be disabled', () => {
        cy.visit('http://localhost:3000/dashboard')

        cy.get('[data-cy="customize-links-section-save-button"]').should(
          'have.attr',
          'disabled',
          'disabled',
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

        cy.intercept('PUT', '/api/profile', {
          statusCode: 200,
        }).as('updateProfile')

        cy.intercept('GET', '/api/profile', {
          body: {
            profile: {
              base64ProfileImage:
                'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAA',
              createdAt: '2023-10-16T06:48:43.645Z',
              email: 'mihai.maxim@thinslices.com',
              firstName: 'Mihai',
              id: '2c1ba19e-4340-4e64-ac56-68865ec31e0f',
              lastName: 'Maxim',
              links: [
                { platform: 'youtube', link: 'https://www.youtube.com/' },
                {
                  platform: 'github',
                  link: 'https://github.com/mihaimaximthinslices/tsdd-link-sharing-app',
                },
                {
                  platform: 'linkedin',
                  link: 'https://www.linkedin.com/in/mihai-maxim-1259bb218/',
                },
              ],
              updatedAt: '2023-10-16T12:59:13.447Z',
              userId: 'ccd2577c-ac94-4774-9e01-5950b7ddcff3',
            },
            statusCode: 200,
          },
        }).as('getProfile')

        cy.get('[data-cy="customize-links-section-save-button"]').click()

        cy.wait('@updateProfile')

        cy.wait('@getProfile')

        cy.get('.save-changes-success-toast').should(
          'contain',
          'Your changes have been successfully saved!',
        )
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

        cy.get('.save-changes-success-toast').should('not.exist')

        cy.contains("Can't be empty")
          .get("span:contains(Can't be empty)")
          .should('have.length', 2)

        cy.contains('Please check the URL')
          .get('span:contains(Please check the URL)')
          .should('have.length', 2)
      })
    })
  })
})
