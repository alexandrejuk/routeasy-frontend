import React, { useState, useEffect } from 'react'
import Deliveries from './Containers/Deliveries'
import axios from 'axios'
import { pathOr } from 'ramda'

import { buildAddressSpec } from './utils/addressSpec'

const url = (
  `${process.env.REACT_APP_API_URL}/api/deliveries`
  || 'http://localhost:3003/api/deliveries'
)

const geoCodeUrl = address => (
  `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_API_KEY}&channel=88&token=4051`
)

const App = () => {
  const [data, setData] = useState([])
  const [distancia, setDis] = useState(null)
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



  const mapear = async (location) => {
   try {
    const urlMapea = `https://www.mapeia.com.br/route/v1/driving/${location}?overview=false&alternatives=true&steps=true&hints=fHaJgIl2iYAxAAAATAAAADgAAAAIAAAACsQIQqBBUEJLoxpCiy26QDEAAABMAAAAOAAAAAgAAAA6BwAA-jk3_WVLlf6IOzf9fkuV_gMADwuhzEVs;`
    const data = await axios.get(urlMapea)
    const converterKM = pathOr(0, ['data', 'routes', 0, 'distance'], data) / 1000
    setDis(converterKM.toFixed(0))
   } catch (error) {
     alert('Não foi possível calcular a distância!!!')
   }
  }


  return (
    <Deliveries
      geoCode={geoCode}
      data={data}
      mapear={mapear}
      distancia={distancia}
    />
  )
}

export default App
