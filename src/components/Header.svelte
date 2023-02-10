<script>
	import GithubIcon from './GithubIcon.svelte'
	import GithubStar from './GithubStar.svelte'
	import { repoStars } from '../data/github-repo-data.json'

	let stars = repoStars
</script>

<header
	class="fixed z-50 backdrop-blur-xl w-full py-4 px-6 sm:px-10 md:px-20 b flex justify-between items-center gap-4"
>
	<h1 class="text-xl sm:text-2xl font-bold md:text-3xl">Mixin Feelings</h1>
	<div class="flex">
		<a
			href="https://github.com/Germancitoz/mixin-feelings"
			target="_blank"
			rel="noopener noreferrer"
			class="flex justify-center items-center px-3 py-2 gap-1 border-2 bg-zinc-900 border-[#252525] hover:border-mixin-100  rounded-l-xl transition-colors text-sm"
			><GithubIcon /> <GithubStar /> Star
		</a>
		<a
			href="https://github.com/Germancitoz/mixin-feelings/stargazers"
			target="_blank"
			rel="noopener noreferrer"
			class="px-3 py-2 gap-1 border-2 bg-zinc-900 border-[#252525] hover:border-mixin-100 rounded-r-xl  transition-colors text-sm"
			>{stars ?? 1}</a
		>
	</div>
</header>
