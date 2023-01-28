import { atom } from 'nanostores'
import type { Playlist } from '../types';


export const playListStore = atom<Playlist[]>([])
