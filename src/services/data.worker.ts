import ndjson from 'fetch-ndjson'

async function getData() {
  const response = await fetch(
    'https://lichess.org/api/games/user/GhostSignal?opening=true&moves=false',
    { headers: { Accept: 'application/x-ndjson', Authorization: `Bearer ${process.env.lichessToken}` } }
  )
  const reader = response.body?.getReader()
  if (!reader) {
    return
  }
  const generator = ndjson(reader)

  while (true) {
    const { done, value } = await generator.next()
    if (value) postMessage(value)
    if (done) return
  }
}

getData()
