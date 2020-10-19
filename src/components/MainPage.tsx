import React, { useEffect, useState } from 'react'
import { Button, InputGroup } from '@blueprintjs/core'
import { useDispatch, useSelector } from 'react-redux'
import { Desk } from './Desk'
import { Messages } from './Messages'
import {
  sendMessage,
  setPlayer,
  setDesk,
  fetchMessages,
  fetchDesks,
  fetchPlayers,
  setMessages,
  setPaginationCounter,
} from '../redux/actions'
import { SEND_MESSAGE } from '../redux/types'
import { RootState } from '../redux/rootReducer'
import { IDesk } from '../react-app-env'

export const socket = new WebSocket('ws://localhost:4001')

export const MainPage: React.FC = () => {
  const [newMessageText, setNewMessageText] = useState('')
  const dispatch = useDispatch()
  const desks = useSelector((state: RootState) => state.app.desks)
  const players = useSelector((state: RootState) => state.app.players)
  const currentPlayer = useSelector((state: RootState) => state.app.currentPlayer)
  const currentDesk = useSelector((state: RootState) => state.app.currentDesk)

  useEffect(() => {
    dispatch(fetchDesks())
    dispatch(fetchPlayers())
  }, [])

  useEffect(() => {
    dispatch(setMessages([]))
    dispatch(setPaginationCounter(0))
    if (currentDesk !== undefined) {
      dispatch(fetchMessages(currentDesk, players))
    }
  }, [currentDesk])

  useEffect(() => {
    socket.onopen = (event) => {
      console.log('Web socket is open')
    }
    socket.onmessage = (event) => {
      console.log('Web socket recieve message')
      // console.log(event)
      dispatch({ type: SEND_MESSAGE, payload: JSON.parse(event.data) })
    }
    socket.onclose = (event) => {
      console.log('Web socket closed')
    }
    socket.onerror = (event) => {
      console.log('Web socket onerror')
    }
  }, [])

  const selectDeskHandler = (id: number) => {
    console.log('Current desk: ', id)
    dispatch(setDesk(id))
  }
  const selectPlayerHandler = (id: number) => {
    console.log('Current player: ', id)
    dispatch(setPlayer(id))
  }

  const sendMessageHandler = (
    event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (!newMessageText) {
      return
    }

    const message = {
      id: Date.now(),
      text: newMessageText,
      playerId: currentPlayer,
      date: Date.now(),
    }

    dispatch(sendMessage(message))
    setNewMessageText('')


  }

  return (
    <div className="mainpage">
      <div className="sidebar">
        {desks.map((desk: IDesk) => (
          <Desk
            key={desk.id}
            id={desk.id}
            players={players}
            onSelectDesk={selectDeskHandler}
            onSelectPlayer={selectPlayerHandler}
          />
        ))}
      </div>
      <div className="chatwindow">
        <div className="messages" id="messages">
          <Messages />
        </div>
        <div className="bottom">
          <div className="textinput">
            <InputGroup
              large
              placeholder="New message..."
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewMessageText(event.target.value)}
              onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) =>
                event.key === 'Enter' && sendMessageHandler(event)
              }
              value={newMessageText}
            />
          </div>
          <div className="sendbutton">
            <Button large alignText="center" onClick={sendMessageHandler}>
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
