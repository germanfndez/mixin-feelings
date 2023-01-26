export async function getPlaylistByFeeling(feeling) {
	/* 
    segun el feeling obtener el id de la playlist  
  */

	/* 

	ABURRIDO = {
		Bienestar,
		Relax,
		Ejercicio
	}
 /* todo 
 
 */

	const request = fetch('https://api.spotify.com/v1/playlists/37i9dQZF1DWSqBruwoIXkA', {
		method: 'GET',
		headers: {
			Authorization:
				'Bearer BQBThw0bps1f7bfGR9GB5CwzB77iPFqEs-7Zg6DdvGhTJJhRvL-JJGov0dy2Qnvg3fR7d5b9MTve0quHjhwQ_hWdTgzlfH-gyGnYq8pmhA1zDDLxSCcZz9Qeb7yUhg7m9HVbZKpdJYfIFI_vvKv3Eiqx6tNv6kmgnbwkDldIsS9AHL5HvQ2g19sMpV4CxHo9_WCrToAv2E0BB7T9XQ',
			'Content-Type': 'application/json'
		}
	})
	const response = await request
	const data = await response.json()
	return data
}
