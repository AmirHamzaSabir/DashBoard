import React from 'react'

const Timeline = () => {
    return (
        <div className='timeline'>
            <div className='timeline-item'>
                <div class="timeline-item-body">
                    <p class="text-sm text-success mb-0">SENDER</p>
                    <p class="app-timeline-title mb-0">Myrtle Ullrich</p>
                    <p class="text-disabled mb-0">101 Boulder, California(CA), 95959</p>
                </div>
                <div className='timeline-divider'>
                    <div className='divider-inner'>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" tag="i" width="1em" height="1em" viewBox="0 0 24 24">
                            <g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0"></path><path d="m9 12l2 2l4-4"></path>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>

            <div className='timeline-item'>
                <div class="timeline-item-body">
                    <p class="text-sm font-weight-medium text-second mb-0">RECEIVER</p>
                    <p class="app-timeline-title mb-0">Myrtle Ullrich</p>
                    <p class="text-disabled mb-0">101 Boulder, California(CA), 95959</p>
                </div>
                <div className='timeline-divider'>
                    <div className='divider-inner loc'>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" tag="i" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                            <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0-6 0"></path>
                            <path d="M17.657 16.657L13.414 20.9a2 2 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z"></path></g>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Timeline
