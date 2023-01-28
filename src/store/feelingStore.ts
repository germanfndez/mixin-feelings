import { map } from 'nanostores'
import { PromptDataStore } from '../types'

export const feelingStore = map<PromptDataStore>({ label: '', text: '' })
