import { IAnime } from '@/types/type'
import axios from 'axios'

export async function fetchAnime(
	page: number = 1,
	type: string | null = null,
	dateRange: { from: string; to: string } = { from: '', to: '' }
): Promise<IAnime[]> {
	try {
		const typeQuery = type ? `&type=${type}` : ''
		const yearQuery =
			dateRange.from && dateRange.to
				? `&start_date=${dateRange.from}-01-01&end_date=${dateRange.to}-12-31`
				: ''
		const response = await axios.get<{ data: IAnime[] }>(
			`https://api.jikan.moe/v4/anime?page=${page}${typeQuery}${yearQuery}`
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
