import Lottie from 'lottie-react'
import arrowAnimation from '../../assets/98231-down-arrow.json'

const AnimatedArrow = () => {
	return (
		<div className='m-auto mb-5'>
			<Lottie className='h-[90px] w-[110px]' animationData={arrowAnimation} loop={true} />
		</div>
	)
}

export default AnimatedArrow
