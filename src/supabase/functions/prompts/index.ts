import { createClient } from '@supabase/supabase-js'
import { Example } from '../../../types/example'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getPromptsData(): Promise<Example[]> {
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
