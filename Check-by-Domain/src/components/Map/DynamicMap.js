import { useEffect } from 'react'
import Leaflet from 'leaflet'
import * as ReactLeaflet from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import styles from './Map.module.scss'
import { useSelector } from 'react-redux'
import { useMap } from 'react-leaflet'
const { MapContainer } = ReactLeaflet

const Map = ({ children, className, width, height, ...rest }) => {
  let x = useSelector((state) => state.pos.position.x)
  let y = useSelector((state) => state.pos.position.y)
  let mapClassName = styles.map
  if (className) {
    mapClassName = `${mapClassName} ${className}`
  }

  useEffect(() => {
    ;(async function init() {
      delete Leaflet.Icon.Default.prototype._getIconUrl
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
        iconUrl: 'leaflet/images/marker-icon.png',
        shadowUrl: 'leaflet/images/marker-shadow.png',
      })
    })()
  }, [])
  const Recenter = (props) => {
    const map = useMap()
    useEffect(() => {
      map.setView([props.lat, props.lng])
    }, [x, y])
    return null
  }
  return (
    <MapContainer className={mapClassName} {...rest}>
      <Recenter lat={x} lng={y} />
      {children(ReactLeaflet, Leaflet)}
    </MapContainer>
  )
}

export default Map
