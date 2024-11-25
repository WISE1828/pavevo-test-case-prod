import { fetchAnime } from '@/api/fetchAnime'
import AnimeListItem from '@/components/AnimeListItem'
import { IAnime } from '@/types/type'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, SafeAreaView } from 'react-native'
import Header from '../components/Header'

const HomeScreen = () => {
	const [anime, setAnime] = useState<IAnime[]>([])
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		fetchData()
	}, [page])

	const fetchData = async () => {
		setLoading(true)
		try {
			const animeData = await fetchAnime(page)
			setAnime(prevAnime => [...prevAnime, ...animeData])
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	const handleLoadMore = () => {
		if (!loading) {
			setPage(prevPage => prevPage + 1)
		}
	}

	return (
		<>
			<Header />
			<SafeAreaView className='bg-zinc-800 flex-1'>
				<FlatList
					data={anime}
					renderItem={({ item }) => <AnimeListItem anime={item} />}
					keyExtractor={item => item.mal_id.toString()}
					onEndReached={handleLoadMore}
					onEndReachedThreshold={0.5}
					ListFooterComponent={loading ? <ActivityIndicator size="large" color="#3f3f46" /> : null}
				/>
			</SafeAreaView>
		</>
	)
}

export default HomeScreen
