<script>
	import { onMount } from 'svelte'
	import GithubIcon from './GithubIcon.svelte'
	import GithubStar from './GithubStar.svelte'

	let stars = 0

	async function getStars() {
		const request = await fetch('https://api.github.com/repos/Germancitoz/notis-app/stargazers')
		const stars = (await request.json()).length
		return stars
	}

	onMount(async () => {
		stars = await getStars()
	})
</script>

<header class="p-8 b flex justify-around items-center gap-4">
	<h1 class="text-3xl font-bold md:text-5xl sm:text-4xl ">Mixin Feelings</h1>
	<div class="flex">
		<a
			href="https://github.com/Germancitoz/mixin-feelings"
			class="flex justify-center items-center px-3 py-2 gap-1 border-2 border-[#252525] hover:border-mixin-100  rounded-l-xl transition-colors text-sm"
			><GithubIcon /> <GithubStar /> Star
		</a>
		<a
			href="https://github.com/Germancitoz/mixin-feelings/stargazers"
			class="px-3 py-2 gap-1 border-2 bg-zinc-900 border-[#252525] hover:border-mixin-100 rounded-r-xl  transition-colors text-sm"
			>{stars}</a
		>
	</div>
</header>
