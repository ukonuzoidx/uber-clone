import React from 'react'
import { TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'

const data = [
    {
        id: "1",
        icon: "home",
        location: "Home",
        destination: "Momoh Sami Street",
    },
    {
        id: "2",
        icon: "briefcase",
        location: "Work",
        destination: "University of Abuja",
    },
]


const NavFavorites = () => {
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => (
                <View style={[tw`bg-gray-200`, {height: 0.5}]} />
            )}
            renderItem={({ item: { location, destination, icon } }) => (
                <TouchableOpacity style={tw`flex-row items-center p-5`}>
                    <Icon
                        style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                        name={icon}
                        type="ionicon"
                        color="white"
                        size={18}
                    />

                    <View>
                        <Text style={tw`font-bold`}>{location}</Text>
                        <Text style={tw`text-gray-500`}>{destination}</Text>
                    </View>
                        
                </TouchableOpacity>
            )}
        />
    )
}

export default NavFavorites

const styles = StyleSheet.create({})
