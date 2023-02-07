import React, { useState, useMemo } from 'react'

interface Context {
	fetchAndPlay: (id: string) => void
	trackUri: string | null
	playing: boolean
}

const defaultValues: Context = {
	fetchAndPlay: () => {},
	trackUri: null,
	playing: false
}

const PlayerContext = React.createContext<Context>(defaultValues)

interface Props {
	children: React.ReactNode
}

async function getTrackPreview(id: string): Promise<{ preview_url: string }> {
	const { 2: trackId } = id.split(':')
	const res = await fetch(`/api/spotify/tracks/${trackId}`)
	return await res.json()
}

export const PlayerProvider: React.FC<Props> = ({ children }) => {
	const [playing, setPlaying] = useState<boolean>(false)
	const [trackData, setTrackData] = useState<HTMLAudioElement | null>(null)
	const [trackUri, setTrackUri] = useState<string | null>(null)

	async function fetchAndPlay(id: string) {
		if (trackData && !playing && trackUri === id) {
			trackData.play()
			setPlaying(true)
			return
		}
		if (trackData && playing && trackUri === id) {
			trackData.pause()
			setPlaying(false)
			return
		}
		if (trackData && playing && trackUri !== id) {
			trackData.pause()
			trackData.currentTime = 0
		}
		const track = await getTrackPreview(id)
		let audio = new Audio(track.preview_url)
		setTrackData(audio)
		setTrackUri(id)
		audio.play()
		audio.volume = 0.2
		setPlaying(true)
	}

	const providerValue = useMemo<Context>(() => {
		return {
			fetchAndPlay,
			trackUri,
			playing
		}
	}, [playing, trackUri, trackData])

	return <PlayerContext.Provider value={providerValue}>{children}</PlayerContext.Provider>
}

export const usePlayer = () => {
	return React.useContext<Context>(PlayerContext)
}
