import React from 'react'
import { StyleSheet, Text, Image, View, StatusBar, SafeAreaView } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { setDestination, setOrigin } from '../slices/navSlice';
import { useDispatch } from 'react-redux';
import NavFavorites from '../components/NavFavorites';


const HomeScreen = () => {
    const dispatch = useDispatch();

    return (
        <SafeAreaView style={[tw`bg-white h-full`,styles.container]}>
            <View style={tw`p-5`}>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'contain',
                     }}
                    source={require('../assets/images/Uber_logo.png')}
                />
                <GooglePlacesAutocomplete
                    placeholder="Where From?"
                    listViewDisplayed={false}
                    styles={toInputBoxStyles}
                  onPress={(data, details = null) => {
                      dispatch(
                          setOrigin({
                          location: details.geometry.location,
                          description: data.description,
                          })
                      );
                      dispatch(setDestination(null))
      }}
      query={{
        key: GOOGLE_MAPS_APIKEY,
        language: 'en',
      }}
                    fetchDetails={true}
                    enablePoweredByContainer={false}
                    minLength={2}
                    nearbyPlacesAPI="GooglePlacesSearch"
                />
                <NavOptions />
                <NavFavorites />
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:StatusBar.currentHeight
   }
});
const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0
    },
    textInput: {
        backgroundColor: "#F3F2F2",
        borderRadius: 15,
        fontSize: 18
    },
    textInputContainer: {
        paddingHorizontal: 10,
        paddingBottom: 0,
    }
});

