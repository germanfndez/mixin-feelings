import toast from 'react-hot-toast';
interface Props {
    label: string
    type: 'error' | 'success'
}

export const customToast = ({ label, type }: Props) => {
    toast[type](
        label,
        {
            style: {
                backgroundColor: '#181818',
                color: '#FFF',
                border: '1px solid #1ED760',
                boxShadow: '5px 5px 40px -3px #1ed75f62',
                fontWeight: 'bold'
            },
            duration: 3000
        }
    )
}