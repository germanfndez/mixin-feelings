export type Feeling =
	| 'Happy'
	| 'Sad'
	| 'Bored'
	| 'Tired'
	| 'Annoyed'
	| 'Chill'
	| 'Scared'
	| 'Horror'
	| 'Enamored'
	| 'Nervous'
	| 'Funny'


export interface FeelingStore {
	label: string
	text: string
}
