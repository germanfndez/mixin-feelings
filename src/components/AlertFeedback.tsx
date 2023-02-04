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

	const onSelectTypeFeedback = async (type: 'success' | 'wrong') => {
		if (type === 'success') {
			await successPrompt(promptData)
			setAlreadyFeedbackSent(true)
			customToast({ label: 'Thanks for your feedback!', type: 'success' })
			return
		}

		setShowSelect(true)
	}

	const handleSentFeedback = async () => {
		const label = selectedOption
		const text = promptData.text

		await successPrompt({ label, text })

		setShowSelect(false)
		setAlreadyFeedbackSent(true)
		customToast({ label: 'Thanks for your feedback!', type: 'success' })
	}

	const handleGoBack = () => setShowSelect(false)

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedOption(e.target.value)

	if (alreadyFeedbackSent) return null

	return (
		<section className='flex justify-end items-center lg:p-0 pt-4'>
			<article className={`flex items-center ${showSelect ? 'gap-3 w-full justify-center' : 'gap-1 sm:w-auto w-full sm:justify-end justify-center'} select-none bg-black/20 sm:rounded-full rounded-md sm:py-1 sm:px-3 p-2 text-sm`}>

				{
					showSelect
						? <SelectLabel
							handleGoBack={handleGoBack}
							onChange={handleChange}
							handleSentFeedback={handleSentFeedback}
							currentLabel={promptData.label}
						/>
						: <AlertFeedbackButtons
							handleWrongFeedback={() => onSelectTypeFeedback('wrong')}
							handleCorrectFeedback={() => onSelectTypeFeedback('success')}
						/>
				}
			</article>
		</section>
	)
}

interface PropsAlertFeedbackButtons {
	handleCorrectFeedback: () => void
	handleWrongFeedback: () => void
}

export const AlertFeedbackButtons = ({
	handleWrongFeedback,
	handleCorrectFeedback
}: PropsAlertFeedbackButtons) => {
	return (
		<>
			<span>Was this result useful to you:</span>
			<Button
				withSpinner={false}
				className='hover:!bg-red-500 active:!bg-red-600 !bg-transparent !rounded-full w-7 h-7 grid place-items-center'
				onClick={handleCorrectFeedback}
			>
				<HearthIcon />
			</Button>
			<Button
				withSpinner={false}
				className='hover:!bg-black active:!bg-black/70 !bg-transparent !rounded-full w-7 h-7 grid place-items-center'
				onClick={handleWrongFeedback}
			>
				<CloseIcon />
			</Button>
		</>
	)
}


interface PropsSelectLabel {
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
	handleGoBack: () => void
	handleSentFeedback: () => void
	currentLabel: string
}

export const SelectLabel = ({
	onChange,
	handleGoBack,
	handleSentFeedback,
	currentLabel
}: PropsSelectLabel) => {

	return (
		<div className='flex sm:flex-row flex-col sm:gap-4 gap-2 items-center justify-center w-full'>
			<label htmlFor="feedback-cohere">Select the option you think is correct</label>
			<select onChange={onChange} id='feedback-cohere' name='labelOption' className='bg-mixin-500 text-mixin-300 rounded-md p-1  border sm:w-auto w-full'>
				{
					labels
						.filter(label => label !== currentLabel)
						.map((label) => (
							<option className='' key={label} value={label}>{label}</option>
						))
				}
			</select>
			<div className='flex gap-2 items-center justify-center'>
				<Button label='Send' className='!text-sm h-7' withSpinner={false} onClick={handleSentFeedback} />
				<span >or</span>
				<Button label='<-' className='!text-sm h-7' withSpinner={false} onClick={handleGoBack} />
			</div>
		</div>
	)
}