import { IAnime } from '@/types/type'
import axios from 'axios'

export async function fetchAnime(
	page: number = 1,
	type: string | null = null
): Promise<IAnime[]> {
	try {
		const typeQuery = type ? `&type=${type}` : ''
		const response = await axios.get<{ data: IAnime[] }>(
			`https://api.jikan.moe/v4/anime?page=${page}${typeQuery}`
		)
		return response.data.data
	} catch (e) {
		if (axios.isAxiosError(e)) {
			console.error('Axios error:', e.message)
		} else {
			console.error('Unexpected error:', e)
		}
		return []
	}
}
