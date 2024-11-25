import { IAnime } from '@/types/type'
import axios from 'axios'

export async function fetchAnime(): Promise<IAnime[]> {
	try {
		const response = await axios.get<{ data: IAnime[] }>(
			'https://api.jikan.moe/v4/anime'
		)
		return response.data.data
	} catch (e) {
		alert(e)
		return []
	}
}
