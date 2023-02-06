export const config = {
  runtime: 'edge',
  regions: ['iad1']
}

export default async (req: Request) => {
  const { id } = req.body as any
	const resp = await fetch(
		`https://spotify23.p.rapidapi.com/playlist_tracks/?id=${id}&offset=0&limit=1`,
		{
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': `${import.meta.env.PUBLIC_RAPIDAPI_KEY}`,
				'X-RapidAPI-Host': `${import.meta.env.PUBLIC_RAPIDAPI_HOST}`
			}
		}
	)
	const { items } = (await resp.json()) as { items: Array<{ track: { preview_url: string }}> }
	const [{ track }] = items

	return new Response(JSON.stringify(track), {
		status: 200,
	})
}
