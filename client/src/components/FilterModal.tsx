import Ionicons from '@expo/vector-icons/Ionicons'
import Checkbox from 'expo-checkbox'
import React, { useState } from 'react'
import {
	Keyboard,
	Modal,
	Pressable,
	SafeAreaView,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from 'react-native'

interface ModalProps {
	modalVisible: boolean
	setModalVisible: (visible: boolean) => void
	selectedFilter: string | null
	setSelectedFilter: (filter: string | null) => void
	dateRange: { from: string; to: string }
	setDateRange: (range: { from: string; to: string }) => void
}

const FilterModal: React.FC<ModalProps> = ({
	modalVisible,
	setModalVisible,
	selectedFilter,
	setSelectedFilter,
	dateRange,
	setDateRange,
}) => {
	const [localFilter, setLocalFilter] = useState<string | null>(selectedFilter)
	const [localDateRange, setLocalDateRange] = useState(dateRange)
	const [error, setError] = useState(false)

	const toggleFilter = (type: string) => {
		setLocalFilter(prevFilter => (prevFilter === type ? null : type))
	}

	const applyFilters = () => {
		const currentYear = new Date().getFullYear().toString()
		const toYear = localDateRange.to || currentYear

		if (parseInt(localDateRange.from) > parseInt(toYear)) {
			setError(true)
		} else {
			setError(false)
			setSelectedFilter(localFilter)
			setDateRange({ from: localDateRange.from, to: toYear })
			setModalVisible(false)
		}
	}

	const resetFilters = () => {
		setLocalFilter(null)
		setLocalDateRange({ from: '', to: '' })
		setModalVisible(false)
		setSelectedFilter(null)
		setDateRange({ from: '', to: '' })
		setError(false)
	}

	return (
		<Modal
			animationType='slide'
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => setModalVisible(false)}
		>
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
							<Text className='text-white text-xl font-bold'>Year Range</Text>
							<View className='flex-row gap-3 items-center'>
								<Text className='text-white text-lg'>From</Text>
								<TextInput
									className={`h-12 w-32 bg-zinc-700 rounded-xl pl-3 text-white font-normal placeholder:text-zinc-300 ${error ? 'border-red-500 border' : ''}`}
									placeholder='Year'
									value={localDateRange.from}
									onChangeText={text => setLocalDateRange({ ...localDateRange, from: text })}
								/>
								<Text className='text-white text-lg'>To</Text>
								<TextInput
									className={`h-12 w-32 bg-zinc-700 rounded-xl pl-3 text-white font-normal placeholder:text-zinc-300 ${error ? 'border-red-500 border' : ''}`}
									placeholder='Year'
									value={localDateRange.to}
									onChangeText={text => setLocalDateRange({ ...localDateRange, to: text })}
								/>
							</View>
						</View>
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
			</TouchableWithoutFeedback>

		</Modal>
	)
}

export default FilterModal