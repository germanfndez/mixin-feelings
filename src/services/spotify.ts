import playlistjson from '../data/playlist.json'
import { ErrorMessage, Playlist } from '../types'

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

export async function getPlaylistsByFeeling(feeling: string): Promise<Playlist[] | null> {
	try {
		const randomPlaylistId = getRandomPlaylistId(feeling)
		const requests = randomPlaylistId.map((id) => {
			return fetch(`/api/spotify/playlists/${id}`)
		})

		const response = await Promise.all(requests)
		const data = await Promise.all(response.map((res) => res.json()))

		checkingErrorByKey(data as ErrorMessage[])

		return data
	} catch (err) {
		console.error(err)
		return null
	}
}

function checkingErrorByKey(data: ErrorMessage[]) {
	const existError = data.some((playlist: Partial<ErrorMessage>) => playlist?.message)
	if (existError) throw new Error(data[0].message)
}
