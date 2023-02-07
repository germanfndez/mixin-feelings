import { Fragment, lazy, Suspense } from 'react'
import { usePlaylistStore } from '../hooks'
import { PlaylistCard } from './PlaylistCard'

export const PlayList = () => {
	const [$playlist] = usePlaylistStore()

	return (
		<>
			{$playlist?.length > 0 && <AnimatedArrow />}
			<section
				id='playlist-recomendation'
				className='relative flex flex-col sm:flex-row gap-8 mb-36 w-full sm:w-auto'
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
