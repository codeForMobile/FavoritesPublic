import { Alert, View, Image, StyleSheet, Text } from 'react-native'
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from 'expo-image-picker'
import { useState } from 'react'
import { Colors } from '../../constants/colors'
import OutlinedButton from '../ui/OutlinedButton'

const ImagePicker = ({ onTakeImage }) => {
  const [pickedImage, setPickedImage] = useState()
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions()

  const verifyPermission = async () => {
    if (
      cameraPermissionInformation.status === PermissionStatus.UNDETERMINED ||
      cameraPermissionInformation.status !== PermissionStatus.GRANTED
    ) {
      const permissionResponse = await requestPermission()
      return permissionResponse.granted
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert('Missing permissions', 'App needs Camera Permissions')
      return false
    }

    return true
  }

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermission()
    if (!hasPermission) {
      return
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    })
    setPickedImage(image.assets[0].uri)
    onTakeImage(image.assets[0].uri)
  }

  let imgaePreview = <Text>No Image has been taken</Text>

  if (pickedImage) {
    imgaePreview = (
      <Image source={{ uri: pickedImage }} style={styles.imageStyle} />
    )
  }

  return (
    <View>
      <View style={styles.imagePreviewStyle}>{imgaePreview}</View>
      <OutlinedButton onPress={takeImageHandler} icon="camera">
        Take Image
      </OutlinedButton>
    </View>
  )
}

export default ImagePicker

const styles = StyleSheet.create({
  imagePreviewStyle: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 8,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
})
