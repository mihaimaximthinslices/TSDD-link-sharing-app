describe('add new link', () => {
  describe('given the user is logged in with an empty account', () => {
    beforeEach(() => {
      cy.login('mihai.maxim+empty@thinslices.com', 'password1234')
    })

    it('should reflect in the profile-view-link-placeholder', () => {
      cy.visit('http://localhost:3000/dashboard')

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

        cy.get('[data-cy="link-card-platform-viewname"]')
          .invoke('text')
          .then((platformName) => {
            cy.get('[data-cy="profile-view-link-placeholder"]').should(
              'include.text',
              platformName,
            )
          })

        cy.get('[data-cy="link-card-remove"]').click()
      })
    })
  })
})
