import { Form, PlayList } from '../components'
import { usePlaylistStore } from '../hooks'

export const MainContent = () => {
	const [$playlist] = usePlaylistStore()

	const existPlaylist = $playlist.length > 0

	return (
		<main
			className={`flex justify-center lg:flex-row flex-col flex-1 container overflow-hidden transition-custom ${
				existPlaylist ? 'gap-10' : 'gap-0'
			}`}
		>
			<Form />
			<PlayList />
		</main>
	)
}
