import { IMessage } from '../react-app-env'

export const SET_DESK = 'SET_DESK'
export const SET_PLAYER = 'SET_PLAYER'
export const SET_PLAYERS = 'SET_PLAYERS'
export const SEND_MESSAGE = 'SEND_MESSAGE'
export const FETCH_MESSAGES = 'FETCH_MESSAGES'
export const SHOW_LOADER = 'SHOW_LOADER'
export const HIDE_LOADER = 'HIDE_LOADER'
export const FETCH_DESKS = 'FETCH_DESKS'
export const FETCH_PLAYERS = 'FETCH_PLAYERS'
export const FETCH_ALL = 'FETCH_ALL'
export const SET_PAGINATION_COUNTER = 'SET_PAGINATION_COUNTER'
export const INCREASE_PAGINATION_COUNTER = 'INCREASE_PAGINATION_COUNTER'
export const SET_MESSAGES = 'SET_MESSAGES'
export const FETCH_MORE_MESSAGES = 'FETCH_MORE_MESSAGES'
export const INCREASE_AMOUNT_MESSAGES = 'INCREASE_AMOUNT_MESSAGES'
export const SET_AMOUNT_MESSAGES = 'SET_AMOUNT_MESSAGES'

export interface ISetPlayerAction {
  type: typeof SET_PLAYER
  payload: number
}

export interface ISendMessageAction {
  type: typeof SEND_MESSAGE
  payload: IMessage
}

export interface IFetchMessagesAction {
  type: typeof FETCH_MESSAGES
  payload: IMessage[]
}

export interface ISetMessagesAction {
  type: typeof SET_MESSAGES
  payload: []
}


export interface ISetAmountMessagesAction {
  type: typeof SET_AMOUNT_MESSAGES
  payload: number
}

export type IMessagesActions = ISendMessageAction | IFetchMessagesAction | ISetMessagesAction | ISetAmountMessagesAction
