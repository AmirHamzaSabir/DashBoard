import React from 'react'
import { RingLoader } from 'react-spinners'

const ContentSpinner = () => {
return (
<>
    <div style={{width:'100%',height:'100%' ,display:'flex',justifyContent:'center',alignItems:'center'}}>
    <RingLoader color="#36d7b7" />
    </div>
</>
)
}

export default ContentSpinner