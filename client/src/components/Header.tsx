import FontAwesome from '@expo/vector-icons/FontAwesome'
import React, { useState } from 'react'
import { Pressable, TextInput, View } from 'react-native'
import FilterModal from './FilterModal'

interface HeaderProps {
	selectedFilter: string | null
	setSelectedFilter: (filter: string | null) => void
	dateRange: { from: string; to: string }
	setDateRange: (range: { from: string; to: string }) => void
	setPage: (page: number) => void // Добавлено для сброса страницы
}

const Header: React.FC<HeaderProps> = ({ selectedFilter, setSelectedFilter, dateRange, setDateRange, setPage }) => {
	const [modalVisible, setModalVisible] = useState(false)

	const isDateRangeActive = dateRange.from !== '' && dateRange.to !== ''

	return (
		<View className='bg-zinc-700 pt-20 p-3 flex-row gap-3'>
			<Pressable
				className={`w-12 aspect-square rounded-xl items-center justify-center ${selectedFilter || isDateRangeActive ? 'bg-blue-600' : 'bg-zinc-600'}`}
				onPress={() => setModalVisible(true)}
			>
				<FontAwesome name='filter' size={24} color='white' />
			</Pressable>
			<View className='flex-1'>
				<TextInput
					className='h-12 bg-zinc-600 rounded-xl pl-11 text-white font-normal placeholder:text-zinc-300'
					placeholder='Search'
				/>
				<FontAwesome
					className='absolute top-2.5 left-2.5'
					name='search'
					size={24}
					color='white'
				/>
			</View>
			<FilterModal
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				selectedFilter={selectedFilter}
				setSelectedFilter={setSelectedFilter}
				dateRange={dateRange}
				setDateRange={setDateRange}
				setPage={setPage} // Передаем функцию для сброса страницы
			/>
		</View>
	)
}

export default Header