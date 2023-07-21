import React from 'react'

const Nav = () => {
  return (
    <div className='sales-by-order-table'>
        <div className='sales-by-order-container'>
            <div className='sales-by-order-content'>
                <button type='button' className='sales-by-order-btn'>
                    <span>New</span>
                </button>
                <button type='button' className='sales-by-order-btn'>
                    <span>Preparing</span>
                </button>
                <button type='button' className='sales-by-order-btn'>
                    <span>Shipping</span>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Nav
