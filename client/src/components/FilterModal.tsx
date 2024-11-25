import Ionicons from '@expo/vector-icons/Ionicons'
import Checkbox from 'expo-checkbox'
import React from 'react'
import {
	Modal,
	Pressable,
	SafeAreaView,
	Text,
	TextInput,
	View,
} from 'react-native'

interface ModalProps {
	modalVisible: boolean
	setModalVisible: (visible: boolean) => void
}

const FilterModal: React.FC<ModalProps> = ({
	modalVisible,
	setModalVisible,
}) => {
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
					<Pressable>
						<Text className='text-zinc-200'>Default</Text>
					</Pressable>
				</View>
				<View className='flex-col mt-5 gap-5 px-3 flex-1'>
					<View className='gap-5'>
						<Text className='text-white text-xl font-bold'>Types</Text>
						<View className='flex-row gap-2 items-center'>
							<Checkbox />
							<Text className='text-white text-lg'>TV</Text>
						</View>
						<View className='flex-row gap-2 items-center'>
							<Checkbox />
							<Text className='text-white text-lg'>Movie</Text>
						</View>
						<Text className='text-white text-xl font-bold'>Date</Text>
						<View className='flex-row gap-3 items-center'>
							<Text className='text-white text-lg'>From</Text>
							<TextInput
								className='h-12 w-32 bg-zinc-700 rounded-xl pl-3 text-white font-normal placeholder:text-zinc-300'
								placeholder='Year'
							/>
							<Text className='text-white text-lg'>To</Text>
							<TextInput
								className='h-12 w-32 bg-zinc-700 rounded-xl pl-3 text-white font-normal placeholder:text-zinc-300'
								placeholder='Year'
							/>
						</View>
					</View>
				</View>
				<Pressable className='bg-zinc-200 p-3 items-center mb-5 mx-3 rounded-xl'>
					<Text className='text-lg font-semibold'>Apply</Text>
				</Pressable>
			</SafeAreaView>
		</Modal>
	)
}

export default FilterModal
