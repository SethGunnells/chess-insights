import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import { getLatest } from '../services/data'

const List = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`

const ecos = ['Any', 'C25', 'C26', 'C27', 'C28', 'C29']
const sides = ['Any', 'White', 'Black']

const Games = () => {
  const [games, setGames] = useState<any[]>([])
  const [opening, setOpening] = useState('Any')
  const [side, setSide] = useState('Any')

  useEffect(() => {
    getLatest().then(setGames)
  }, [])

  return (
    <>
      <select onChange={e => setOpening(e.target.value)} value={opening}>
        {ecos.map(eco => (
          <option>{eco}</option>
        ))}
      </select>
      <select onChange={e => setSide(e.target.value)} value={side}>
        {sides.map(s => (
          <option>{s}</option>
        ))}
      </select>
      <List>
        {games
          .filter(
            ({ opening: { eco } }) => opening === 'Any' || opening === eco
          )
          .filter(
            ({ players }) =>
              side === 'Any' ||
              !players[side.toLowerCase()].user ||
              players[side.toLowerCase()].user.id === 'ghostsignal'
          )
          .map(({ id, opening: { eco, name } }) => (
            <li key={id}>
              {eco} - {name}
              <br />
              <a href={`https://lichess.org/${id}`} target="_blank">
                Link
              </a>
            </li>
          ))}
      </List>
    </>
  )
}

export default Games
