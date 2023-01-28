import { defineConfig } from 'astro/config'
import svelte from '@astrojs/svelte'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'

export default defineConfig({
	integrations: [svelte(), react(), tailwind()]
})
