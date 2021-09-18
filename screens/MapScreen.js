import { StackActions, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native'
import { Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'
import Map from '../components/Map'
import NavigateCard from '../components/NavigateCard'
import RideOptionsCard from '../components/RideOptionsCard'

const MapScreen = () => {
    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate("HomeScreen")}
                style={tw`absolute top-16 left-8 bg-gray-100 z-50 p-3 rounded-full shadow-lg`}>
                <Icon name="menu" />
            </TouchableOpacity>
            <View style={tw`h-2/5`}>    
                <Map />
            </View>
            <View style={tw`h-3/5`}>
                <Stack.Navigator>
                    <Stack.Screen
                        name="NavigateCard"
                        component={NavigateCard}
                        options={{
                            headerShown:false
                         }}
                    />
                    <Stack.Screen
                        name="RideOptionsCard"
                        component={RideOptionsCard}
                        options={{
                            headerShown:false
                         }}
                    />
                </Stack.Navigator>
            </View>
        </View>
    )
}

export default MapScreen

const styles = StyleSheet.create({
     container: {
        flex: 1,
        marginTop:StatusBar.currentHeight
   }
})
