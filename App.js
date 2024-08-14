import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AllPlaces from './screens/AllPlaces'
import AddPlace from './screens/AddPlace'
import IconButton from './components/ui/IconButton'
import { Colors } from './constants/colors'
import Map from './screens/Map'
import { useEffect, useState, useCallback } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import { init } from './utils/db'
import PlaceDetails from './screens/PlaceDetails'

const Stack = createNativeStackNavigator()

export default function App() {
  const [dbInitialize, setDbInitialize] = useState(false)

  useEffect(() => {
    const prepare = async () => {
      try {
        await SplashScreen.preventAutoHideAsync()
        init()
      } catch (e) {
        console.warn(e)
      } finally {
        setDbInitialize(true)
      }
    }
    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (dbInitialize) {
      await SplashScreen.hideAsync()
    }
  }, [dbInitialize])

  if (!dbInitialize) return null

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer onReady={onLayoutRootView}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary500,
            },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: 'Your Favorite Places',
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  color={tintColor}
                  size={24}
                  onPress={() => navigation.navigate('AddPlace')}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: 'Add A New Place',
            }}
          />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen
            name="PlaceDetails"
            component={PlaceDetails}
            options={{
              title: 'Loading place...',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}
