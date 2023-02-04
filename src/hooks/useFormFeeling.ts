import { useLayoutEffect, useRef, useState } from 'react'
import { usePlaylistStore, usePrompDataStore } from '../hooks'
import { classifyFeelings } from '../services/cohere'
import { getPlaylistsByFeeling } from '../services/spotify'
import { customToast } from '../utils'

export const useFormFeeling = () => {

	const formRef = useRef<HTMLFormElement>(null)

	const [promptData, setPromptData] = usePrompDataStore()
	const [playlist, playlistStore] = usePlaylistStore()
	const [loading, setLoading] = useState(false)

	useLayoutEffect(() => {
		(formRef.current.querySelector('#feeling') as HTMLTextAreaElement).focus()
	}, [])

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const inputFeeling = getInputText()

		if (inputFeeling.length <= 0) return showError('Field is required!')

		setLoading(true)

		const feelingClassified = await classifyFeelings(inputFeeling)

		if (!feelingClassified) return showError('Error in classifying sentiment!, try later please')

		const { prediction } = feelingClassified.classifications[0]

		setPromptData.set({ text: inputFeeling, label: prediction })

		const playlists = await getPlaylistsByFeeling(prediction)

		if (!playlists) return showError('Error getting playlists!, try later please')

		playlistStore.set(playlists)

		handleScrollDown(515)

		setLoading(false)
	}

	const showError = (error: string) => {
		customToast({ label: error, type: 'error' })
		setLoading(false)
	}

	const getInputText = () => {
		const form = formRef.current
		const { inputFeeling } = Object.fromEntries(new FormData(form)) as { inputFeeling: string }
		return inputFeeling.trim()
	}

	const handleScrollDown = (top: number) => window.scroll({ behavior: 'smooth', top })

	const onClearInput = () => {
		formRef.current.reset();
		(formRef.current.querySelector('#feeling') as HTMLTextAreaElement).focus()
	}

	return {
		promptData,
		playlist,
		loading,
		formRef,
		onSubmit,
		onClearInput
	}
}
