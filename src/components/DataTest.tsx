import React, { useEffect, useState } from 'react'

import { getLatest } from '../services/data'

const DataTest = () => {
  const [games, setGames] = useState<any[]>([])

  useEffect(() => {
    getLatest().then(setGames)
  }, [])

  return <ul>
    {games.map(({ id }) => <li key={id}>{id}</li>)}
  </ul>
}

export default DataTest
