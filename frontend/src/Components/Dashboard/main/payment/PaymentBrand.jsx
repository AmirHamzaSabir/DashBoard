
const PaymentBrand = ({img,name,val,brandName}) => {
  return (
    <div className="payment--brand">
        <div className="d-flex flex-row align-items-center">
            <div className="brand--img--container">
                <div className="brand--inner-img">
                    <img src={`${img}`}/>
                </div>
            </div>
            <div className="ms-3">
                <h6>{name}</h6>
                <h6 className="outline--txt">{brandName}</h6>
            </div>
        </div>
        <h6 className="earn--val">+PKR {val}</h6>
    </div>
  )
}

export default PaymentBrand
