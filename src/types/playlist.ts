export interface ErrorMessageSpotify {
	message: string
}

export interface Playlist {
	collaborative: boolean
	description: string
	followers: Followers
	images: Image[]
	name: string
	owner: Owner
	public: boolean
	tracks: Tracks
	uri: string
}

export interface Followers {
	total: number
}

export interface Image {
	height: null
	url: string
	width: null
}

export interface Owner {
	display_name: string
	id: string
	uri: string
}

export interface Tracks {
	items: Item[]
	total: number
}

export interface Item {
	track: Track
}

export interface Track {
	duration_ms: number
	type: Type
}

export enum Type {
	Track = 'track'
}
