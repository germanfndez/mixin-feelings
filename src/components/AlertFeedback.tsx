import { useState } from 'react'
import { usePrompDataStore } from '../hooks'
import { successPrompt } from '../supabase/functions/prompts'
import { customToast, getLabels } from '../utils'
import { Button } from './shared/Button'
import LikeIcon from './shared/LikeIcon'
import DislikeIcon from './shared/DislikeIcon'
import SendIcon from './shared/SendIcon'
import clsx from 'clsx'

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

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
		setSelectedOption(e.target.value)

	if (alreadyFeedbackSent) return null

	return (
		<section className='flex justify-end items-center lg:p-0 pt-4'>
			<article
				className={clsx(
					'flex items-center select-none bg-black/20 sm:rounded-full rounded-md sm:py-1 sm:px-3 p-2 text-sm',
					{
						'gap-3 w-full justify-center': showSelect,
						'gap-1 sm:w-auto w-full sm:justify-end justify-center': !showSelect
					}
				)}
			>
				{showSelect ? (
					<SelectLabel
						handleGoBack={handleGoBack}
						onChange={handleChange}
						handleSentFeedback={handleSentFeedback}
						currentLabel={promptData.label}
					/>
				) : (
					<AlertFeedbackButtons
						handleWrongFeedback={() => onSelectTypeFeedback('wrong')}
						handleCorrectFeedback={() => onSelectTypeFeedback('success')}
					/>
				)}
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
				<LikeIcon />
			</Button>
			<Button
				withSpinner={false}
				className='hover:!bg-black active:!bg-black/70 !bg-transparent !rounded-full w-7 h-7 grid place-items-center'
				onClick={handleWrongFeedback}
			>
				<DislikeIcon />
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
		<div className='flex sm:flex-row flex-col sm:gap-4 gap-2 sm:items-center justify-center w-full'>
			<label htmlFor='feedback-cohere'>Select the option you think is correct</label>
			<select
				onChange={onChange}
				id='feedback-cohere'
				name='labelOption'
				className='outline-none text-mixin-400 rounded-md h-7 lowercase border sm:w-auto w-full'
			>
				{labels
					.filter((label) => label !== currentLabel)
					.map((label) => (
						<option key={label} value={label}>
							{label}
						</option>
					))}
			</select>
			<div className='flex gap-2 items-center justify-end sm:justify-center'>
				<Button
					label=''
					className='bg-mixin-500 h-7 text-mixin-300 hover:bg-mixin-hover hover:scale-105 transition-transform'
					withSpinner={false}
					onClick={handleSentFeedback}
				>
					<SendIcon />
				</Button>
				<span>|</span>
				<Button
					label='Cancel'
					className='!text-sm h-7 !bg-transparent text-red-700 hover:!bg-red-500 hover:text-white'
					withSpinner={false}
					onClick={handleGoBack}
				/>
			</div>
		</div>
	)
}
