import { useEffect, useState } from 'react'
import GithubIcon from './shared/GitHubIcon'

type Contributor = {
	html_url: string
	avatar_url: string
}

export const Footer = () => {
	const [contributors, setContributors] = useState<null | Contributor[]>(null)

	useEffect(() => {
		fetch('https://api.github.com/repos/duxianwei520/react/contributors')
			.then((response) => response.json())
			.then((data) => {
				if (data?.message) {
					if (data.message.includes('API rate limit exceeded')) {
						return setContributors(null)
					}
				}
				setContributors(data)
			})
	}, [])

	return (
		<>
			<section className='py-12 flex flex-col gap-5 w-full px-6 sm:px-10 md:px-20 bg-[#181818ba]'>
				<span className='flex items-center text-mixin-300 mb-8'>
					<GithubIcon className='mr-4' />
					<span className='font-bold text-[30px] sm:text-[40px]'>Open Source</span>
				</span>
				<p className='md:text-xl'>
					Mixin Feelings is an open source project created in a hackathon context, available
					entirely on Github.
				</p>
				<div className='flex flex-wrap gap-4'>
					{contributors?.map(({ html_url, avatar_url }, i) => {
						return (
							<a className='hover:opacity-80' href={html_url} target='_blank' key={i}>
								<img className='w-14 h-14 rounded-full' src={avatar_url} alt='contributor' />
							</a>
						)
					})}
				</div>
				<p className='md:text-xl'>
					Contributors can help fix bugs and implement new features in CodeImage.
				</p>
				<a
					className='text-1xl md:text-2xl underline underline-offset-4 hover:opacity-50 w-fit'
					href='https://github.com/Germancitoz/hackathon'
					target='_blank'
				>
					Become a contributor →
				</a>
			</section>
			<footer className='flex flex-col items-center gap-4 md:gap-0 md:flex-row w-full px-6 sm:px-10 md:px-20 justify-between py-8'>
				<div className='flex flex-col text-center md:text-left md:flex-row md:gap-3 text-[13px] md:text-sm'>
					<span className='font-bold'>
						© 2023{' '}
						<a className='hover:opacity-80' href='https://github.com/felipetodev' target='_blank'>
							Felipe
						</a>{' '}
						∙{' '}
						<a className='hover:opacity-80' href='https://github.com/Germancitoz' target='_blank'>
							Germán
						</a>{' '}
						∙{' '}
						<a className='hover:opacity-80' href='https://github.com/Franklin361' target='_blank'>
							Franklin
						</a>
					</span>
					<span className='opacity-50 hidden md:flex'>|</span>
					<span>Hackathon Midudev Cohere</span>
				</div>
				<ul className='flex gap-4 lg:gap-8 text-xs md:text-sm'>
					<li className='underline underline-offset-4 hover:opacity-50'>
						<a href='https://github.com/Germancitoz/hackathon' target='_blank'>
							GitHub
						</a>
					</li>
					<li className='underline underline-offset-4 hover:opacity-50'>
						<a href='https://github.com/Germancitoz/mixin-feelings/issues' target='_blank'>
							Issues & Feedback
						</a>
					</li>
					<li className='underline underline-offset-4 hover:opacity-50'>
						<a href='https://github.com/Germancitoz/mixin-feelings/releases' target='_blank'>
							Releases
						</a>
					</li>
				</ul>
			</footer>
		</>
	)
}
