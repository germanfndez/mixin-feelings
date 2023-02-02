import { Button, FeelingResult } from '../components'
import { useFormFeeling } from '../hooks'

export function Form() {
	const { promptData, loading, onSubmit, playlist } = useFormFeeling()

	return (
		<form onSubmit={onSubmit} className='relative flex flex-col gap-5 mt-10 w-full md:w-[600px]'>
			<h1 className='leading-tight relative mb-3 md:mb-4 sm:px-2 md:px-4 z-30 text-4xl sm:text-[50px] md:text-[60px] font-bold text-center'>
				Tell me, <span className='text-mixin-100'>how</span> was your{' '}
				<span className='text-mixin-100'>day</span>?
			</h1>

			<div className='h-44'>
				<div className='relative h-full'>
					<textarea
						required
						id='feeling'
						className='focus:animate-visual absolute z-20 left-0 top-0 bottom-0 right-0 text-mixin-400 resize-none w-full h-full p-5 rounded-md font-semibold outline-none'
						name='inputFeeling'
						placeholder='...'
					/>
					<div className='absolute z-10 rounded-[20px] h-44 w-full bg-textarea bg-[length:10px_10px] text-mixin-200 opacity-40 -left-6 top-5' />
				</div>
			</div>

			<Button
				className='relative z-20 mt-8'
				label='Send Feeling'
				type='submit'
				disabled={loading}
			/>

			{!loading && (
				<FeelingResult feelingClassified={promptData.label} existsPlaylist={playlist?.length > 0} />
			)}
			<div className='absolute -top-10 sm:-top-20 right-0 md:-right-12 filter blur-xl opacity-60 w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-mixin-100 rounded-full mix-blend-multiply animate-blob !animation-delay-4000' />
			<div className='absolute top-20 -left-4 filter blur-xl opacity-60 w-[420px] h-[420px] md:w-[500px] md:h-[500px] bg-mixin-200 rounded-full mix-blend-multiply animate-blob animation-delay-2000' />
		</form>
	)
}
