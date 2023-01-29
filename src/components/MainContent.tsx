import { Form, PlayList } from '../components'

export const MainContent = () => {
	return (
		<main
			className='flex flex-col items-center mx-auto container min-h-[600px] before:bg-bg before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:w-[600px] before:h-[600px] before:blur-3xl before:opacity-20 before:rounded-full'
		>
			<Form />
			<PlayList />
		</main>
	)
}
