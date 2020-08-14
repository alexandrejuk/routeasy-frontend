import React, { useState, useEffect } from 'react'
import Deliveries from './Containers/Deliveries'
import axios from 'axios'

import { buildAddressSpec } from './utils/addressSpec'

const url = (
  process.env.REACT_APP_API_URL
  || 'http://localhost:3003/api/deliveries'
)

const geoCodeUrl = address => (
  `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_API_KEY}&channel=88&token=4051`
)

const App = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(url)
        setData(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetch()
  }, [])

  const geoCode = async (address) => {
    const { data: { results } } = await axios.get(geoCodeUrl(address))
    return buildAddressSpec(results[0])
  }

  const getDeliveries = async () => {
    try {
      const { data } = await axios.get(url)
      setData(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteDelivery = async id => {
    try {
      await axios.delete(`${url}/${id}`)
      getDeliveries()
    } catch (error) {
      console.log('error ao deletar')
    }
  }

  const actionTable = {
    control: row => handleDeleteDelivery(row._id),
    field: 'Remove',
    label: 'Remove',
  }

  const handleSubmit = async formData => {
    try {
      await axios.post(url, formData)
      getDeliveries()
      return true
    } catch (error) {
      console.log('error ao cadastrar')
    }
  }

  return (
    <Deliveries
      geoCode={geoCode}
      onSubmit={handleSubmit}
      actionTable={actionTable}
      data={data}
    />
  )
}

export default App
