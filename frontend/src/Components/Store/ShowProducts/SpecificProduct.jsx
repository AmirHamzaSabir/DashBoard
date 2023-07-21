import { useParams} from 'react-router'
import products from '../products.json'
const SpecificProduct = () => {
    const {id} = useParams()
  return (
    <div className='layout-content'>
        <div>
            <div className='row'>
                <div className='col-12 '>
                    <div className='card '>
                        {products.filter((val) => {
                            return val.productId == id
                        }).map((val) => (
                                <div className='row p-24'>
                                    <div className='col-12 col-md-6 col-lg-6' style={{width:'50%',height:"50%"}}>
                                        <img src={val.img} className='w-100 h-100'  style={{objectFit:"contain"}} />
                                    </div>
                                    <div className='col-12 col-md-6 col-lg-6 d-flex flex-column justify-content-between'>
                                        <div>
                                            <p className='fs-2'>{val.name}</p>
                                            <p className='fs-5'>{val.description}</p>
                                            <p className='fs-5'>{val.category}</p>
                                            <p className='fs-3'>PKR {val.cost}</p>
                                        </div>
                                        <div className='mb-3'>
                                            <button className='btn btn-dark me-3' style={{inlineSize:"20%"}}>Buy</button>
                                            <button className='btn btn-dark' style={{inlineSize:"20%"}}>Cart</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SpecificProduct
