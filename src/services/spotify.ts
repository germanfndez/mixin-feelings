import playlistjson from '../data/playlist.json'

const PLAYLIST = {
	Sad: ['Sad', 'Sad2', 'Sad3', 'Sad4']
}

function getRandomPlaylistId(feeling) {
	const playlists = PLAYLIST[feeling]

	const randomPlaylists = playlists
		.sort(() => 0.5 - Math.random())
		.reduce((ac, cc) => {
			if (ac.length === 3) return [...ac]
			if (ac.includes(cc)) {
				return [...ac]
			}
			return [...ac, cc]
		}, [])

	return playlistjson
		.filter((playlist) => randomPlaylists.includes(playlist.name))
		.map((playlist) => playlist.id)
}

export async function getPlaylistsByFeeling(feeling) {
	const randomPlaylistId = getRandomPlaylistId(feeling)
	const requests = randomPlaylistId.map((id) => {
		return fetch(`https://spotify23.p.rapidapi.com/playlist/?id=${id}`, {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': '7343fb580emsh621414b29c43dc2p1af5c9jsn036a8d9d561d',
				'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
			}
		})
	})

	const response = await Promise.all(requests)
	const data = await Promise.all(response.map((res) => res.json()))
	return data
}
