import { Pressable, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const IconButton = ({ icon, size, color, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Ionicons size={size} color={color} name={icon} />
    </Pressable>
  )
}

export default IconButton

const styles = StyleSheet.create({
  button: {
    padding: 8,
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
})
