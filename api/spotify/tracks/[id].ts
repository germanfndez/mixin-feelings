export const config = {
  runtime: 'edge',
  regions: ['iad1']
}

export default async (req: Request, res: any) => {
	const { 1: id } = req.url.split("?id=")
	try {
		const resp = await fetch(
			`https://spotify23.p.rapidapi.com/playlist_tracks/?id=${id}&offset=0&limit=1`,
			{
				method: 'GET',
				headers: {
					'X-RapidAPI-Key': process.env.PUBLIC_RAPIDAPI_KEY,
					'X-RapidAPI-Host': process.env.PUBLIC_RAPIDAPI_HOST
				}
			}
		)
		const { items } = (await resp.json())
		const [{ track }] = items
	
		return new Response(JSON.stringify(track))
	} catch (error) {
		return new Response(JSON.stringify({ message: "Something went wrong", error }))
	}
}