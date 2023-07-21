import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({stock}) => {
    return (
        <div className='d-flex align-items-center flex-wrap gap-4 p-3'>
            <div className='d-flex justify-content-between align-items-center w-100'>
                <div>
                    <h2>Products ({stock})</h2>
                </div>
                <div>
                <Link to='/user/addproduct' className='create-invoice-btn' style={{ cursor: "pointer" }}>
                    <span className='btn-prepend'>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" tag="i" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 5v14m-7-7h14"></path>
                        </svg>
                    </span>
                    <span className='btn-content'>Add New</span>
                </Link>
                </div>
            </div>
        </div>
    )
}

export default Header
