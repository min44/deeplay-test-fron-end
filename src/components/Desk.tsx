import React, { useState } from 'react'
import { Button, Collapse } from '@blueprintjs/core'
import { Player } from './Player'
import { IPlayer } from '../react-app-env'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/rootReducer'

export interface IDeskProps {
  id: number
  players: Array<IPlayer>
  onSelectDesk: (id: number) => void
  onSelectPlayer: (id: number) => void
}

export const Desk: React.FC<IDeskProps> = ({ id, players, onSelectDesk, onSelectPlayer }) => {
  const [isOpen, setIsOpen] = useState(false)
  const currentDesk = useSelector((state: RootState) => state.app.currentDesk)

  const filteredPlayers = players.filter((player: IPlayer) => player.deskId === id)

  const handleClick = () => {
    setIsOpen((prev) => !prev)
    onSelectDesk(id)
  }

  return (
    <div>
      <Button fill large alignText="left" onClick={handleClick} active={currentDesk === id}>
        {'Desk ' + id}
      </Button>
      <Collapse isOpen={isOpen}>
        {filteredPlayers.map((player: IPlayer) => (
          <Player key={player.id} id={player.id} deskId={player.deskId} onSelectPlayer={onSelectPlayer} />
        ))}
      </Collapse>
    </div>
  )
}
