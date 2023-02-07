import { map } from 'nanostores'
import type { PromptDataStore } from '../types'

export const feelingStore = map<PromptDataStore>({ label: '', text: '' })
