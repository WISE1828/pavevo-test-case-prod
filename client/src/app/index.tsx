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
	const [selectedFilter, setSelectedFilter] = useState<string | null>(null)

	useEffect(() => {
		fetchData()
	}, [page, selectedFilter])

	const fetchData = async () => {
		setLoading(true)
		try {
			const animeData = await fetchAnime(page, selectedFilter)
			if (page === 1) {
				setAnime(animeData)
			} else {
				setAnime(prevAnime => [...prevAnime, ...animeData])
			}
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

	const handleFilterChange = (filter: string | null) => {
		setSelectedFilter(filter)
		setPage(1)
	}

	return (
		<>
			<Header selectedFilter={selectedFilter} setSelectedFilter={handleFilterChange} />
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