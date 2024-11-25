import FontAwesome from '@expo/vector-icons/FontAwesome'
import React, { useState } from 'react'
import { Pressable, TextInput, View } from 'react-native'
import FilterModal from './FilterModal'

interface HeaderProps {
	selectedFilter: string | null
	setSelectedFilter: (filter: string | null) => void
}

const Header: React.FC<HeaderProps> = ({ selectedFilter, setSelectedFilter }) => {
	const [modalVisible, setModalVisible] = useState(false)

	return (
		<View className='bg-zinc-700 pt-20 p-3 flex-row gap-3'>
			<Pressable
				className={`w-12 aspect-square rounded-xl items-center justify-center ${selectedFilter ? 'bg-blue-600' : 'bg-zinc-600'
					}`}
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
			/>
		</View>
	)
}

export default Header