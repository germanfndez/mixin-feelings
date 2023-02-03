import clsx from "clsx"

interface Props {
	label: string
	disabled?: boolean
	withSpinner?: boolean
	type?: 'button' | 'submit'
	onClick?: () => void
	className?: string
	tabIndex?: number
	children?: JSX.Element
}

export function Button({
	withSpinner = true,
	...props
}: Props) {
	return withSpinner ? <ButtonSpinner {...props} /> : <ButtonWithoutSpinner {...props} />
}

export const ButtonWithoutSpinner = ({
	label,
	disabled = false,
	type = 'button',
	onClick,
	className = '',
	tabIndex = 0,
	children
}: Omit<Props, 'withSpinner'>) => {

	return (
		<button
			aria-label='Button'
			className={clsx(
				'disabled:hover:cursor-not-allowed disabled:bg-mixin-hover select-none bg-mixin-500 active:bg-mixin-500 hover:bg-mixin-hover text-white p-1 rounded-md',
				className
			)}
			disabled={disabled}
			onClick={onClick}
			tabIndex={tabIndex}
			type={type}
		>{label} {children}</button>
	)
}

export const ButtonSpinner = ({
	label,
	disabled = false,
	type = 'button',
	onClick,
	className = '',
	tabIndex = 0
}: Omit<Props, 'withSpinner'>) => {

	return (
		<button
			aria-label='Button'
			className={clsx(
				'grid place-items-center bg-mixin-200 hover:bg-mixin-100 h-11 rounded-md text-mixin-300 font-bold  duration-[500ms,800ms] disabled:hover:cursor-not-allowed select-none', 
				className, {
					'grid-cols-3 bg-mixin-100': disabled,
				}
			)}
			disabled={disabled}
			onClick={onClick}
			tabIndex={tabIndex}
			type={type}
		>
			{disabled ? <Spinner /> : label}
		</button>
	)
}

export const Spinner = () => {
	return (
		<>
			<div className='grid-1 my-auto h-5 w-5 mx-3 border-t-transparent border-solid animate-spin rounded-full border-mixin-300 border-4' />
			<span className='grid-2 my-auto -mx-1'> Processing ... </span>
		</>
	)
}
