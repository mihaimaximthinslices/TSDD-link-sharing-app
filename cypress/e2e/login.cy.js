describe('login flow', () => {
  describe('given the user is not logged in', () => {
    beforeEach(() => {
      cy.clearCookies()
    })
    it('should display the login page', () => {
      cy.visit('http://localhost:3000/login')
      cy.contains('Login')

      cy.get('[data-cy="login-button"]').should('exist')

      cy.get('[data-cy="email-address-input-label"]').should('exist')
      cy.get('[data-cy="email-address-input"]').should('exist')
      cy.get('[data-cy="password-input-label"]').should('exist')
      cy.get('[data-cy="password-input"]').should('exist')

      cy.get('a[href="/register"]').should('exist')
    })
  })
  describe('given the inputs are not completed', () => {
    it('should display "Can\'t be empty" text two times', () => {
      cy.visit('http://localhost:3000/login')

      cy.get('[data-cy="login-button"]').click()

      cy.contains("Can't be empty")
        .get("span:contains(Can't be empty)")
        .should('have.length', 2)
    })
  })
  describe('given the user provides invalid credentials', () => {
    const invalidCredentials = {
      email: 'mihai.maxim@thinslices.com',
      password: 'thisiswrong',
    }

    it('should display "Please check again" errors', () => {
      cy.visit('http://localhost:3000/login')

      cy.get('[data-cy="email-address-input"]').type(invalidCredentials.email)

      cy.get('[data-cy="password-input"]').type(invalidCredentials.password)

      cy.get('[data-cy="login-button"]').click()

      cy.contains('Please check again')
        .get('span:contains(Please check again)')
        .should('have.length', 2)
    })
  })

  describe('given the user provides valid credentials', () => {
    const validCredentials = {
      email: 'mihai.maxim@thinslices.com',
      password: 'password1234',
    }

    it('should redirect me to /dashboard', () => {
      cy.visit('http://localhost:3000/login')

      cy.get('[data-cy="email-address-input"]').type(validCredentials.email)

      cy.get('[data-cy="password-input"]').type(validCredentials.password)

      cy.get('[data-cy="login-button"]').click()

      cy.url().should('include', '/dashboard')

      cy.getCookie('token').should('exist')
    })
  })
})
