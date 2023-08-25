import { useState } from "react"
import HashLoader from "react-spinners/ClipLoader"

const Loader = () => {
  const [loading, setLoading] = useState(true)

  return (
    <div style={{ marginTop: "150px" }}>
      <div className='sweet-loading text-center'>
        <HashLoader color='#000' loading={loading} size={80} />
      </div>
    </div>
  )
}

export default Loader
