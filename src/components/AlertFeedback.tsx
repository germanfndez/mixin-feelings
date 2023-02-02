import { useState } from 'react'
import { usePrompDataStore } from '../hooks'
import { labels, successPrompt } from '../supabase/functions/prompts'
import { customToast } from '../utils'
import CloseIcon from './shared/CloseIcon'
import HearthIcon from './shared/HearthIcon'

const PROMPT_TYPE_STATUS = {
	SUCCESS: 'SUCCESS',
	FAILED: 'FAILED'
}

export const AlertFeedback = () => {
	const [promptData] = usePrompDataStore()
	const [showSelect, setShowSelect] = useState<boolean>(false)
	const [selectedOption, setSelectedOption] = useState<string>('')

	const handleSuccessPrompt = async (status: 'SUCCESS' | 'FAILED') => {
		const data =
			status === PROMPT_TYPE_STATUS.SUCCESS
				? { ...promptData }
				: { label: selectedOption, text: promptData.text }
		try {
			await successPrompt(data)
			customToast({ label: 'Thanks for your feedback!', type: 'success' })
		} catch (error) {
			customToast({
				label: 'We were unable to process your feedback, please try again later.',
				type: 'error'
			})
		}
	}

	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedOption(e.target.value)
	}

	return (
		<div className='absolute flex gap-2 -bottom-6 -right-2'>
			<span className='text-sm'>was this result useful to you:</span>
			<button type='button' onClick={() => handleSuccessPrompt('SUCCESS')}>
				<HearthIcon className='hover:text-red-500' />
			</button>
			<button type='button' onClick={() => handleSuccessPrompt('FAILED')}>
				<CloseIcon className='hover:text-black' />
			</button>
			{showSelect && (
				<select id='feedback-cohere' name='labelOptions' onChange={handleSelect}>
					{labels
						.filter((label) => label.toLowerCase() !== promptData.label)
						.map((label) => (
							<option value={label}>{label}</option>
						))}
				</select>
			)}
		</div>
	)
}
