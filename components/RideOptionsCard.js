import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { SafeAreaView, StyleSheet, StatusBar, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { Image } from 'react-native-elements/dist/image/Image'
import { useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import { selectTravelTimeInformation } from '../slices/navSlice'
import 'intl';
import 'intl/locale-data/jsonp/en';
import uberx from "../assets/images/UberX.png"
import uberxl from "../assets/images/UberXL.png"
import uberp from "../assets/images/Lux.png"


const data = [
    {
        id: "Uber-X",
        title: "Uber",
        multiplier: 70,
        image: uberx,
    },
    {
        id: "Uber-C",
        title: "Comfort",
        multiplier: 80,
        image: uberxl,
    },
    {
        id: "Uber-P",
        title: "Premium",
        multiplier: 120,
        image: uberp,
    },
];
// For example if we have a surge pricing then the price goes up
const SURGE_CHANGE_RATE = 1.8;


const RideOptionsCard = () => {
    
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation);
    return (
        <SafeAreaView style={[tw`bg-white`, styles.container]}>
            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate("NavigateCard")}
                    style={[tw`absolute top-3 left-5 z-50 p-3 rounded-full`]}
                >
                    <Icon name="chevron-left" type="fontawesome" />
                </TouchableOpacity>
                <Text style={tw`text-xl text-center py-5`}>Select a Ride - {travelTimeInformation?.distance?.text}</Text>
            </View>

            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item: { id, title, multiplier, image }, item }) => (
                    <TouchableOpacity
                        onPress={() => setSelected(item)}
                        style={tw`flex-row px-10 justify-around items-center ${id === selected?.id && "bg-gray-200"} `}>
                        <Image
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: "contain"
                             }}
                            source={image}
                        />
                        <View style={tw`ml-6 mr-7`}>
                        <Text style={tw`text-2xl font-extrabold`}>{title}</Text>
                            <Text style={tw`text-sm text-gray-600`}>{travelTimeInformation?.duration.text} Travel time..</Text>
                        </View>
                        <Text style={tw`text-xl font-extrabold`}>

                            {new Intl.NumberFormat('en-NG',{
                                style: 'currency',
                                currency: 'NGN'
                            }).format(
                                (travelTimeInformation?.duration.value * SURGE_CHANGE_RATE * multiplier) / 100

                            )}

                        </Text>
                    </TouchableOpacity>
                )}

            />

            <View style={tw`mt-auto border-t border-gray-200`}>
                <TouchableOpacity disabled={!selected} style={tw`py-3 bg-black ${!selected && "bg-gray-300"} m-3`}>
                    <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RideOptionsCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:StatusBar.currentHeight
   }
})
