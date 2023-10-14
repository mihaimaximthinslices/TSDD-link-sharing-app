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
  },
})

export const { setLinks, setBase64ProfileImage } = profileSlice.actions

export default profileSlice.reducer
