import ArrowIcon from './shared/ArrowIcon'
import PauseIcon from './shared/PauseIcon'
import { usePlayer } from '../context'
import clsx from 'clsx'
import type { Playlist } from '../types'

export function PlaylistCard({ images, name, owner, uri }: Playlist) {
	const { playing, trackUri, fetchAndPlay } = usePlayer()
	const isPlaying = playing && trackUri === uri

	return (
		<div className='relative z-10 flex flex-row gap-4 items-center sm:flex-col bg-mixin-500 rounded-md p-4 w-full sm:w-[180px] md:w-[200px] hover:bg-mixin-hover group'>
			<div className='sm:relative'>
				<img
					className='aspect-square rounded-md object-cover block min-w-[56px] w-14 h-14 sm:min-w-[150px] sm:w-[150px] sm:h-[150px] md:w-[180px] md:h-full'
					src={images[0].url}
					alt={name}
				/>
				<button
					onClick={() => fetchAndPlay(uri)}
					className={clsx(
						'group-hover:visible hover:scale-105 absolute right-3 bottom-6 sm:right-2 sm:bottom-2 p-2 bg-mixin-100 rounded-full',
						{
							invisible: !isPlaying,
							visible: isPlaying
						}
					)}
				>
					{isPlaying ? <PauseIcon /> : <ArrowIcon />}
				</button>
			</div>
			<div className='w-full'>
				<h4 className='text-overflow text-mixin-300 mt-2 uppercase whitespace-normal'>{name}</h4>
				<span className='text-mixin-300 opacity-50 text-sm'>By {owner.display_name}</span>
			</div>
		</div>
	)
}
