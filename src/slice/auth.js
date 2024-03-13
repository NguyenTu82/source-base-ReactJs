import { createSlice } from '@reduxjs/toolkit'
import { MainApi } from '../api/endpoint'

const auth = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token
    }
  }
})

const { reducer, actions } = auth
export const { loginSuccess } = actions
export default reducer

const login = (payload) => MainApi.post('/auth/login', payload)

export {
  login
}
