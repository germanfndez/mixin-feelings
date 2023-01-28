import { useStore } from '@nanostores/react'
import { WritableAtom } from 'nanostores'
import { feelingStore } from '../store/feelingStore'
import { PromptDataStore } from '../types'

type usePrompDataStoreReturn = [PromptDataStore, WritableAtom<PromptDataStore>]

export const usePrompDataStore = (): usePrompDataStoreReturn => {
	const promptData = useStore(feelingStore)
	return [promptData, feelingStore]
}
