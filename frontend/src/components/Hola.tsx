import { useState } from 'react'
import { classifyFeelings } from '../services/cohere'

export default function Hola(): JSX.Element {
	const [data, setData] = useState<any[]>([])
	const [input, setInput] = useState<{ textarea: string | number }>({ textarea: '' })
	const [feeling, setFeeling] = useState<string>('')

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			console.log({ inputEnviado: input.textarea })
			const { classifications } = await classifyFeelings(input.textarea)
			const { prediction: feeling } = classifications[0]

			setFeeling(feeling)

			// TODO: use Spotify API to search a song by feeling
		} catch (err) {
			console.log(err)
		}
	}

	const handleTextArea = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
		console.log({ ...input, [target.name]: target.value })
		setInput({ ...input, [target.name]: target.value })
	}

	return (
		<form onSubmit={onSubmit}>
			<textarea
				className='border border-red-500 text-black'
				name='textarea'
				onChange={handleTextArea}
			/>
			<button type='submit'>Send</button>
			<p className='text-xl text-white'>{feeling}</p>
		</form>
	)
}
