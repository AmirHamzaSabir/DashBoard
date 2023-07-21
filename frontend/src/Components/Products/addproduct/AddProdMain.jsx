import React from 'react'
import Header from './Header'
import ProductForm from './ProductForm'

const AddProdMain = () => {
  return (
    <div className='layout-content'>
        <div>
            <div className='row'>
                <Header/>
                <hr />
                <ProductForm/>
            </div>
        </div>
    </div>
  )
}

export default AddProdMain
