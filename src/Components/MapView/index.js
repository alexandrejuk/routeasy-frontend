import React from 'react'
import {
  Map,
  Popup,
  TileLayer,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Marker from 'react-leaflet-enhanced-marker'
import PropTypes from 'prop-types'

import styles from './style.module.css'

const tileUrl = "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
const initialConfig = {
  center: {
    lat: -23.531,
    lng: -46.584,
  },
  zoom: 12,
}

const MapView = ({
  deliveries,
}) => {
  const MarkerPin = index => (
    <div className={styles.marker}>
      <span className={styles.markerText}>
        {String(index + 1)}
      </span>
    </div>
  )

  const MarkerComponent = (delivery, index) => (
    <Marker
      key={index}
      icon={MarkerPin(index)}
      position={[delivery.lat, delivery.lng]}
    >
      <Popup>
        {delivery.name}<br />
        {delivery.weight} kg
      </Popup>
    </Marker>
  )

  return (
    <div className={styles.container}>
      <Map {...initialConfig}>
        <TileLayer url={tileUrl} />
        {deliveries && deliveries.map(MarkerComponent)}
      </Map>
    </div>
  )
}

MapView.propTypes = {
  deliveries: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
      weight: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
}

export default MapView
