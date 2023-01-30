const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				mixin: {
					100: '#1DB954',
					200: '#1ED760',
					300: '#FFFFFF',
					400: '#191414',
					500: '#181818'
				},
				'mixin-hover': '#282828'
			},
			fontFamily: {
				sans: ['Inter', ...defaultTheme.fontFamily.sans]
			},
			backgroundImage: {
				textarea: 'radial-gradient(currentColor 1px,transparent 1px)',
				bg: 'linear-gradient(rgba(108, 56, 255, 0.8) 0%, rgba(181, 154, 255, 0.8) 100%)'
			},
			animation: {
				visual: 'visual 2s ease-in-out infinite alternate',
				blob: 'blob 8s infinite'
			},
			keyframes: {
				visual: {
					'0%': {
						filter:
							'drop-shadow(0 0 2px #6c38ff6b) drop-shadow(0 0 4px #6c38ff6b) drop-shadow(0 0 6px #6c38ff6b)'
					},
					'50%': {
						filter:
							'drop-shadow(0 0 3px #6c38ff6b) drop-shadow(0 0 6px #6c38ff6b) drop-shadow(0 0 9px #6c38ff6b)'
					}
				},
				blob: {
					'0%': { transform: 'scale(1)' },
					'33%': { transform: 'scale(1.1)' },
					'66%': { transform: 'scale(0.9)' },
					'100%': { transform: 'scale(1)' }
				}
			}
		}
	},
	plugins: []
}
