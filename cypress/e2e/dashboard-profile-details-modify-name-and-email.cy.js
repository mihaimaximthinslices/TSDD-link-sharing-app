describe('Profile Editing and Verification', () => {
  beforeEach(() => {
    cy.login('mihai.maxim+empty@thinslices.com', 'password1234')
  })

  it('changes to first name, last name and email should appear in profile view', () => {
    cy.visit('http://localhost:3000/dashboard')

    cy.viewport(1600, 800)
    cy.get('[data-cy="nav-profile-section-button"]').click()

    cy.get('[data-cy="update-profile-section-first-name-input"]')
      .clear()
      .type('Mihai')

    cy.get('[data-cy="profile-view-name-placeholder"]').should(
      'include.text',
      'Mihai',
    )

    cy.get('[data-cy="update-profile-section-last-name-input"]')
      .clear()
      .type('Maxim')

    cy.get('[data-cy="profile-view-name-placeholder"]').should(
      'include.text',
      'Maxim',
    )

    cy.get('[data-cy="update-profile-section-email-input"]')
      .clear()
      .type('mihai.maxim@thinslices.com')

    cy.get('[data-cy="profile-view-email-placeholder"]').should(
      'include.text',
      'mihai.maxim@thinslices.com',
    )
  })
})
