import Map from '@components/Map'
import { MdArrowForwardIos } from 'react-icons/md'
import Image from 'next/image'
import styles from '@styles/Home.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getDomen, SetPosition } from 'app/Slices/positionSlice'
import { getData } from 'app/Slices/positionSlice'

export default function Home() {
  const x = useSelector((state) => state.pos.position.x)
  const y = useSelector((state) => state.pos.position.y)
  const domen = useSelector((state) => state.pos.domen)
  const data = useSelector((state) => state.pos.data)
  const dispatch = useDispatch()
  return (
    <div className={styles.mainDiv}>
      <div className={styles.headDiv}>
        <Image
          quality="100"
          className={styles.firstImage}
          width="300"
          height="700"
          src="/pattern-bg.png"
          alt="image"
        />
        <div className={styles.Head}>
          <h1>IP Address Checker</h1>
          <input
            onChange={(e) => {
              dispatch(getDomen(e.target.value))
            }}
            className={styles.Inputs}
            placeholder="Search for any IP address of domain"
          />
          <button
            onClick={() => {
              dispatch(getData(domen))
              dispatch(SetPosition({ x, y }))
            }}
            className={styles.Buttons}
          >
            <MdArrowForwardIos />
          </button>
        </div>
        <div>
          {data.query ? (
            <div className={styles.pointInfo}>
              <div className={styles.pointInfoBlock}>
                IP ADDRESS:
                <p>{data.query}</p>
              </div>
              <div className={styles.pointInfoBlock}>
                LOCATION:
                <p className={styles.pointBlockText}>{data.regionName}</p>
              </div>
              <div className={styles.pointInfoBlock}>
                TIMEZONE:
                <p>{data.timezone}</p>
              </div>
              <div className={styles.pointInfoBlock}>
                ISP:
                <p>{data.isp}</p>
              </div>
              <div className={styles.pointInfoBlock}>
                ZIP:
                <p>{data.zip}</p>
              </div>
            </div>
          ) : (
            ''
          )}
          <Map center={[x, y]} className={styles.Map} zoom={9}>
            {({ TileLayer, Marker, Popup }) => (
              <>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[x, y]}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </>
            )}
          </Map>
        </div>
      </div>
    </div>
  )
}
