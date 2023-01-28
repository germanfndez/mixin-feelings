import { useState } from 'react'
import { Button } from '../components'
import { useFeelingStore } from '../hooks'
import { labels, successPrompt } from '../supabase/functions/prompts'

const PROMPT_TYPE_STATUS = {
	SUCCESS: 'SUCCESS',
	FAILED: 'FAILED'
}

export const AlertFeedback = () => {
	const [$feeling] = useFeelingStore()
	const [showSelect, setShowSelect] = useState<boolean>(false)
	const [selectedOption, setSelectedOption] = useState<string>('')

	const handleSuccessPrompt = async (status: 'SUCCESS' | 'FAILED') => {
		const data =
			status === PROMPT_TYPE_STATUS.SUCCESS
				? { ...$feeling }
				: { label: selectedOption, text: $feeling.text }
		try {
			await successPrompt(data)
			// alert('Este boton no hace nada aun')
			alert('Exitoso')
		} catch (error) {
			alert('Fallo supabase feedback')
		}
	}

	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedOption(e.target.value)
	}

	return (
		<div className='absolute top-0 bg-black p-5 rounded-md flex flex-col gap-5'>
			<p>was this result useful to you?</p>
			{!showSelect && (
				<Button label='Yes' onClick={() => handleSuccessPrompt('SUCCESS')} className='w-full' />
			)}
			{!showSelect && <Button label='No' onClick={() => setShowSelect(true)} className='w-full' />}
			{showSelect && (
				<Button label='Enviar' onClick={() => handleSuccessPrompt('FAILED')} className='w-full' />
			)}
			{showSelect && (
				<select id='feedback-cohere' name='labelOptions' onChange={handleSelect}>
					{labels
						.filter((label) => label.toLowerCase() !== $feeling.label)
						.map((label) => (
							<option value={label}>{label}</option>
						))}
				</select>
			)}
		</div>
	)
}
