import { getPromptsData } from '../supabase/functions/prompts/index'
import type { CohereResponse } from '../types/cohere'
import type { Example } from '../types/example'

const ENDPOINT = 'https://api.cohere.ai/classify'
const COHERE_API_KEY = import.meta.env.PUBLIC_COHERE_API_KEY

const examples: Example[] = await getPromptsData()

export const classifyFeelings = async (text: string): Promise<CohereResponse> => {
	try {
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
	} catch (error) {
		console.log(error)
		return null
	}
}
