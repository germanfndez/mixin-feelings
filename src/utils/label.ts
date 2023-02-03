import playlist from '../data/playlist.json'

export const getLabels = (): string[] => Object.keys(playlist).map(item => item.toLowerCase())