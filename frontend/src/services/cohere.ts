import type { CohereResponse } from '../types/cohere'
import type { Example } from '../types/example'

const ENDPOINT = 'https://api.cohere.ai/classify'
const COHERE_API_KEY = import.meta.env.PUBLIC_COHERE_API_KEY

const examples: Example[] = [
	{ text: 'I feel happy', label: 'Happy' },
	{ text: 'I pass my exam', label: 'Happy' },
	{ text: 'I feel sad', label: 'Sad' },
	{ text: 'I was crying all day', label: 'Sad' },
	{ text: 'I feel bad thoughts', label: 'Scared' },
	{ text: 'I am afraid of something', label: 'Scared' },
	{ text: 'I feel like I want to hit someone', label: 'Annoyed' },
	{ text: 'I am furious', label: 'Annoyed' },
	{ text: 'I need to do something with my life', label: 'Bored' },
	{ text: 'I dont know what to do', label: 'Bored' },
	{ text: 'I have too much things to do', label: 'Tired' },
	{ text: 'I did a lot of things today', label: 'Tired' },
	{ text: 'I am relax', label: 'Chill' },
	{ text: 'I am calm', label: 'Chill' },
	{ text: 'I am in love', label: 'Enamored' },
	{ text: 'I feel enamored with someone', label: 'Enamored' },
	{ text: 'I felt nervous in the interview', label: 'Nervous' },
	{ text: 'I feel nervous to speak in public', label: 'Nervous' }
]

export const classifyFeelings = async (text): Promise<CohereResponse> => {
	const request = await fetch(ENDPOINT, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `BEARER ${COHERE_API_KEY}`,
			'Cohere-Version': '2022-12-06'
		},
		body: JSON.stringify({
			inputs: [text],
			examples,
			truncate: 'END'
		})
	})
	const data = await request.json()
	return data
}
