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
			<div className='relative z-10 inline-block bg-[length:400%_400%] p-2 rounded-md text-2xl bg-gradient-to-r from-mixin-100 to-[#c5fa70] via-[#e0f0c7] '>
				<div className='py-5 px-7'>
					You are feeling <span className='uppercase font-bold'>SAD</span> {' '} today.
				</div>
			</div>
		</main>
	)
}
