import React, {useState } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { isEmpty, omit, mergeDeepRight } from 'ramda'

import { formattedAddress } from '../../utils/addressSpec'
import styles from './style.module.css'
import {
  Button,
  Input,
  MapView,
  Table,
} from '../../Components'

const initialState = {
  address: '',
  lat: '',
  lng: '',
  name: '',
  weight: '',
}

const Deliveries = ({
  actionTable,
  data,
  geoCode,
  onSubmit,
}) => {
  const [formData, setFormData] = useState(initialState)
  const [geoData, setGeoData] = useState({
    lat: -23.531,
    lng: -46.584,
  })
  const [formErrors, setFormErrors] = useState({})
  const {
    address,
    lat,
    lng,
    name,
    weight,
  } = formData

  const totalWeight = data.reduce(
    (acc, prev) => acc + Number(prev.weight), 0
  )

  const handleChange = ({ target }) => {
    const { name, value } = target
    setFormData({...formData, [name]: value })
  }

  const resetAllState = () => {
    setFormData(initialState)
    setFormErrors({})
    setGeoData({
      lat: -23.531,
      lng: -46.584,
    })
  }

  const handleSubmit = async () => {
    const messageError = 'Campo Obrigatório'
    const errors = {}

    if (isEmpty(name)) {
      errors.name = messageError
    }

    if (isEmpty(address)) {
      errors.address = messageError
    }

    if (isEmpty(weight)) {
      errors.weight = messageError
    }

    if (isEmpty(lat)) {
      errors.lat = messageError
    }

    setFormErrors(errors)

    const createDelivery =  isEmpty(errors) && await onSubmit(
      mergeDeepRight(omit(['address'], formData), geoData)
    )
    return createDelivery && resetAllState()
  }

  const handleReset = () => setFormData(initialState)

  const geoLocation = async () => {
    if(isEmpty(address)) return
    const addressGeocode = await geoCode(address)
    setFormData({
      ...formData,
      address: formattedAddress(addressGeocode),
      lat: addressGeocode.lat,
      lng: addressGeocode.lng,
    })
    setGeoData(addressGeocode)
  }
  return (
    <div className={styles.container}>
     <div className={styles.sideBar}>
      <div className={styles.form}>
          <div className={styles.formGroup}>
            <Input
              error={formErrors && formErrors.name}
              name='name'
              onChange={handleChange}
              placeholder="Nome Cliente"
              type="text"
              value={name}
            />
            <small className={styles.error}>
              {formErrors && formErrors.name}
            </small>
          </div>
          <div className={styles.formGroup}>
            <Input
              error={formErrors && formErrors.weight}
              name='weight'
              onChange={handleChange}
              placeholder="Peso da Entrega"
              type="number"
              value={weight}
            />
            <small className={styles.error}>
              {formErrors && formErrors.weight}
            </small>
          </div>
          <div className={styles.formGroup}>
            <Input
              error={formErrors && formErrors.address}
              name='address'
              onChange={handleChange}
              placeholder="Endereço Cliente"
              type="text"
              value={address}
            />
            <small className={styles.error}>
              {formErrors && formErrors.address}
            </small>
          </div>
          <div className={styles.formGroup}>
            <button onClick={geoLocation}>BUSCAR</button>
          </div>
          <div className={styles.geometry}>
            <Input
              error={formErrors && formErrors.lat}
              disable
              name='lat'
              onChange={handleChange}
              placeholder="Latitude"
              type="number"
              value={lat}
            />
            <Input
              error={formErrors && formErrors.lat}
              disable
              name='lng'
              onChange={handleChange}
              placeholder="Longitude"
              type="number"
              value={lng}
            />
            <small className={styles.error}>
              {formErrors && formErrors.lat}
            </small>
          </div>
          <Button
            onClick={handleSubmit}
            type="primary"
          >
            CADASTRAR CLIENTE
          </Button>
        </div>
        <div className={classNames(styles.form, styles.spacing)}>
          <Button
            onClick={handleReset}
            type="danger"
          >
            RESETAR CADASTRO
          </Button>
        </div>
     </div>
      <div className={styles.content}>
        <MapView deliveries={data} mapConfig={{
            center: {
              lat: geoData.lat,
              lng: geoData.lng,
            },
            zoom: 12,
          }}/>
        <h4>Total de Clientes {data.length}; Peso Total: {totalWeight} kg; Ticket Médio*: 0</h4>
        <Table
          actionTable={actionTable}
          data={data}
        />
        <h4>*Peso Total/Total de Clientes</h4>
      </div>
    </div>
  )
}

Deliveries.propTypes = {
  actionTable: PropTypes.shape({
    control: PropTypes.func,
    field: PropTypes.string,
    label: PropTypes.string,
  }).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({}).isRequired,
  ).isRequired,
  geoCode: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default Deliveries
