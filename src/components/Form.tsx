import { lazy, Suspense } from 'react';
import { useFormFeeling } from '../hooks';
import { Button } from '../components';

const FeelingResult = lazy(() => import('./FeelingResult'))

export function Form() {

	const { feeling, loading, onSubmit, playlist } = useFormFeeling()

	return (
		<form onSubmit={onSubmit}
			className={`flex flex-col gap-5 relative transition-custom lg:w-[600px] w-full`}
		>
			<label htmlFor='feeling' className='font-semibold'>
				Tell me, how was your day?
			</label>

			<textarea
				id='feeling'
				className='text-black resize-none w-full h-44 p-5 rounded-md font-semibold'
				name='inputFeeling'
				placeholder='...'
				disabled={loading}
			/>
			<Button label='Send Feeling' type='submit' disabled={loading} />

			<Suspense fallback={<></>}>
				<FeelingResult feelingClassified={feeling.label} existsPlaylist={playlist.length > 0} />
			</Suspense>
		</form>
	)
}
