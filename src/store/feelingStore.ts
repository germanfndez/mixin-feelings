import { map } from 'nanostores'
import { FeelingStore } from '../types'

export const feelingStore = map<FeelingStore>({ label: '', text: '' })
