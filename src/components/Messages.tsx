import React from 'react'
import { Message } from './Message'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/rootReducer'
import { IPlayer, IMessage } from '../react-app-env'
import { Waypoint } from 'react-waypoint'
import { fetchMoreMessages } from '../redux/actions'

export const Messages: React.FC = () => {
  const currentPlayer = useSelector((state: RootState) => state.app.currentPlayer)
  const currentPlayers = useSelector((state: RootState) => state.app.currentPlayers)
  const players = useSelector((state: RootState) => state.app.players)
  const paginationCounter = useSelector((state: RootState) => state.pagination)
  const currentDesk = useSelector((state: RootState) => state.app.currentDesk)
  const amountMessage = useSelector((state: RootState) => state.messages.amountMessages)
  const dispatch = useDispatch()
  const messages = useSelector((state: RootState) =>
    state.messages.messages
      .filter((message: IMessage) => currentPlayers.map((player: IPlayer) => player.id).includes(message.playerId))
  )

  return (
    <React.Fragment>
      {messages.map((message: IMessage, index: number) => (
        <React.Fragment key={message.id}>
          <Message
            id={message.id}
            text={message.text}
            playerId={message.playerId}
            date={message.date}
            itsMe={message.playerId === currentPlayer}
          />
          {index === messages.length - 2 && (
            <Waypoint onEnter={() => dispatch(fetchMoreMessages(currentDesk, players, paginationCounter, amountMessage))} />
          )}
        </React.Fragment>
      ))}
    </React.Fragment>
  )
}
