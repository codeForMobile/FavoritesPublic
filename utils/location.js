import { GOOGLE_API_KEY } from '@env'

const key = GOOGLE_API_KEY

export const getMapPreview = (lat, lng) => {
  const url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${key}`
  return url
}

export const getAddress = async (lat, lng) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Failed to fetch address')
  }

  const data = await res.json()
  const address = data.results[0].formatted_address
  return address
}
