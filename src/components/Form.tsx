import { Button, FeelingResult } from '../components'
import { useFormFeeling } from '../hooks'
import CloseIcon from './shared/CloseIcon'
import clsx from 'clsx'

export function Form() {

	const { promptData, loading, onSubmit, onClearInput, playlist, formRef } = useFormFeeling()

	return (
		<form ref={formRef} onSubmit={onSubmit} className='relative flex flex-col gap-5 mt-10 w-full md:w-[600px]'>
			<h1 className='leading-tight relative mb-3 md:mb-4 sm:px-2 md:px-4 z-30 text-4xl sm:text-[50px] md:text-[60px] font-bold text-center'>
				Tell me, <span className='text-mixin-100'>how</span> was your{' '}
				<span className='text-mixin-100'>day</span>?
			</h1>

			<div className='h-44'>
				<div className='relative h-full'>
					<textarea
						tabIndex={1}
						id='feeling'
						className={clsx(
							'focus:animate-visual absolute z-20 left-0 top-0 bottom-0 right-0 text-mixin-400 resize-none w-full h-full p-6 pb-12 rounded-md font-semibold outline-none', {
							'pointer-events-none': loading
						})}
						name='inputFeeling'
						placeholder='...'
					/>
					<Button
						className='z-20 absolute  bottom-3 right-3 transition-transform hover:scale-105 disabled:scale-100 flex justify-center items-center gap-1 px-2'
						disabled={loading}
						label='clear'
						onClick={onClearInput}
						tabIndex={3}
						type='button'
						withSpinner={false}
					>
						<CloseIcon className='h-3' />
					</Button>

					<div className='absolute z-10 rounded-[20px] h-44 w-full bg-textarea bg-[length:10px_10px] text-mixin-200 opacity-40 -left-6 top-5' />
				</div>
			</div>

			<Button
				className='relative z-20 mt-8'
				disabled={loading}
				label='Send Feeling'
				tabIndex={2}
				type='submit'
			/>

			{!loading && (
				<FeelingResult feelingClassified={promptData.label} existsPlaylist={playlist?.length > 0} />
			)}
			<div className='absolute -top-10 sm:-top-20 right-0 md:-right-12 filter blur-xl opacity-60 w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-mixin-100 rounded-full mix-blend-multiply animate-blob !animation-delay-4000' />
			<div className='absolute top-20 -left-4 filter blur-xl opacity-60 w-[420px] h-[420px] md:w-[500px] md:h-[500px] bg-mixin-200 rounded-full mix-blend-multiply animate-blob animation-delay-2000' />
		</form>
	)
}
