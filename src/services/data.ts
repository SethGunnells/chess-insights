const STORAGE_KEY = 'chessInsights:games'

export const getData = (): any[] => {
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  return JSON.parse(raw)
}

export const getLatest = (callback?: (data: any) => {}): Promise<any[]> => {
  const oldGames = getData()
  const since =
    oldGames.length > 0
      ? oldGames.reduce(
          (result, { lastMoveAt }) =>
            lastMoveAt > result ? lastMoveAt : result,
          oldGames[0].lastMoveAt
        )
      : null
  let newData: any[] = []
  const worker = new Worker('./data.worker.ts')
  return new Promise(resolve => {
    worker.onmessage = ({ data }) => {
      if (callback) callback(data)
      if (data === null) {
        worker.terminate()
        const games = [...newData, ...oldGames]
        storeGames(games)
        return resolve(games)
      }
      if (data) {
        newData.unshift(data)
      }
    }
    worker.postMessage(since)
  })
}

const storeGames = (games: any[]) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(games))
}
