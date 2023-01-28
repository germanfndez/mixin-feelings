import { getPlaylistsByFeeling } from '../services/spotify'
import { classifyFeelings } from '../services/cohere'
import { useFeelingStore, usePlaylistStore } from '../hooks'
import { useState } from 'react'

export const useFormFeeling = () => {
	const [$feeling, feelingStore] = useFeelingStore()
	const [$playlist, playlistStore] = usePlaylistStore()
	const [loading, setLoading] = useState(false)

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const form = e.target as HTMLFormElement
		const { inputFeeling } = Object.fromEntries(new FormData(form)) as { inputFeeling: string }

		if (inputFeeling.trim().length <= 0) return resetState(form, 'Field is required')

		setLoading(true)

		const feelingClassified = await classifyFeelings(inputFeeling.trim())

		if (!feelingClassified) return resetState(form, 'Error al clasificar el sentimiento!')

		const { prediction } = feelingClassified.classifications[0]

		feelingStore.set({ text: prediction, label: inputFeeling })

		const playlists = await getPlaylistsByFeeling(prediction)

		if (!playlists) return resetState(form, 'Error al obtener las playlists!')

		playlistStore.set(playlists)

		resetState(form)
	}

	const resetState = (form: HTMLFormElement, error?: string) => {
		if (error) alert(error)
		setLoading(false)
		form.reset()
	}

	return {
		feeling: $feeling,
		playlist: $playlist,
		loading,
		onSubmit
	}
}
