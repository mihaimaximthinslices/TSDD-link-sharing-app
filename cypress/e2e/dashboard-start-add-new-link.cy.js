describe('add new link', () => {
  describe('given the user is logged in with an empty account', () => {
    beforeEach(() => {
      cy.login('mihai.maxim+empty@thinslices.com', 'password1234')
    })

    it('should add a new link with proper elements when no other links are added', () => {
      cy.visit('http://localhost:3000/dashboard')

      cy.get('[data-cy="add-new-link-button"]').click()

      cy.get('[data-cy="nav-link-card"]').should('exist')
      cy.get('[data-cy="nav-link-card-title"]').should('exist')
      cy.get('[data-cy="nav-link-card-remove"]').should('exist')
      cy.get('[data-cy="nav-link-card-platform"]').should('exist')
      cy.get('[data-cy="nav-link-card-link"]').should('exist')

      cy.get('[data-cy="nav-link-card-platform"]').click()
      cy.get('[data-cy="nav-link-card-platform-option-github"]').should(
        'be.visible',
      )
      cy.get(
        '[data-cy="nav-link-card-platform-option-frontend-mentor"]',
      ).should('be.visible')
      cy.get('[data-cy="nav-link-card-platform-option-twitter"]').should(
        'be.visible',
      )

      cy.get('[data-cy="nav-link-card-platform-option-github"]').click()
      cy.get('[data-cy="nav-link-card-link"]').type(
        'https://github.com/example',
      )
      cy.get('[data-cy="nav-link-card-remove"]').click()

      cy.get('[data-cy="nav-link-card"]').should('not.exist')
    })

    it('should support all the link options', () => {
      cy.visit('http://localhost:3000/dashboard')

      cy.get('[data-cy="add-new-link-button"]').click()

      cy.get('[data-cy="nav-link-card"]').should('exist')
      cy.get('[data-cy="nav-link-card-title"]').should('exist')
      cy.get('[data-cy="nav-link-card-remove"]').should('exist')
      cy.get('[data-cy="nav-link-card-platform"]').should('exist')
      cy.get('[data-cy="nav-link-card-link"]').should('exist')

      const platformOptions = [
        'GitHub',
        'Frontend Mentor',
        'Twitter',
        'LinkedIn',
        'Youtube',
        'Facebook',
        'Twitch',
        'Dev.to',
        'Codewars',
        'Codepen',
        'freeCodeCamp',
        'gitLab',
        'Hashnode',
        'Stack Overflow',
      ]

      platformOptions.forEach((platform) => {
        cy.get('[data-cy="nav-link-card-platform"]').click()
        cy.get(
          `[data-cy="nav-link-card-platform-option-${platform
            .toLowerCase()
            .replace(/\s+/g, '-')}]`,
        ).click()

        cy.get('[data-cy="nav-link-card-link"]').type(
          `https://${platform.toLowerCase()}.com/example`,
        )

        cy.get('[data-cy="nav-link-card-remove"]').click()

        cy.get('[data-cy="add-new-link-button"]').click()
      })

      cy.get('[data-cy="nav-link-card"]').should('not.exist')
    })

    it('should increment the title element for new links when other links are added', () => {
      cy.visit('http://localhost:3000/dashboard')

      cy.get('[data-cy="add-new-link-button"]').click()
      cy.get('[data-cy="nav-link-card-title"]').eq(0).type('Link #1')
      cy.get('[data-cy="nav-link-card-platform"]').eq(0).click()
      cy.get('[data-cy="nav-link-card-platform-option-github"]').click()
      cy.get('[data-cy="nav-link-card-link"]')
        .eq(0)
        .type('https://github.com/link1')
      cy.get('[data-cy="nav-link-card-remove"]').eq(0).click()

      cy.get('[data-cy="add-new-link-button"]').click()
      cy.get('[data-cy="nav-link-card-title"]').eq(1).type('Link #2')
      cy.get('[data-cy="nav-link-card-platform"]').eq(1).click()
      cy.get('[data-cy="nav-link-card-platform-option-twitter"]').click()
      cy.get('[data-cy="nav-link-card-link"]')
        .eq(1)
        .type('https://twitter.com/link2')
      cy.get('[data-cy="nav-link-card-remove"]').eq(1).click()

      cy.get('[data-cy="nav-link-card-title"]').should(($newTitles) => {
        expect($newTitles).to.have.length(2)
        expect($newTitles[0]).to.contain('Link #1')
        expect($newTitles[1]).to.contain('Link #2')
      })
    })

    it('should show a scroll bar when links overflow the container', () => {
      cy.visit('http://localhost:3000/dashboard')

      cy.get('[data-cy="link-container"]').should(
        'have.css',
        'overflow-y',
        'scroll',
      )
    })
  })
})
