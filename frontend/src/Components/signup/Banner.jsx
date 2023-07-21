import {Image} from 'react-bootstrap';

const Banner = ({signUpImg}) => {
  return (
    <>
        <div style={{ backgroundColor: "#F8F7FA" }} className='position-relative rounded-3' >
                <div className='d-flex align-items-center justify-content-center w-100 h-100' style={{ minHeight: '100vh' }}>
                    <div className='signup--parenet'>
                        <Image src={signUpImg} className='signup--banner' />
                    </div>
                </div>
        </div>
    </>
  )
}

export default Banner
