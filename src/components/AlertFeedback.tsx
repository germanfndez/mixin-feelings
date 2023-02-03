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
		<div className='flex gap-1 items-center justify-end lg:p-1 lg:pl-3 pt-4 lg:border-none border-t lg:absolute static lg:-bottom-7 lg:-right-6 select-none lg:bg-black/10 bg-transparent lg:rounded-full rounded-none'>
			<span className='text-sm'>Was this result useful to you:</span>
			<button type='button' onClick={() => { }}
				className='hover:bg-red-500 active:bg-red-600 rounded-full w-7 h-7 grid place-items-center'
			>
				<HearthIcon />
			</button>
			<button type='button' onClick={() => { }}
				className='hover:bg-black active:bg-black/70 rounded-full w-7 h-7 grid place-items-center'
			>
				<CloseIcon />
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
