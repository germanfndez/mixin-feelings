import { createClient } from '@supabase/supabase-js'
import { Example } from '../../../types/example'

const supabaseUrl = 'https://aenwqzueyzbzpootqhfp.supabase.co'
const supabaseAnonKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlbndxenVleXpienBvb3RxaGZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ3ODEwMTEsImV4cCI6MTk5MDM1NzAxMX0.SnEGaCv0hFvbZ5Z-g6ZpueQAkyhqRLy9uKRgS_dFCHQ'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getPromptsData(): Promise<Array<Example>> {
	const { data, error, status } = await supabase.from('prompts').select()
	return data.map((prompt) => {
		return {
			text: prompt.text,
			label: prompt.label
		}
	})
}

export async function successPrompt({ text, label }) {
	text = text.trim().toLowerCase()
	const { data, error, status } = await supabase.from('prompts').insert([{ text, label }])

	return status
}
