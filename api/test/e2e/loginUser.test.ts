import { expect, describe, it, beforeEach } from 'vitest'
import app from '../../api/app'
import request from 'supertest'

describe('POST /login', () => {
  describe('given the credentials do not have the right format', () => {
    const badCredentialsMissingPassword = {
      email: 'mihai.maxim@thinslices.com',
    }
    const badCredentialsMissingEmail = {
      password: 'password1234',
    }
    const badCredentialsMissingEmailAndPassword = {}

    const badCredentialsInvalidEmailAddressFormat = {
      email: 'this is not an email',
      password: 'password1234',
    }

    const badCredentialsShortPassword = {
      email: 'mihai.maxim@thinslices.com',
      password: '1234',
    }

    const badCredentialsInvalidTypes = {
      email: 123,
      password: 123,
    }

    const badCredentials = [
      badCredentialsMissingPassword,
      badCredentialsMissingEmail,
      badCredentialsMissingEmailAndPassword,
      badCredentialsInvalidEmailAddressFormat,
      badCredentialsShortPassword,
      badCredentialsInvalidTypes,
    ]

    it.each(badCredentials)('should return 400 status if %s', async (badCredential) => {
      await request(app).post('/login').send(badCredential).expect(400)
    })
  })

  describe('given the credentials have the right format', () => {
    const credentials = {
      email: 'not_found@thinslices.com',
      password: 'password1234',
    }

    describe('given the email does not belong to an user', () => {
      it('should return 401 status', async () => {
        await request(app).post('/login').send(credentials).expect(401)
      })
    })

    describe('given the email belongs to an user', () => {
      beforeEach(() => {
        credentials.email = 'mihai.maxim@thinslices.com'
      })

      describe('given the password is incorrect', () => {
        beforeEach(() => {
          credentials.password = 'wrong_password'
        })
        it('should return 401 status', async () => {
          await request(app).post('/login').send(credentials).expect(401)
        })
      })

      describe('given the password is correct', () => {
        beforeEach(() => {
          credentials.password = 'password1234'
        })
        it('should return 200 status with a token (in response body and in set-cookie header)', async () => {
          const response = await request(app).post('/login').send(credentials).expect(200)
          expect(response.body.token).toBeDefined()
          expect(response.headers['set-cookie']).toBeDefined()
        })
      })
    })
  })
})
