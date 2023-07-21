const Header = ({order}) => {
  return (
    <div className='d-flex align-items-center flex-wrap gap-4 p-3'>
            <div className='d-flex justify-content-between align-items-center w-100'>
                <div>
                    <h2>Orders ({order})</h2>
                </div>
            </div>
        </div>
  )
}

export default Header
