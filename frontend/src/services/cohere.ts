const ENDPOINT = 'https://api.cohere.ai/classify'
const COHERE_API_KEY = import.meta.env.PUBLIC_COHERE_API_KEY

type Feeling = 'Feliz' | 'Triste' | 'Aburrido' | 'Cansado' | 'Enojado'

type Example = { text: string; label: Feeling }

const examples: Example[] = [
	{ text: 'Me siento feliz', label: 'Feliz' },
	{ text: 'He tenido un dia aburrido', label: 'Aburrido' },
	{ text: 'Mucho trabajo tuve hoy', label: 'Enojado' },
	{ text: 'Estoy muy triste', label: 'Triste' },
	{ text: 'Me siento muy cansado', label: 'Enojado' },
	{ text: 'Me siento muy feliz', label: 'Feliz' },
	{ text: 'Me siento muy triste', label: 'Triste' },
	{ text: 'Me siento muy aburrido', label: 'Aburrido' },
	{ text: 'Llorando', label: 'Triste' }
]

export const classifyFeelings = async (text) => {
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
