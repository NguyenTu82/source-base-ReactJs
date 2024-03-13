import { configureStore } from '@reduxjs/toolkit'
import auth from '../slice/auth'

const rootReducer = {
  auth
}

const store = configureStore({
  reducer: rootReducer
})

export default store
