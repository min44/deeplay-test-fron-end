import {
  SET_PLAYER,
  SET_DESK,
  FETCH_DESKS,
  FETCH_PLAYERS,
  SET_PLAYERS,
  SET_PAGINATION_COUNTER,
  INCREASE_PAGINATION_COUNTER,
} from './types'

const initialState = {
  desks: [],
  players: [],
  currentDesk: undefined,
  currentPlayer: undefined,
  currentPlayers: [],
  waypoint: 0,
}

export const appReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_DESK:
      return { ...state, currentDesk: action.payload }
    case SET_PLAYER:
      return { ...state, currentPlayer: action.payload }
    case SET_PLAYERS:
      return { ...state, currentPlayers: action.payload }
    case FETCH_DESKS:
      return { ...state, desks: action.payload }
    case FETCH_PLAYERS:
      return { ...state, players: action.payload }
    default:
      return state
  }
}

const paginationCounter = 0

export const paginationReducer = (state = paginationCounter, action: any) => {
  switch (action.type) {
    case SET_PAGINATION_COUNTER:
      return action.payload
    case INCREASE_PAGINATION_COUNTER:
      return state + 1
    default:
      return state
  }
}
