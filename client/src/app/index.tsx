import { fetchAnime } from '@/api/fetchAnime'
import AnimeListItem from '@/components/AnimeListItem'
import { IAnime } from '@/types/type'
import _ from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, SafeAreaView } from 'react-native'
import Header from '../components/Header'

const HomeScreen = () => {
	const [anime, setAnime] = useState<IAnime[]>([])
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(false)
	const [selectedFilter, setSelectedFilter] = useState<string | null>(null)
	const [dateRange, setDateRange] = useState<{ from: string; to: string }>({ from: '', to: '' })
	const [hasMore, setHasMore] = useState(true)

	const fetchData = useCallback(
		_.debounce(async (page: number, type: string | null, dateRange: { from: string; to: string }) => {
			if (!hasMore) return

			setLoading(true)
			try {
				const animeData = await fetchAnime(page, type, dateRange)
				if (animeData.length === 0) {
					setHasMore(false)
				} else {
					setAnime(prevAnime => (page === 1 ? animeData : [...prevAnime, ...animeData]))
				}
			} catch (error) {
				console.error(error)
			} finally {
				setLoading(false)
			}
		}, 300),
		[hasMore]
	)

	useEffect(() => {
		setHasMore(true)
		fetchData(page, selectedFilter, dateRange)
	}, [page, selectedFilter, dateRange, fetchData])

	const handleLoadMore = () => {
		if (!loading && hasMore) {
			setPage(prevPage => prevPage + 1)
		}
	}

	return (
		<>
			<Header
				selectedFilter={selectedFilter}
				setSelectedFilter={setSelectedFilter}
				dateRange={dateRange}
				setDateRange={setDateRange}
				setPage={setPage} // Передаем функцию для сброса страницы
			/>
			<SafeAreaView className='bg-zinc-800 flex-1'>
				<FlatList
					data={anime}
					renderItem={({ item }) => <AnimeListItem anime={item} />}
					onEndReached={handleLoadMore}
					onEndReachedThreshold={0.5}
					ListFooterComponent={loading ? <ActivityIndicator size="large" color="#3f3f46" /> : null}
				/>
			</SafeAreaView>
		</>
	)
}

export default HomeScreen