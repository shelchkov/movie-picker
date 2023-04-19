export const pickMovie = async (pick: string, against: string) => {
  const res = await fetch('/api/pick-movie', {
    method: 'POST',
    body: JSON.stringify({ pick, against }),
  })

  return res.json()
}
