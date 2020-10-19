import { combineReducers } from 'redux'
import { messagesReducer } from './messagesReducer'
import { appReducer, paginationReducer } from './appReducer'

export const rootReducer = combineReducers({
  messages: messagesReducer,
  app: appReducer,
  pagination: paginationReducer,
})

export type RootState = ReturnType<typeof rootReducer>
