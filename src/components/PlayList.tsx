import { Fragment, useState } from 'react'
import { usePlaylistStore } from '../hooks'
import clsx from 'clsx'
import type { Playlist } from '../types'
import ArrowIcon from './shared/ArrowIcon'
import PauseIcon from './shared/PauseIcon'
// import { AlertFeedback } from './AlertFeedback'

type Track = {
    track: { 
        preview_url: string 
    }
}

async function fetchAndPlay (id: string) {
    const { 2: trackId } = id.split(':')
    const res = await fetch(`https://spotify23.p.rapidapi.com/playlist_tracks/?id=${trackId}&offset=0&limit=1`, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': `${import.meta.env.PUBLIC_RAPIDAPI_KEY}`,
            'X-RapidAPI-Host': `${import.meta.env.PUBLIC_RAPIDAPI_HOST}`
        }
    })
    const { items }: { items: Track[] } = await res.json()
    return items
}

export function PlaylistCard ({ images, name, owner, uri }: Playlist) {
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

        const tracks = await fetchAndPlay(uri) as Track[]
        
        tracks.forEach(({ track }) => {
            let audio = new Audio(track.preview_url)
            setTrack(audio)
            audio.play()
            audio.volume = 0.1
            setPlaying(true)

            audio.addEventListener('timeupdate', () => {
                const current: number = Math.round(audio.currentTime);
                const duration: number = Math.round(audio.duration);
                console.log({ duration, current })
                if (current === duration) {
                    setPlaying(false)
                }
            });
        })
    }
	return (
        <>
            <div className='relative z-10 bg-mixin-500 rounded-md p-4 w-[200px] hover:bg-mixin-hover group'>
                <div className='relative'>
                    <img className='rounded-md object-cover block' width={180} height={180} src={images[0].url} alt={name} />
                    <button
                        onClick={handlePlayTrack}
                        className={clsx(
                            'invisible group-hover:visible hover:scale-105 absolute right-2 bottom-2 p-2 bg-mixin-100 rounded-full', {
                                '!visible': playing
                            }
                        )}
                    >
                        {playing ? <PauseIcon /> : <ArrowIcon />}
                    </button>
                </div>
                <h4 className='text-mixin-300 mt-2 uppercase'>
                    {name}
                </h4>
                <span className='text-mixin-300 opacity-50 text-sm'>
                    By {owner.display_name}
                </span>
            </div>
        </>
	)
}

export const PlayList = () => {
	const [$playlist] = usePlaylistStore()

	return (
		<section className='relative flex gap-8 my-36'>
			{$playlist?.map(playlist => (
                <Fragment key={playlist.id}>
                    <PlaylistCard {...playlist} />
                    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-[50px] h-[350px] w-[730px] bg-textarea bg-[length:10px_10px] text-mixin-200 opacity-10' />
                </Fragment>
			))}
			{/* {existPlaylist && <AlertFeedback />} */}
		</section>
	)
}
