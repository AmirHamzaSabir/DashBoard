import './btns.css'
const BtnSection = () => {
  return (
    <div className='col-md-3 col-12 mb-4'>
        <div className='card'>
            <div className='p-24'>
                <button type='button' className='invoice-btn primary--btn'>
                    <span className='me-2 send '>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" tag="i" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 14L21 3m0 0l-6.5 18a.55.55 0 0 1-1 0L10 14l-7-3.5a.55.55 0 0 1 0-1L21 3">
                            </path>
                        </svg>
                    </span>
                    <span className='text-white'>Send Invoice</span>
                </button>

                <button type='button' className='invoice-btn gray--btn'>
                    <span className='color-78'>Preview</span>
                </button>

                <button type='button' className='invoice-btn gray--btn'>
                    <span className='color-78'>Save</span>
                </button>
            </div>
        </div>
    </div>
  )
}

export default BtnSection
