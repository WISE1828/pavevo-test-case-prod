import Ionicons from '@expo/vector-icons/Ionicons'
import Checkbox from 'expo-checkbox'
import React, { useState } from 'react'
import {
	Modal,
	Pressable,
	SafeAreaView,
	Text,
	View,
} from 'react-native'

interface ModalProps {
	modalVisible: boolean
	setModalVisible: (visible: boolean) => void
	selectedFilter: string | null
	setSelectedFilter: (filter: string | null) => void
}

const FilterModal: React.FC<ModalProps> = ({
	modalVisible,
	setModalVisible,
	selectedFilter,
	setSelectedFilter,
}) => {
	const [localFilter, setLocalFilter] = useState<string | null>(selectedFilter)

	const toggleFilter = (type: string) => {
		setLocalFilter(prevFilter => (prevFilter === type ? null : type))
	}

	const applyFilters = () => {
		setSelectedFilter(localFilter)
		setModalVisible(false)
	}

	const resetFilters = () => {
		setLocalFilter(null)
		setModalVisible(false)
		setSelectedFilter(null)
	}

	return (
		<Modal
			animationType='slide'
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => setModalVisible(false)}
		>
			<SafeAreaView className='bg-zinc-800 w-full h-full justify-between'>
				<View className='flex-row items-center justify-between p-3'>
					<Pressable onPress={() => setModalVisible(false)}>
						<Ionicons name='close' size={32} color='white' />
					</Pressable>
					<View className='p-1.5 bg-zinc-700 rounded-md'>
						<Text className='text-white text-lg font-semibold'>Filters</Text>
					</View>
					<Pressable onPress={resetFilters}>
						<Text className='text-zinc-200'>Default</Text>
					</Pressable>
				</View>
				<View className='flex-col mt-5 gap-5 px-3 flex-1'>
					<View className='gap-5'>
						<Text className='text-white text-xl font-bold'>Types</Text>
						{['tv', 'movie', 'ova', 'special', 'ona', 'music', 'cm', 'pv', 'tv_special'].map(type => (
							<View key={type} className='flex-row gap-2 items-center'>
								<Checkbox
									value={localFilter === type}
									onValueChange={() => toggleFilter(type)}
								/>
								<Text className='text-white text-lg'>{type}</Text>
							</View>
						))}
					</View>
				</View>
				<Pressable onPress={applyFilters} className='bg-zinc-200 p-3 items-center mb-5 mx-3 rounded-xl'>
					<Text className='text-lg font-semibold'>Apply</Text>
				</Pressable>
			</SafeAreaView>
		</Modal>
	)
}

export default FilterModal