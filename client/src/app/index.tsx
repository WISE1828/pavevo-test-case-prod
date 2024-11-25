import { fetchAnime } from '@/api/fetchAnime'
import AnimeListItem from '@/components/AnimeListItem'
import { IAnime } from '@/types/type'
import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView } from 'react-native'
import Header from '../components/Header'

const HomeScreen = () => {
	const [anime, setAnime] = useState<IAnime[]>([])

	useEffect(() => {
		const fetchData = async () => {
			const animeData = await fetchAnime()
			setAnime(animeData)
		}
		fetchData()
	}, [])

	return (
		<>
			<Header />
			<SafeAreaView className='bg-zinc-800 flex-1'>
				<FlatList
					data={anime}
					renderItem={({ item }) => <AnimeListItem anime={item} />}
					keyExtractor={item => item.mal_id.toString()}
				/>
			</SafeAreaView>
		</>
	)
}

export default HomeScreen
