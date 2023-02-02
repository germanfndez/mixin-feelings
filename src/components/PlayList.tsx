import { Fragment, lazy, Suspense, useState } from 'react'
import { usePlaylistStore } from '../hooks'
import clsx from 'clsx'
import type { Playlist } from '../types'
import ArrowIcon from './shared/ArrowIcon'
import PauseIcon from './shared/PauseIcon'

type Track = {
	track: {
		preview_url: string
	}
}

async function fetchAndPlay(id: string): Promise<Track[]> {
	const { 2: trackId } = id.split(':')
	const res = await fetch(
		`https://spotify23.p.rapidapi.com/playlist_tracks/?id=${trackId}&offset=0&limit=1`,
		{
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': `${import.meta.env.PUBLIC_RAPIDAPI_KEY}`,
				'X-RapidAPI-Host': `${import.meta.env.PUBLIC_RAPIDAPI_HOST}`
			}
		}
	)
	const { items } = (await res.json()) as { items: Track[] }
	return items
}

export function PlaylistCard({ images, name, owner, uri }: Playlist) {
	const [track, setTrack] = useState<HTMLAudioElement | null>(null)
	const [playing, setPlaying] = useState<boolean>(false)
	const handlePlayTrack = async () => {
		if (track && playing) {
			setPlaying(!playing)
			track.pause()
			return
		}
		if (track && !playing) {
			setPlaying(!playing)
			track.play()
			return
		}

		const tracks = await fetchAndPlay(uri)

		tracks.forEach(({ track }) => {
			let audio = new Audio(track.preview_url)
			setTrack(audio)
			audio.play()
			audio.volume = 0.1
			setPlaying(true)

			audio.addEventListener('timeupdate', () => {
				const current: number = Math.round(audio.currentTime)
				const duration: number = Math.round(audio.duration)
				if (current === duration) {
					setPlaying(false)
				}
			})
		})
	}
	return (
		<div className='relative z-10 flex flex-row gap-4 sm:flex-col bg-mixin-500 rounded-md p-4 w-full sm:w-[180px] md:w-[200px] hover:bg-mixin-hover group'>
			<div className='sm:relative'>
				<img
					className='aspect-square rounded-md object-cover block min-w-[56px] w-14 h-14 sm:min-w-[150px] sm:w-[150px] sm:h-[150px] md:w-[180px] md:h-[180px] md:h-full'
					src={images[0].url}
					alt={name}
				/>
				<button
					onClick={handlePlayTrack}
					className={clsx(
						'invisible group-hover:visible hover:scale-105 absolute right-3 bottom-6 sm:right-2 sm:bottom-2 p-2 bg-mixin-100 rounded-full',
						{
							'!visible': playing
						}
					)}
				>
					{playing ? <PauseIcon /> : <ArrowIcon />}
				</button>
			</div>
			<div className='w-full'>
				<h4 className='text-overflow text-mixin-300 mt-2 uppercase whitespace-normal'>{name}</h4>
				<span className='text-mixin-300 opacity-50 text-sm'>By {owner.display_name}</span>
			</div>
		</div>
	)
}

export const PlayList = () => {
	const [$playlist] = usePlaylistStore()

	return (
		<>
			{$playlist?.length > 0 && <AnimatedArrow />}
			<section
				id='playlist-recomendation'
				className='relative flex flex-col sm:flex-row gap-8 mb-36 '
			>
				{$playlist?.map((playlist, index) => (
					<Fragment key={playlist.uri}>
						<PlaylistCard {...playlist} />
						{$playlist.length === index + 1 && (
							<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-[50px] h-[450px] sm:h-[350px] w-[730px] bg-textarea bg-[length:10px_10px] text-mixin-200 opacity-10' />
						)}
					</Fragment>
				))}
			</section>
		</>
	)
}

const LazyAnimatedArrow = lazy(() => import('./shared/AnimatedArrow'))

export const AnimatedArrow = () => {
	return (
		<Suspense fallback={<></>}>
			<LazyAnimatedArrow />
		</Suspense>
	)
}
