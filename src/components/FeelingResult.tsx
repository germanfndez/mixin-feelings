import { AlertFeedback } from './AlertFeedback'

interface Props {
	feelingClassified: string
	existsPlaylist: boolean
}

export const FeelingResult = ({ feelingClassified, existsPlaylist }: Props) => {
	if (!feelingClassified) return null

	return (
		<div className='relative z-10 inline-block bg-[length:400%_400%] p-2 rounded-md text-2xl bg-gradient-to-r from-mixin-100 to-[#c5fa70] via-[#e0f0c7] '>
			{existsPlaylist ? (
				<div className='flex flex-col gap-4 py-5 px-7'>
					<span>
						So if you are feeling{' '}
						<span className='font-bold underline'>{feelingClassified.toUpperCase() || 'sad'}</span>{' '}
						today.
					</span>
					<span className='font-bold'>
						You might want to listen to these playlists we selected for you:
					</span>
					<AlertFeedback />
				</div>
			) : (
				<p className='flex py-5 px-7'>
					You are feeling <span className='lowercase font-bold mx-[6px]'>{feelingClassified}</span>{' '}
					today. <br />
				</p>
			)}
		</div>
	)
}

export default FeelingResult
