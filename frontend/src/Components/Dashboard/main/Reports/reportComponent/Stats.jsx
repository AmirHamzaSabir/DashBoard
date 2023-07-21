import React from 'react'
const Stats = () => {
  return (
    <div className='col-sm-12 col-md-7 col-lg-12 mb-4'>
        <div className='card h-100'>
            <div className='card-item'>
                <div className='card-item-content'>
                    <div class="card-title">Statistics</div>
                </div>
                <div className='card-item-append'>
                    <span class="text-sm text-disabled">Updated 1 month ago</span>
                </div>
            </div>
            <div className='second-card'>
                <div className='row'>
                    <div className='col-md-3 col-6'>
                        <div className='d-flex align-items-center gap-4'>
                            <div className='avatar purple'>
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" tag="i" width="1em" height="1em" viewBox="0 0 24 24">
                                    <g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                                        <path d="M12 3v9h9"></path><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0"></path></g>
                                </svg>
                            </div>
                            <div className='d-flex flex-column'>
                                <span class="text-h5">230k</span>
                                <span class="text-sm">Sales</span>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-3 col-6'>
                        <div className='d-flex align-items-center gap-4'>
                            <div className='avatar info'>
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" tag="i" width="1em" height="1em" viewBox="0 0 24 24">
                                    <path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0-8 0M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2m1-17.87a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.85">
                                    </path>
                                </svg>
                            </div>
                            <div className='d-flex flex-column'>
                                <span class="text-h5">8.549k</span>
                                <span class="text-sm">Customers</span>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-3 col-6'>
                        <div className='d-flex align-items-center gap-4'>
                            <div className='avatar error'>
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" tag="i" width="1em" height="1em" viewBox="0 0 24 24">
                                    <g fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                                    <path d="M4 19a2 2 0 1 0 4 0a2 2 0 1 0-4 0m11 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0"></path><path d="M17 17H6V3H4"></path><path d="m6 5l14 1l-1 7H6"></path></g>
                                </svg>
                            </div>
                            <div className='d-flex flex-column'>
                                <span class="text-h5">1.423k</span>
                                <span class="text-sm">Products</span>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-3 col-6'>
                        <div className='d-flex align-items-center gap-4'>
                            <div className='avatar success'>
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" tag="i" width="1em" height="1em" viewBox="0 0 24 24">
                                    <path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.7 8A3 3 0 0 0 14 6h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1-2.7-2M12 3v3m0 12v3"></path>
                                </svg>
                            </div>
                            <div className='d-flex flex-column'>
                                <span class="text-h5">$9745</span>
                                <span class="text-sm">Revenue</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Stats
