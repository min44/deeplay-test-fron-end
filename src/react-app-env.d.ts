/// <reference types="react-scripts" />

export interface IDesk {
  id: number
}

export interface IPlayer {
  id: number
  deskId: number
}

export interface IMessage {
  id: number
  text: string
  playerId: number
  date: number
}
