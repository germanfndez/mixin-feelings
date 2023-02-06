export const config = {
  runtime: 'edge',
  regions: ['iad1']
}

export default async (req: Request, res: any) => {
	const { 1: id } = req.url.split("?id=")
	try {
		const resp = await fetch(
			`https://spotify23.p.rapidapi.com/playlist/?id=${id}`,
			{
				method: 'GET',
				headers: {
					'X-RapidAPI-Key': process.env.PUBLIC_RAPIDAPI_KEY,
					'X-RapidAPI-Host': process.env.PUBLIC_RAPIDAPI_HOST
				}
			}
		)
		const res = (await resp.json())
	
		return new Response(JSON.stringify(res))
	} catch (error) {
		return new Response(JSON.stringify({ message: "Something went wrong", error }))
	}
}
