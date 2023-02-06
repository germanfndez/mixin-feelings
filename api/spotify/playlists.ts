export const config = {
  runtime: 'edge',
  regions: ['iad1']
}

export default (req: Request) => {
  return new Response(`Hello Spotify Playlists ${req.url} I'm now an Edge Function!`)
}
