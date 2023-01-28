import { usePlaylistStore } from '../hooks'
import { Playlist } from '../types'
import { AlertFeedback } from './AlertFeedback'

export const PlayList = () => {
	const [$playlist] = usePlaylistStore()

	const existPlaylist = $playlist.length > 0

	return (
		<aside
			className={`${
				existPlaylist ? 'lg:w-1/2 w-full transition-custom p-5' : 'w-0'
			} rounded-md min-h-[400px] bg-slate-900 shadow-xl shadow-black/30 gap-5 flex flex-col justify-between items-center`}
		>
			{$playlist?.map(({ href, id, images, name }) => (
				<PlayListItem key={id} id={id} href={href} images={images} name={name} />
			))}
			{existPlaylist && <AlertFeedback />}
		</aside>
	)
}

export const PlayListItem = ({ name, href, images }: Playlist) => {
	return (
		<a
			href={href}
			target='_blank'
			className='backdrop-blur-lg bg-black/20 rounded-md flex justify-start gap-5 items-center w-full cursor-pointer shadow-lg hover:shadow-indigo-900/50 transition-all group flex-1 fadeInUp'
		>
			<div className='w-28 h-28 group-hover:w-32 group-hover:h-32 transition-all bg-indigo-600 rounded-tl-md rounded-bl-md' />
			<p className='font-semibold'>{name}</p>
		</a>
	)
}
