import playlistjson from '../data/playlist.json'

function getRandomPlaylistId(feeling) {
	const playlists = playlistjson[feeling].map(playlist => playlist.name)

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

export async function getPlaylistsByFeeling(feeling) {
	const randomPlaylistId = getRandomPlaylistId(feeling)
	const requests = randomPlaylistId.map((id) => {
		return fetch(`https://spotify23.p.rapidapi.com/playlist/?id=${id}`, {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': import.meta.env.PUBLIC_RAPIDAPI_KEY,
				'X-RapidAPI-Host': import.meta.env.PUBLIC_RAPIDAPI_HOST
			}
		})
	})

	const response = await Promise.all(requests)
	const data = await Promise.all(response.map((res) => res.json()))
	return data
}
