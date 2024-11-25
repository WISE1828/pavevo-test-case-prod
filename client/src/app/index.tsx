import React from 'react'
import { SafeAreaView } from 'react-native'
import Header from '../components/Header'

const HomeScreen = () => {
	return (
		<>
			<Header />
			<SafeAreaView className='bg-zinc-800 flex-1'></SafeAreaView>
		</>
	)
}

export default HomeScreen
