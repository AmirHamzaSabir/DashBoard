const Hamburger = ({setShowBar,showBar}) => {
    return (
        <>
            <button className='d-flex align-items-center justify-content-center show-sidebar-btn' onClick={() => setShowBar(!showBar)}>
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" tag="i" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </>
    )
}

export default Hamburger
