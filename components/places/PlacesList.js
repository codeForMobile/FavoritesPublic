import { FlatList, View, Text, StyleSheet } from 'react-native'
import PlaceItem from './PlaceItem'
import { Colors } from '../../constants/colors'
import { useNavigation } from '@react-navigation/native'

const PlacesList = ({ places }) => {
  const navigation = useNavigation()

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No places yet</Text>
      </View>
    )
  }
  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem
          place={item}
          onSelect={(id) => {
            navigation.navigate('PlaceDetails', {
              placeId: id,
            })
          }}
        />
      )}
    />
  )
}

export default PlacesList

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
})
