import React from 'react'
import { Button } from '@blueprintjs/core'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/rootReducer'

export interface IPlayerProps {
  id: number
  deskId: number
  onSelectPlayer: (id: number) => void
}

export const Player: React.FC<IPlayerProps> = ({ id, onSelectPlayer }) => {
  const currentPlayer = useSelector((state: RootState) => state.app.currentPlayer)
  return (
    <div>
      <Button fill alignText="left" key={id} onClick={() => onSelectPlayer(id)} active={currentPlayer === id} outlined minimal>
        {'Player ' + id}
      </Button>
    </div>
  )
}
