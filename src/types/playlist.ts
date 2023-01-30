export interface Playlist {
	id: string
	name: string
	images: any[]
	href: string
	uri?: string
	owner: {
		display_name: string
	}
}
