import { useStore } from '@nanostores/react'
import { playListStore } from '../store/playlistStore'
import { WritableAtom } from 'nanostores'
import { Playlist } from '../types'

type usePlaylistStoreReturn = [Playlist[], WritableAtom<Playlist[]>]

export const usePlaylistStore = (): usePlaylistStoreReturn => {
	const $playlist = useStore(playListStore)
	return [$playlist, playListStore]
}
