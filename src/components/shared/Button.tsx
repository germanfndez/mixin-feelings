interface Props {
	label: string
	disabled?: boolean
	type?: 'button' | 'submit'
	onClick?: () => void
	className?: string
}

export function Button({ label, disabled = false, type = 'button', onClick, className = '' }: Props) {
	return (
		<button
			onClick={onClick}
			aria-label='Button'
			type={type}
			className={`grid ${disabled
				? 'grid-cols-3 bg-indigo-500'
				: 'place-items-center bg-indigo-600 hover:bg-indigo-500'
				}  h-11 rounded-md text-white font-bold  duration-[500ms,800ms] disabled:hover:cursor-not-allowed select-none ${className}`}
			disabled={disabled}
		>
			{disabled ? <Spinner /> : label}
		</button>
	)
}

export const Spinner = () => {
	return (
		<>
			<div className='grid-1 my-auto h-5 w-5 mx-3 border-t-transparent border-solid animate-spin rounded-full border-white border-4' />
			<span className='grid-2 my-auto -mx-1'> Processing ... </span>
		</>
	)
}
