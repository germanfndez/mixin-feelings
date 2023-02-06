import fetch from 'node-fetch'

export const config = {
  runtime: 'edge',
  regions: ['iad1']
}

export default async (req: any, res) => {
  const { id = '' } = req.query
	console.log({id})
	const resp = await fetch(
		`https://spotify23.p.rapidapi.com/playlist_tracks/?id=${id}&offset=0&limit=1`,
		{
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': `${process.env.PUBLIC_RAPIDAPI_KEY}`,
				'X-RapidAPI-Host': `${process.env.PUBLIC_RAPIDAPI_HOST}`
			}
		}
	)
	const { items } = (await resp.json()) as { items: Array<{ track: { preview_url: string }}> }
	const [{ track }] = items

	return res.json(track)
}
