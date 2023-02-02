import toast from 'react-hot-toast'
interface Props {
	label: string
	type: 'error' | 'success'
}

export const customToast = ({ label, type }: Props) => {
	toast[type](label, {
		style: {
			backgroundColor: '#181818',
			color: '#FFF',
			border: '1px solid #6c38ff6b'
		},
		duration: 3000
	})
}
