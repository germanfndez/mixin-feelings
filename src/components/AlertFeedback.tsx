import { Button } from '../components';
import { useFeelingStore } from '../hooks';
import { successPrompt } from '../supabase/functions/prompts';

export const AlertFeedback = () => {

    const [$feeling] = useFeelingStore()
    const handleSuccessProm = async () => {
        try {
            await successPrompt({ ...$feeling })
            // alert('Este boton no hace nada aun')
            alert('Exitoso')
        } catch (error) {
            alert('Fallo supabase feedback')
        }
    }

    return (
        <div className='absolute top-0 bg-black p-5 rounded-md flex flex-col gap-5'>
            <p>was this result useful to you?</p>
            <Button label='Yes' onClick={handleSuccessProm} className='w-full' />
        </div>
    )
}