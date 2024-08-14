import { View, StyleSheet, Alert, Image, Text } from 'react-native'
import { useEffect, useState } from 'react'
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native'
import OutlinedButton from '../ui/OutlinedButton'
import { Colors } from '../../constants/colors'
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from 'expo-location'
import { getAddress, getMapPreview } from '../../utils/location'

const LocationPicker = ({ onPickLocation }) => {
  const [pickedLocation, setPickedLocation] = useState()
  const navigation = useNavigation()
  const route = useRoute()
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      }
      setPickedLocation(mapPickedLocation)
    }
  }, [route, isFocused])

  useEffect(() => {
    const handleLocation = async () => {
      if (pickedLocation) {
        const address = await getAddress(pickedLocation.lat, pickedLocation.lng)
        onPickLocation({ ...pickedLocation, address: address })
      }
    }
    handleLocation()
  }, [pickedLocation, onPickLocation])

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions()

  const verifyPermissions = async () => {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED ||
      locationPermissionInformation.status !== permissionResponse.granted
    ) {
      const permissionResponse = await requestPermission()
      console.log('permissionResponse..', permissionResponse)
      return permissionResponse.granted
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert('Location permission missing', 'App needs Permissions')
      return false
    }

    return true
  }

  const getLocationHandler = async () => {
    const hasLocationPermission = await verifyPermissions()
    if (!hasLocationPermission) {
      return
    }
    const userLocation = await getCurrentPositionAsync({ accuracy: 6 })
    setPickedLocation({
      lat: userLocation.coords.latitude,
      lng: userLocation.coords.longitude,
    })
  }

  const pickOnMapHandler = () => {
    navigation.navigate('Map')
  }

  let locationPreview = <Text>No location picked</Text>

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
        }}
      />
    )
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  )
}

export default LocationPicker

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
})
