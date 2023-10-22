import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: '',
  name: '',
  email: '',
  phone: '',
  avatar: '',
  access_token: '',
  role: 'student',
}

export const userSlide = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { _id = '', name = '', email = '', phone = '', avatar = '', access_token = '', role } = action.payload
      state.id = _id
      state.name = name
      state.email = email
      state.phone = phone
      state.avatar = avatar
      state.access_token = access_token
      state.role = role
    },
    resetUser: (state) => {
      state.id = ''
      state.name = ''
      state.email = ''
      state.phone = ''
      state.avatar = ''
      state.access_token = ''
      state.role = 'student'
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer