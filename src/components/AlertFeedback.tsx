import { useState } from 'react'
import { usePrompDataStore } from '../hooks'
import { successPrompt } from '../supabase/functions/prompts'
import { customToast, getLabels } from '../utils'
import { Button } from './shared/Button'
import CloseIcon from './shared/CloseIcon'
import HearthIcon from './shared/HearthIcon'

const PROMPT_TYPE_STATUS = {
	SUCCESS: 'SUCCESS',
	FAILED: 'FAILED'
}

const labels = getLabels()

export const AlertFeedback = () => {

	const [alreadyFeedbackSent, setAlreadyFeedbackSent] = useState(false)

	const [promptData] = usePrompDataStore()

	const [showSelect, setShowSelect] = useState(false)

	const [selectedOption, setSelectedOption] = useState(promptData.label)

	// const handleSentFeedBack = async (status: 'SUCCESS' | 'FAILED') => {


	// 	// const data =
	// 	// 	status === PROMPT_TYPE_STATUS.SUCCESS
	// 	// 		? { ...promptData }
	// 	// 		: { label: selectedOption, text: promptData.text }
	// 	// try {
	// 	// 	await successPrompt(data)
	// 	// 	customToast({ label: 'Thanks for your feedback!', type: 'success' })
	// 	// } catch (error) {
	// 	// 	customToast({
	// 	// 		label: 'We were unable to process your feedback, please try again later.',
	// 	// 		type: 'error'
	// 	// 	})
	// 	// }
	// }


	const onSendPositiveFeedback = async () => {
		console.log(promptData)
		setAlreadyFeedbackSent(true)
	}

	const onSendNegativeFeedback = () => setShowSelect(true)

	const handleBackFeedback = () => setShowSelect(false)

	const handleSentFeedback = () => {
		const label = selectedOption
		const text = promptData.text



		setShowSelect(false)
		setAlreadyFeedbackSent(true)
	}

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedOption(e.target.value)

	if (alreadyFeedbackSent) return null

	return (
		<section className='flex justify-end items-center lg:border-none border-t'>
			<article className={`flex items-center ${showSelect ? 'gap-3' : 'gap-1'} select-none lg:bg-black/20 bg-transparent lg:rounded-full rounded-none py-1 px-3 text-sm`}>

				{
					showSelect
						? <>
							<label htmlFor="feedback-cohere">Select the option you think is correct</label>
							<select onChange={handleChange} id='feedback-cohere' name='labelOption' className='bg-mixin-500 text-mixin-300 rounded-md p-1'>
								{
									labels.map((label) => (
										<option className='' key={label} value={label}>{label}</option>
									))
								}
							</select>
							<Button label='Send' className='!text-sm' withSpinner={false} onClick={handleSentFeedback} />
							<span >or</span>
							<Button label='Cancel' className='!text-sm' withSpinner={false} onClick={handleBackFeedback} />
						</>
						: <>
							<span>Was this result useful to you:</span>
							<Button
								withSpinner={false}
								className='hover:!bg-red-500 active:!bg-red-600 !bg-transparent !rounded-full w-7 h-7 grid place-items-center'
								onClick={onSendPositiveFeedback}
							>
								<HearthIcon />
							</Button>
							<Button
								withSpinner={false}
								className='hover:!bg-black active:!bg-black/70 !bg-transparent !rounded-full w-7 h-7 grid place-items-center'
								onClick={onSendNegativeFeedback}
							>
								<CloseIcon />
							</Button>
						</>
				}
			</article>
		</section>
	)
}
