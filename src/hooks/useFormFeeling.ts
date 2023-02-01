import { useState } from 'react'
import { usePlaylistStore, usePrompDataStore } from '../hooks'
import { classifyFeelings } from '../services/cohere'
import { getPlaylistsByFeeling } from '../services/spotify'

export const useFormFeeling = () => {
	const [promptData, setPromptData] = usePrompDataStore()
	const [$playlist, playlistStore] = usePlaylistStore()
	const [loading, setLoading] = useState(false)

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const form = e.target as HTMLFormElement
		const { inputFeeling } = Object.fromEntries(new FormData(form)) as { inputFeeling: string }

		setLoading(true)

		const feelingClassified = await classifyFeelings(inputFeeling.trim())

		if (!feelingClassified) return resetState(form, 'Error al clasificar el sentimiento!')

		const { prediction } = feelingClassified.classifications[0]

		setPromptData.set({ text: inputFeeling, label: prediction })

		const playlists = await getPlaylistsByFeeling(prediction)

		if (!playlists) return resetState(form, 'Error al obtener las playlists!')

		window.scroll({ behavior: 'smooth', top: 400 })

		playlistStore.set(playlists)

		resetState(form)
	}

	const resetState = (form: HTMLFormElement, error?: string) => {
		if (error) alert(error)
		setLoading(false)
		form.reset()
	}

	return {
		promptData,
		playlist: $playlist,
		loading,
		onSubmit
	}
}
