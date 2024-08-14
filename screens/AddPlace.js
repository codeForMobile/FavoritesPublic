import PlaceForm from '../components/places/PlaceForm'
import { insertPlace } from '../utils/db'

const AddPlace = ({ navigation }) => {
  const createPlaceHandler = async (place) => {
    const result = await insertPlace(place)
    navigation.navigate('AllPlaces')
  }
  return <PlaceForm onCreatePlace={createPlaceHandler} />
}

export default AddPlace
