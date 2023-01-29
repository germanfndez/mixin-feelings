import GithubIcon from "./shared/GitHubIcon"

export const Footer = () => {
	return (
		<>
			<section className='py-12 flex flex-col gap-5 w-full px-20 bg-[#181818ba]'>
				<span className="flex items-center text-mixin-300 mb-8">
					<GithubIcon className="mr-4" />
					<span className="font-bold text-[40px]">Open Source</span>
				</span>
				<p className="text-1xl">
					Mixin Feelings is an open source project created in a hackathon context, available entirely on Github.
				</p>
				<div className="flex gap-4">
					<a className="hover:opacity-80" href="https://github.com/felipetodev" target='_blank'>
						<img className="w-14 h-14 rounded-full" src="https://unavatar.io/github/felipetodev" alt="user" />
					</a>
					<a className="hover:opacity-80" href="https://github.com/Germancitoz" target='_blank'>
						<img className="w-14 h-14 rounded-full" src="https://unavatar.io/github/Germancitoz" alt="user" />
					</a>
					<a className="hover:opacity-80" href="https://github.com/Franklin361" target='_blank'>
						<img className="w-14 h-14 rounded-full" src="https://unavatar.io/github/Franklin361" alt="user" />
					</a>
				</div>
				<p className="text-1xl">
					Contributors can help fix bugs and implement new features in CodeImage.
				</p>
				<a className="text-2xl underline underline-offset-4 hover:opacity-50 w-fit" href="https://github.com/Germancitoz/hackathon" target='_blank'>
					Become a contributor →
				</a>
			</section>
			<footer className="w-full flex px-20 justify-between text-sm py-8">
				<div className="flex gap-3">
					<span className="font-bold">
						© 2023{' '}
						<a className="hover:opacity-80" href="https://github.com/felipetodev" target='_blank'>
							Felipe
						</a>
						{' '}∙{' '}
						<a className="hover:opacity-80" href="https://github.com/Germancitoz" target='_blank'>
							Germán
						</a>
						{' '}∙{' '}
						<a className="hover:opacity-80" href="https://github.com/Franklin361" target='_blank'>
							Franklin
						</a>
					</span>
					<span className="opacity-50">|</span>
					<span>Hackathon Midudev Cohere ❤️</span>
				</div>
				<ul className="flex gap-8">
					<li className="underline underline-offset-4 hover:opacity-50">
						<a href="https://github.com/Germancitoz/hackathon" target='_blank'>
							GitHub
						</a>
					</li>
					<li className="underline underline-offset-4 hover:opacity-50">
						<a href="https://github.com/Germancitoz/mixin-feelings/issues" target='_blank'>
							Issues & Feedback
						</a>
					</li>
					<li className="underline underline-offset-4 hover:opacity-50">
						<a href="https://github.com/Germancitoz/mixin-feelings/releases" target='_blank'>
							Releases
						</a>
					</li>
				</ul>
			</footer>
		</>
	)
}
