import arrow from '../assets/84339-arrow-down.json'
import Lottie from 'lottie-react'

interface Props {
	feelingClassified: string
	existsPlaylist: boolean
}

export const FeelingResult = ({ feelingClassified, existsPlaylist }: Props) => {
	if (!feelingClassified) return null

	return (
		<div className='text-2xl text-white p-3 bg-slate-800 lg:w-[550px] w-full m-auto relative'>
			{existsPlaylist ? (
				<>
					<p className='fadeInUp text-center '>
						So if you are feeling
						<span className='lowercase font-bold'> {feelingClassified}</span> today. <br />
						<span className=' font-bold'>
							You might want to listen to these playlists we selected for you.
						</span>
					</p>
					<Lottie
						animationData={arrow}
						loop={2}
						className='w-1/12 lg:block hidden absolute -right-12 -top-5 -rotate-[120deg] z-50'
					/>
				</>
			) : (
				<p className='fadeInUp text-center '>
					You are feeling <span className='lowercase font-bold'>{feelingClassified}</span> today.{' '}
					<br />
				</p>
			)}
		</div>
	)
}

export default FeelingResult
