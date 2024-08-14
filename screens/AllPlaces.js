import { useEffect, useState } from 'react'
import PlacesList from '../components/places/PlacesList'
import { useIsFocused } from '@react-navigation/native'
import { fetchPlaces } from '../utils/db'

const AllPlaces = ({ route }) => {
  const [loadedPlaces, setLoadedPlaces] = useState([])
  const isFocused = useIsFocused()

  useEffect(() => {
    const loadPlaces = async () => {
      const result = await fetchPlaces()
      console.log('fetched places...', result)
      setLoadedPlaces(result)
    }

    if (isFocused) {
      loadPlaces()
    }
  }, [isFocused])

  return <PlacesList places={loadedPlaces} />
}

export default AllPlaces
