export interface IAnime {
	mal_id: number
	images: {
		jpg: {
			image_url: string
			small_image_url: string
			large_image_url: string
		}
		webp: {
			image_url: string
			small_image_url: string
			large_image_url: string
		}
	}
	title: string
	title_japanese: string
	type: string
	aired: {
		from: string
		to: string
		prop: {
			from: {
				day: number
				month: number
				year: number
			}
			to: {
				day: number
				month: number
				year: number
			}
			string: string
		}
	}
	year: number
}
