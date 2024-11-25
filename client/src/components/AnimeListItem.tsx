import { IAnime } from '@/types/type'
import React from 'react'
import { Image, Text, View } from 'react-native'

const AnimeListItem = ({ anime }: { anime: IAnime }) => {
	return (
		<View className='flex justify-center items-start bg-zinc-700 p-3 mt-3 mx-3 rounded-xl'>
			<View className='flex-row gap-3'>
				<Image
					className='w-24 h-36  rounded-xl'
					source={{ uri: anime.images.jpg.image_url }}
				/>
				<View className='flex-col justify-between'>
					<View>
						<Text className='text-white font-semibold text-base'>
							{anime.title}
						</Text>
						<Text className='text-zinc-400 text-sm font-light'>
							{anime.title_japanese}
						</Text>
					</View>
					<View className='flex-row gap-1'>
						<View className='bg-zinc-600 p-1 items-center rounded-md'>
							<Text className='text-white'>{anime.year}</Text>
						</View>
						<View className='bg-zinc-600 p-1 items-center rounded-md'>
							<Text className='text-white'>{anime.type}</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	)
}

export default AnimeListItem
