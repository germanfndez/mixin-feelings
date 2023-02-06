export const config = {
  runtime: 'edge', // this is a pre-requisite
  regions: ['iad1'], // only execute this function on iad1
};

interface IRequest extends Request {
  query: string
}

export default (req: IRequest) => {
  return new Response(`Hello Spotify Tracks ${req.query} I'm now an Edge Function!`);
};
