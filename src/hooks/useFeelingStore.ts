import { useStore } from '@nanostores/react'
import { WritableAtom } from 'nanostores'
import { feelingStore } from '../store/feelingStore'
import { FeelingStore } from '../types'

type useFeelingStoreReturn = [FeelingStore, WritableAtom<FeelingStore>]

export const useFeelingStore = (): useFeelingStoreReturn => {
	const $feelingStore = useStore(feelingStore)
	return [$feelingStore, feelingStore]
}
