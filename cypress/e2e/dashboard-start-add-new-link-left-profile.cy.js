describe('add new link', () => {
  describe('given the user is logged in with an empty account', () => {
    beforeEach(() => {
      cy.login('mihai.maxim+empty@thinslices.com', 'password1234')
    })

    it('should reflect in the profile-view-link-placeholder', () => {
      cy.visit('http://localhost:3000/dashboard')

      cy.viewport(1600, 800)
      const platformOptions = [
        'Frontend Mentor',
        'Twitter',
        'LinkedIn',
        'Youtube',
        'Facebook',
        'Twitch',
        'Devto',
        'Codewars',
        'Codepen',
        'freeCodeCamp',
        'gitLab',
        'Hashnode',
        'StackOverflow',
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
          .invoke('val')
          .then((url) => {
            cy.get('[data-cy="profile-view-link-placeholder"]').should(
              'include.text',
              url,
            )
          })

        cy.get('[data-cy="link-card-link"]').type(`https://${platform}`)

        cy.get('[data-cy="link-card-platform-viewname"]')
          .invoke('text')
          .then((platformName) => {
            cy.get('[data-cy="profile-view-link-placeholder"]').should(
              'include.text',
              platformName,
            )
          })

        cy.get('[data-cy="link-card-remove"]').click()
        cy.get('[data-cy="link-card-platform-viewname"]').should('not.exist')
      })

      platformOptions.forEach((platform, index) => {
        cy.get('[data-cy="customize-links-section-add-link-button"]').click()
        cy.get('[data-cy="link-card-platform"]').eq(index).click()

        cy.get(
          `[data-cy="link-card-platform-option-${platform
            .toLowerCase()
            .replace(/\s+/g, '-')}"]`,
        ).click()

        cy.get('[data-cy="link-card-link"]')
          .eq(index)
          .invoke('val')
          .then((url) => {
            cy.get('[data-cy="profile-view-link-placeholder"]')
              .eq(index)
              .should('include.text', url)
          })

        cy.get('[data-cy="link-card-link"]')
          .eq(index)
          .type(`https://${platform}`)

        cy.get('[data-cy="link-card-platform-viewname"]')
          .eq(index)
          .invoke('text')
          .then((platformName) => {
            cy.get('[data-cy="profile-view-link-placeholder"]').should(
              'include.text',
              platformName,
            )
          })
      })

      cy.get('[data-cy="profile-view-link-container"]').should(
        'have.css',
        'overflow-y',
        'scroll',
      )
    })
  })
})
