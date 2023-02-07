import { Toaster } from 'react-hot-toast'
import { Form, PlayList } from '../components'
import { PlayerProvider } from '../context'

export const MainContent = () => {
	return (
		<main className='relative mt-20 flex flex-col items-center mx-auto px-10 md:px-20 min-h-[600px]'>
			<Form />
			<PlayerProvider>
				<PlayList />
			</PlayerProvider>
			<Toaster
				containerStyle={{
					bottom: 35
				}}
				position='bottom-right'
			/>
		</main>
	)
}
