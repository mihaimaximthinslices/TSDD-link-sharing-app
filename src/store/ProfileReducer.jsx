import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
  id: null,
  email: null,
  firstName: null,
  lastName: null,
  links: [],
  base64ProfileImage: null,
}
export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    initProfile: (state, action) => {
      let links = action.payload.links

      delete action.payload.links

      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key]
      })

      links = links.map((link, index) => {
        return {
          ...link,
          order: index + 1,
          id: uuidv4(),
        }
      })
      state.links = links
    },
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
  initProfile,
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
