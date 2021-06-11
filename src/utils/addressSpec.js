import {
  applySpec,
  contains,
  map,
  mergeAll,
  mergeDeepRight,
  pipe,
  prop,
} from 'ramda'

const getField = value => data => {
  const longName = prop('long_name', data)
  const types = prop('types', data)
  return contains(value, types) && longName
}

const buildAddress = applySpec({
  street: getField('route'),
  streetNumber: getField('street_number'),
  neighborhood: getField('sublocality_level_1'),
  city: getField('administrative_area_level_2'),
  state: getField('administrative_area_level_1'),
  zipcode: getField('postal_code'),
  country: getField('country'),
})

const removeFieldsFalse = values => {
  let value = null
  for(let key in values) {
    if (values[key]) {
      value = { [key]: values[key] }
    }
  }
  return value
}

const addressSpec = pipe(
  prop('address_components'),
  map(buildAddress),
  map(removeFieldsFalse),
  mergeAll
)

const builLocation = applySpec({
  lat: prop('lat'),
  lng: prop('lng'),
})

const locationSpec = pipe(
  prop('geometry'),
  prop('location'),
  builLocation,
)

const buildAddressSpec = address => mergeDeepRight(
  addressSpec(address),
  locationSpec(address),
)

const formattedAddress = ({
  city = '',
  state = '',
  zipcode = '',
  country = '',
}) => {
  return `${city} / ${state}, ${zipcode} - ${country}`
}

export {
  buildAddressSpec,
  formattedAddress,
}
