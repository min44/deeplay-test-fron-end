import { FETCH_MESSAGES, SEND_MESSAGE, IMessagesActions, SET_MESSAGES, SET_AMOUNT_MESSAGES } from './types'

const initialState = {
  messages: [
    {
      id: 0,
      text: '',
      playerId: 0,
      date: 0,
    },
  ],
  amountMessages: 0
}

export const messagesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SEND_MESSAGE:
      return { ...state, messages: state.messages.reverse().concat(action.payload).reverse() }
    case SET_MESSAGES:
      return { ...state, messages: [] }
    case SET_AMOUNT_MESSAGES:
      return { ...state, amountMessages: action.payload }
    case FETCH_MESSAGES:
      return { ...state, messages: state.messages.concat(action.payload.reverse()) }
    default:
      return state
  }
}
