import playlistjson from '../data/playlist.json'

const RAPIDAPI_KEY = import.meta.env.PUBLIC_RAPIDAPI_KEY
const RAPIDAPI_HOST = import.meta.env.PUBLIC_RAPIDAPI_HOST

function getRandomPlaylistId(feeling: string) {
	const playlists = playlistjson[feeling].map((playlist) => playlist.name)

	const randomPlaylists = playlists
		.sort(() => 0.5 - Math.random())
		.reduce((ac, cc) => {
			if (ac.length === 3) return [...ac]
			if (ac.includes(cc)) {
				return [...ac]
			}
			return [...ac, cc]
		}, [])

	return playlistjson[feeling]
		.filter((playlist) => randomPlaylists.includes(playlist.name))
		.map((playlist) => playlist.id)
}

export async function getPlaylistsByFeeling(feeling: string) {
	try {
		const randomPlaylistId = getRandomPlaylistId(feeling)
		const requests = randomPlaylistId.map((id) => {
			return fetch(`https://spotify23.p.rapidapi.com/playlist/?id=${id}`, {
				method: 'GET',
				headers: {
					'X-RapidAPI-Key': `${RAPIDAPI_KEY}`,
					'X-RapidAPI-Host': `${RAPIDAPI_HOST}`
				}
			})
		})

		const response = await Promise.all(requests)
		const data = await Promise.all(response.map((res) => res.json()))
		return data
	} catch (error) {
		console.log(error)
		return null
	}
}
