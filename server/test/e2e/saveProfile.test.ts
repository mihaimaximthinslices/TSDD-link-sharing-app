import { beforeAll, describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../../app'
import { bigBase64Image, validBase64Image } from './base64Images'
const loginUser = async (email: string, password: string) => {
  const response = await request(app)
    .post('/api/login')
    .send({
      email,
      password,
    })
    .expect(200)

  const { token } = response.body

  return token
}

const getHeaders = async () => {
  let token: undefined | string
  return (async () => {
    if (!token) {
      token = await loginUser('mihai.maxim@thinslices.com', 'password1234')
    }
    return {
      Authorization: `Bearer ${token}`,
    }
  })()
}
describe.only('PUT /api/profile', () => {
  let authHeaders: {}
  beforeAll(async () => {
    authHeaders = await getHeaders()
  })
  describe('given invalid profile data', () => {
    const badRequestInvalidNameFormat = {
      name: '<script>alert("XSS")</script>',
      email: 'mihai.maxim@thinslices.com',
      lastName: 'Doe',
      links: [
        { platform: 'github', link: 'https://www.github.com/benwright' },
        { platform: 'linkedin', link: 'https://www.linkedin.com/in/benwright' },
      ],
    }
    const badRequestInvalidLastNameFormat = {
      name: 'Joe',
      email: 'mihai.maxim@thinslices.com',
      lastName: '<script>alert("XSS")</script>',
      links: [
        { platform: 'github', link: 'https://www.github.com/benwright' },
        { platform: 'linkedin', link: 'https://www.linkedin.com/in/benwright' },
      ],
    }
    const badRequestsMissingFirstName = {
      email: 'mihai.maxim@thinslices.com',
      lastName: 'Doe',
      links: [
        { platform: 'github', link: 'https://www.github.com/benwright' },
        { platform: 'linkedin', link: 'https://www.linkedin.com/in/benwright' },
      ],
    }

    const badRequestsMissingLastName = {
      email: 'mihai.maxim@thinslices.com',
      firstName: 'John',
      links: [
        { platform: 'github', link: 'https://www.github.com/benwright' },
        { platform: 'linkedin', link: 'https://www.linkedin.com/in/benwright' },
      ],
    }

    const badRequestsInvalidBase64Image = {
      email: 'mihai.maxim@thinslices.com',
      firstName: 'John',
      lastName: 'Doe',
      links: [
        { platform: 'github', link: 'https://www.github.com/benwright' },
        { platform: 'linkedin', link: 'https://www.linkedin.com/in/benwright' },
      ],
      base64ProfileImage: 'not-base64-image-data',
    }

    const badRequestsInvalidBase64ImageDimensions = {
      email: 'mihai.maxim@thinslices.com',
      firstName: 'John',
      lastName: 'Doe',
      links: [
        { platform: 'github', link: 'https://www.github.com/benwright' },
        { platform: 'linkedin', link: 'https://www.linkedin.com/in/benwright' },
      ],
      base64ProfileImage: bigBase64Image,
    }

    const badRequestsInvalidBase64ImageFormat = {
      email: 'mihai.maxim@thinslices.com',
      firstName: 'John',
      lastName: 'Doe',
      links: [
        { platform: 'github', link: 'https://www.github.com/benwright' },
        { platform: 'linkedin', link: 'https://www.linkedin.com/in/benwright' },
      ],
      base64ProfileImage: 'data:image/gif;base64,base64-image-data',
    }

    const badRequestsMissingLinks = {
      email: 'mihai.maxim@thinslices.com',
      firstName: 'John',
      lastName: 'Doe',
    }

    const badRequestsInvalidLinks = {
      email: 'mihai.maxim@thinslices.com',
      firstName: 'John',
      lastName: 'Doe',
      links: [{ platform: 'invalid', link: 'not-a-valid-url' }],
    }

    const badRequestsDuplicatePlatform = {
      email: 'mihai.maxim@thinslices.com',
      firstName: 'John',
      lastName: 'Doe',
      links: [
        { platform: 'github', link: 'https://www.github.com/benwright' },
        { platform: 'github', link: 'https://www.github.com/anotheruser' },
      ],
    }

    const badRequests = [
      badRequestInvalidNameFormat,
      badRequestInvalidLastNameFormat,
      badRequestsMissingFirstName,
      badRequestsMissingLastName,
      badRequestsInvalidBase64Image,
      badRequestsInvalidBase64ImageFormat,
      badRequestsMissingLinks,
      badRequestsInvalidLinks,
      badRequestsDuplicatePlatform,
    ]

    it.each(badRequests)('should return 400 status if %s', async (badRequest) => {
      await request(app).put('/api/profile').set(authHeaders).send(badRequest).expect(400)
    })

    it('should return 413 for images bigger images', async () => {
      await request(app).put('/api/profile').set(authHeaders).send(badRequestsInvalidBase64ImageDimensions).expect(413)
    })
  })
  describe('given valid profile data', () => {
    const availablePlatforms = [
      'github',
      'frontendmentor',
      'twitter',
      'linkedin',
      'youtube',
      'facebook',
      'twitch',
      'devto',
      'codewars',
      'codepen',
      'freecodecamp',
      'gitlab',
      'hashnode',
      'stackoverflow',
    ]

    const validRequest = {
      email: 'mihai.maxim@thinslices.com',
      firstName: 'John',
      lastName: 'Doe',
      links: availablePlatforms.map((platform) => ({
        platform,
        link: `https://www.${platform}.com/johndoe`,
      })),
      base64ProfileImage: validBase64Image,
    }

    it('should update the profile with the new data', async () => {
      await request(app).put('/api/profile').set(authHeaders).send(validRequest).expect(200)
    })
  })
})
