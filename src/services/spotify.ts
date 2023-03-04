import playlistjson from '../data/playlist.json'
import type { ErrorMessage, Playlist } from '../types'

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

export async function getPlaylistById(id: string) {
	try {
		const resp = await fetch(`https://spotify23.p.rapidapi.com/playlist/?id=${id}`, {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': import.meta.env.PUBLIC_RAPIDAPI_KEY,
				'X-RapidAPI-Host': import.meta.env.PUBLIC_RAPIDAPI_HOST
			}
		})

		const res = await resp.json()

		return res
	} catch (error) {
		return { message: 'Something went wrong', error }
	}
}

export async function getTracksById(id: string) {
	try {
		const resp = await fetch(
			`https://spotify23.p.rapidapi.com/playlist_tracks/?id=${id}&offset=0&limit=1`,
			{
				method: 'GET',
				headers: {
					'X-RapidAPI-Key': import.meta.env.PUBLIC_RAPIDAPI_KEY,
					'X-RapidAPI-Host': import.meta.env.PUBLIC_RAPIDAPI_HOST
				}
			}
		)
		const res = await resp.json()
		if (res?.message) {
			return res
		}
		const [{ track }] = res.items

		return track
	} catch (error) {
		return { message: 'Something went wrong', error }
	}
}

export async function getPlaylistsByFeeling(feeling: string): Promise<Playlist[] | null> {
	try {
		const randomPlaylistId = getRandomPlaylistId(feeling)
		const requests = randomPlaylistId.map((id) => {
			return getPlaylistById(id)
		})

		const response = await Promise.all(requests)
		console.log(response)
		checkingErrorByKey(response as ErrorMessage[])

		return response
	} catch (err) {
		console.error(err)
		return null
	}
}

function checkingErrorByKey(data: ErrorMessage[]) {
	const existError = data.some((playlist: Partial<ErrorMessage>) => playlist?.message)
	if (existError) throw new Error(data[0].message)
}
