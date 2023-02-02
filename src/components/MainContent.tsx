import { Form, PlayList } from '../components'

export const MainContent = () => {
	return (
		<main className='relative mt-20 flex flex-col items-center mx-auto px-10 md:px-20 min-h-[600px]'>
			<Form />
			<PlayList />
		</main>
	)
}
