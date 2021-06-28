import React, { useEffect, useState } from 'react'

const DataTest = () => {
  const [games, setGames] = useState<any[]>([])

  useEffect(() => {
    const worker = new Worker('../services/data.worker.ts')
    worker.onmessage = (game) => {
      setGames(current => [...current, game.data])
    }
  }, [])

  return <ul>
    {games.map(({ id }) => <li key={id}>{id}</li>)}
  </ul>
}

export default DataTest
