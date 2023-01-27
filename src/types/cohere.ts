import type { Feeling } from './feelings'

export interface CohereResponse {
	id: string
	classifications: Classification[]
}

export interface Classification {
	id: string
	input: string
	prediction: string
	confidence: number
	labels: Feeling
}
