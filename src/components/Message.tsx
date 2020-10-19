import React from 'react'

export interface IMessageProps {
  key?: number
  id: number
  text: string
  playerId: number
  date: number
  itsMe: boolean
}

export const Message: React.FC<IMessageProps> = ({ text, playerId, date, itsMe }) => {
  const messageDate = new Date(date)
  return (
    <div className="message" style={{ alignSelf: itsMe ? 'flex-end' : 'flex-start' }}>
      <div style={{textDecoration: 'underline', fontSize:'medium', paddingBottom:5}}>{'Player: ' + playerId}</div>
      <div style={{fontSize:'small'}}>{messageDate.toUTCString()}</div>
      <div style={{ paddingTop: 10 }}>{text}</div>
    </div>
  )
}
