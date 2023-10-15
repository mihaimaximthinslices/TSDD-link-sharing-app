import { createSlice } from '@reduxjs/toolkit'

const initialLinks = [
  // {
  //   order: 1,
  //   id: 'link-1',
  //   platform: 'github',
  //   link: 'https://www.github.com/benwright',
  // },
  // {
  //   order: 2,
  //   id: 'link-2',
  //   platform: 'youtube',
  //   link: 'https://www.youtube.com/benwright',
  // },
  // {
  //   order: 3,
  //   id: 'link-3',
  //   platform: 'facebook',
  //   link: 'https://www.facebook.com/benwright',
  // },
]
const initialState = {
  email: null,
  firstName: null,
  lastName: null,
  links: initialLinks,
  base64ProfileImage: '',
}
export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setLinks: (state, action) => {
      state.links = action.payload
    },
    setBase64ProfileImage: (state, action) => {
      state.base64ProfileImage = action.payload
    },

    setFirstName: (state, action) => {
      if (action.payload === '') {
        state.firstName = null
      } else {
        state.firstName = action.payload
      }
    },

    setFirstNameError: (state, action) => {
      if (action.payload === null) {
        delete state.firstNameError
      }
      state.firstNameError = action.payload
    },

    setLastName: (state, action) => {
      if (action.payload === '') {
        state.lastName = null
      } else {
        state.lastName = action.payload
      }
    },

    setLastNameError: (state, action) => {
      state.lastNameError = action.payload
    },

    setEmail: (state, action) => {
      if (action.payload === '') {
        state.email = null
      } else {
        state.email = action.payload
      }
    },

    setEmailError: (state, action) => {
      state.emailError = action.payload
    },
  },
})

export const {
  setLinks,
  setBase64ProfileImage,
  setFirstName,
  setLastName,
  setEmail,
  setEmailError,
  setFirstNameError,
  setLastNameError,
} = profileSlice.actions

export default profileSlice.reducer
