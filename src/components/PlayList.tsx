import { usePlaylistStore } from '../hooks'
import { Playlist } from '../types'
// import { AlertFeedback } from './AlertFeedback'

function PlaylistCard ({ images, name, owner }: Playlist) {
	return (
		<div className='bg-mixin-500 rounded-md p-4 w-[200px] hover:bg-mixin-hover'>
			<img className='rounded-md object-cover' width={180} height={180} src={images[0].url} alt={name} />
			<h4 className='text-mixin-300 mt-2 uppercase'>
				{name}
			</h4>
			<span className='text-mixin-300 opacity-50 text-sm'>
				By {owner.display_name}
			</span>
		</div>
	)
}

export const PlayList = () => {
	const [$playlist] = usePlaylistStore()

	// const existPlaylist = $playlist.length > 0

	return (
		<section className='flex gap-8 my-12'>
			{$playlist?.map(playlist => (
				<PlaylistCard key={playlist.id} {...playlist} />
			))}
			{/* {existPlaylist && <AlertFeedback />} */}
		</section>
	)
}
