import React, {useState } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { formattedAddress } from '../../utils/addressSpec'
import styles from './style.module.css'
import {
  Button,
  Input,
} from '../../Components'

const initialState = {
  address: '',
  lat: '',
  lng: '',
  name: '',
  weight: '',
}

const Deliveries = ({
  geoCode,
  mapear,
  distancia, 
}) => {
  const [formData, setFormData] = useState(initialState)
  const [formData2, setFormData2] = useState(initialState)

  const [geoData, setGeoData] = useState({})
  const [geoData2, setGeoData2] = useState({})

  const {
    address,
  } = formData

  const {
    address2,
  } = formData2

  const handleChange = ({ target }) => {
    const { name, value } = target
    setFormData({...formData, [name]: value })
  }

  const handleChange2 = ({ target }) => {
    const { name, value } = target
    setFormData2({...formData2, [name]: value })
  }

  const geoLocation = async (type) => {
    if (type === 'initial') {
      const addressGeocode = await geoCode(address)
      setFormData({
        ...formData,
        address: formattedAddress(addressGeocode),
      })
      setGeoData(addressGeocode)
    } else {
      const addressGeocode2 = await geoCode(address2)
      setFormData2({
        ...formData,
        address2: formattedAddress(addressGeocode2),
      })
      setGeoData2(addressGeocode2)
    }
  }

  return (
    <div className={styles.container}>
     <div className={styles.sideBar}>
      <div className={styles.form}>
          <div className={styles.formGroup}>
            <Input
              name='address'
              id='endereco_inicial'
              onChange={handleChange}
              placeholder="Ponto inicial"
              type="text"
              value={address}
            />
          </div>
          
          <div className={styles.formGroup}>
            <button id='btn_inicial' onClick={() => geoLocation('initial')}>BUSCAR PRIMEIRO ENDEREÇO</button>
          </div>

          <div className={styles.formGroup}>
            <Input
              id='endereco_final'
              name='address2'
              onChange={handleChange2}
              placeholder="Ponto final"
              type="text"
              value={address2}
            />
          </div>
          
          <div className={styles.formGroup}>
            <button id='btn_final' onClick={() => geoLocation('final')}>BUSCAR SEGUNDO ENDEREÇO</button>
          </div>

        </div>
        <div className={classNames(styles.form, styles.spacing)}>
          <Button
            id='btn_calc_km'
            onClick={() => mapear(`${geoData.lng},${geoData.lat};${geoData2.lng},${geoData2.lat}`)}
            type="danger"
          >
            Mapea distância
          </Button>
        </div>
     </div>
     <div style={{ padding: '20px' }}>
       <h3>A distância de {address} até {address2} é de: <span id='distancia'>{distancia}</span> {distancia ? 'km': null}</h3>
     </div>
    </div>
  )
}

Deliveries.propTypes = {
  geoCode: PropTypes.func.isRequired,
  mapear: PropTypes.func.isRequired
}

export default Deliveries
