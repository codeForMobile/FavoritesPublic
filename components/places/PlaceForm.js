import { useCallback, useState } from 'react'
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native'
import { Colors } from '../../constants/colors'
import ImagePicker from './ImagePicker'
import LocationPicker from './LocationPicker'
import Button from '../ui/Button'
import { Place } from '../../models/place'

const PlaceForm = ({ onCreatePlace }) => {
  const [etneredTitle, setEtneredTitle] = useState('')
  const [pickedLocation, setPickedLocation] = useState()
  const [selectImage, setSelectImage] = useState()

  const changeTitleHandler = (etneredTitle) => {
    setEtneredTitle(etneredTitle)
  }

  const saveHandler = () => {
    const placeData = new Place(etneredTitle, selectImage, pickedLocation)
    onCreatePlace(placeData)
  }

  const takeImageHandler = (imageUri) => {
    setSelectImage(imageUri)
  }

  const pickLocationHander = useCallback((location) => {
    setPickedLocation(location)
  }, [])

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          onChangeText={changeTitleHandler}
          value={etneredTitle}
          style={styles.input}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHander} />
      <Button onPress={saveHandler}>Add Place</Button>
    </ScrollView>
  )
}

export default PlaceForm

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
})
