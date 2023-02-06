export const config = {
  runtime: 'edge',
  regions: ['iad1']
}

const { PUBLIC_RAPIDAPI_KEY = '', PUBLIC_RAPIDAPI_HOST = '' } = process.env

export default async (req: any) => {
  const { id = '' } = req && req.query || {}
	
		// const resp = await fetch(
		// 	`https://spotify23.p.rapidapi.com/playlist_tracks/?id=${id}&offset=0&limit=1`,
		// 	{
		// 		method: 'GET',
		// 		headers: {
		// 			'X-RapidAPI-Key': `${PUBLIC_RAPIDAPI_KEY}`,
		// 			'X-RapidAPI-Host': `${PUBLIC_RAPIDAPI_HOST}`
		// 		}
		// 	}
		// )
		// const { items } = (await resp.json()) as { items: Array<{ track: { preview_url: string }}> }
		// const [{ track }] = items
	
		// return res.json(track)
	return new Response(`Error: ${id} - ${PUBLIC_RAPIDAPI_KEY} - ${PUBLIC_RAPIDAPI_HOST}`);
}
