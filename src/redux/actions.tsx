import {
  FETCH_DESKS,
  FETCH_MESSAGES,
  FETCH_PLAYERS,
  INCREASE_PAGINATION_COUNTER,
  SET_AMOUNT_MESSAGES,
  SET_DESK,
  SET_MESSAGES,
  SET_PAGINATION_COUNTER,
  SET_PLAYER,
  SET_PLAYERS,
} from './types'

import { socket } from '../components/MainPage'
import { IMessage, IPlayer } from '../react-app-env'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { ISetPlayerAction } from './types'

const API_HOST = 'http://localhost:4000'

function getFilterQuery(currentDesk: number, players: IPlayer[]) {
  const currentPlayers = players.filter((player: IPlayer) => player.deskId === currentDesk)
  const currentPlayerIds = currentPlayers.map((player) => player.id)
  const queryFilters = currentPlayerIds.map((id) => `playerId=${id}`)
  const queryStringFilters = queryFilters.join('&')
  return { queryStringFilters, currentPlayers }
}

export function sendMessage(message: IMessage) {
  return async () => {
    socket.send(JSON.stringify(message))
    //Autoscroll to end of div
    const scroll = document.getElementById('messages')
    scroll!.scrollTop = scroll!.scrollHeight
    scroll!.animate({ scrollTop: scroll!.scrollHeight })
  }
}

export function fetchMessages(currentDesk: number, players: IPlayer[], limit: number = 10) {
  const { queryStringFilters, currentPlayers } = getFilterQuery(currentDesk, players)
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const totalCountResponse = await fetch(`${API_HOST}/messages?${queryStringFilters}&_limit=${0}`)
    const totalCount = totalCountResponse.headers.get('X-Total-Count')
    if (totalCount) {
      const totalCountToInt = parseInt(totalCount)
      const response = await fetch(
        `${API_HOST}/messages?_sort=date&${queryStringFilters}&_start=${
          totalCountToInt - limit
        }&_end=${totalCountToInt}`
      )
      const json = await response.json()
      dispatch({ type: SET_AMOUNT_MESSAGES, payload: totalCountToInt })
      dispatch({ type: FETCH_MESSAGES, payload: json })
      dispatch({ type: SET_PLAYERS, payload: currentPlayers })
      dispatch({ type: INCREASE_PAGINATION_COUNTER })
    }
  }
}

export function fetchMoreMessages(
  currentDesk: number,
  players: IPlayer[],
  counter: number,
  amountMessage: number,
  limit: number = 10
) {
  const offset = counter * limit
  const { queryStringFilters } = getFilterQuery(currentDesk, players)
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const remainder = amountMessage - offset
    if (remainder < limit) {
      limit = amountMessage - offset
    }
    if (amountMessage > offset) {
      const response = await fetch(
        `${API_HOST}/messages?_sort=date&${queryStringFilters}&_start=${amountMessage - limit - offset}&_end=${
          amountMessage - offset
        }`
      )
      const json = await response.json()
      console.log('Fteching more messages', json)
      dispatch({ type: FETCH_MESSAGES, payload: json })
      dispatch({ type: INCREASE_PAGINATION_COUNTER })
    }
  }
}

export function fetchDesks() {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const response = await fetch(`${API_HOST}/desks`)
    const json = await response.json()
    dispatch({ type: FETCH_DESKS, payload: json })
  }
}

export function fetchPlayers() {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const response = await fetch(`${API_HOST}/players`)
    const json = await response.json()
    dispatch({ type: FETCH_PLAYERS, payload: json })
  }
}

export function setDesk(id: number) {
  return {
    type: SET_DESK,
    payload: id,
  }
}

export function setPlayer(id: number): ISetPlayerAction {
  return {
    type: SET_PLAYER,
    payload: id,
  }
}

export function setPlayers(players: Array<IPlayer>) {
  return {
    type: SET_PLAYERS,
    payload: players,
  }
}

export function setMessages(messages: Array<IPlayer>) {
  return {
    type: SET_MESSAGES,
    payload: messages,
  }
}

export function setPaginationCounter(value: number) {
  return {
    type: SET_PAGINATION_COUNTER,
    payload: value,
  }
}

export function increasePaginationCounter() {
  return {
    type: INCREASE_PAGINATION_COUNTER,
  }
}

export function setAmountMessages(value: number) {
  return {
    type: SET_AMOUNT_MESSAGES,
    payload: value,
  }
}
