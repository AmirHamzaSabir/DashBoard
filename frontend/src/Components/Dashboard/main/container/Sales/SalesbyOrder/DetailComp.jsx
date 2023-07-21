import React from 'react'
import Timeline from './Timeline'

const DetailComp = () => {
  return (
    <div style={{padding:"24px"}}>
        <div>
            <div className='detail-container'>
                <div>
                    <Timeline/>
                    <hr/>
                    <Timeline/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DetailComp
