export const config = {
	runtime: 'edge'
}

export default async (req: Request) => {
	const { 1: id } = req.url.split('?id=')
	try {
		const resp = await fetch(
			`https://spotify23.p.rapidapi.com/playlist_tracks/?id=${id}&offset=0&limit=1`,
			{
				method: 'GET',
				headers: {
					'X-RapidAPI-Key': '84cb500552msh49a094f173be388p1eb688jsn72ef13decef1',
					'X-RapidAPI-Host': process.env.PUBLIC_RAPIDAPI_HOST
				}
			}
		)
		const res = await resp.json()
		if (res?.message) {
			return new Response(JSON.stringify(res))
		}
		const [{ track }] = res.items

		return new Response(JSON.stringify(track))
	} catch (error) {
		return new Response(JSON.stringify({ message: 'Something went wrong', error }))
	}
}
