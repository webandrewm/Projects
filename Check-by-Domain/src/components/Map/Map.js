import dynamic from 'next/dynamic'
import { useSelector } from 'react-redux'
const DynamicMap = dynamic(() => import('./DynamicMap'), {
  ssr: false,
})

const DEFAULT_WIDTH = 600
const DEFAULT_HEIGHT = 600

const Map = (props) => {
  const x = useSelector((state) => state.pos.position.x)
  const y = useSelector((state) => state.pos.position.y)
  const { width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT } = props
  return (
    <div style={{ aspectRatio: width / height }}>
      <DynamicMap {...props} />
    </div>
  )
}

export default Map
