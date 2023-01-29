import { lazy, Suspense } from 'react'
import { Button } from '../components'
import { useFormFeeling } from '../hooks'

const FeelingResult = lazy(() => import('./FeelingResult'))

export function Form() {
	const { promptData, loading, onSubmit, playlist } = useFormFeeling()

	return (
		<form
			onSubmit={onSubmit}
			className='flex flex-col gap-5 mt-10 relative lg:w-[600px] w-full'
		>
			<h1 className='relative z-50 text-[42px] font-bold text-center'>
				Tell me, <span className='text-mixin-100'>how</span> was your <span className='text-mixin-100'>day</span>?
			</h1>
			
			<div className='h-44'>
				<div className='relative h-full'>
					<textarea
						id='feeling'
						className='focus:animate-visual absolute z-10 left-0 top-0 bottom-0 right-0 text-mixin-300 resize-none w-full h-full p-5 rounded-md font-semibold bg-mixin-500 outline-none'
						name='inputFeeling'
						placeholder='...'
						disabled={loading}
					/>
					<div className="absolute -top-40 -right-10 w-[500px] h-[500px] filter blur-xl opacity-40 bg-mixin-100 rounded-full mix-blend-multiply animate-blob animation-delay-4000" />
    			<div className="absolute -top-20 -left-10 w-[500px] h-[500px] filter blur-xl opacity-40 bg-mixin-200 rounded-full mix-blend-multiply animate-blob animation-delay-2000" />
					<div className='absolute rounded-md h-44 w-full bg-textarea bg-[length:10px_10px] text-mixin-200 opacity-40 -left-6 top-5' />
				</div>
			</div>

			<Button className='relative mt-8' label='Send Feeling' type='submit' disabled={loading} />

			<FeelingResult
				feelingClassified={promptData.label}
				existsPlaylist={playlist.length > 0}
			/>
		</form>
	)
}
