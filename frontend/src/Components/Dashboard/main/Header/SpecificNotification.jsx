import notification from './notificationData.json'
const SpecificNotification = () => {
  return (
    <>
    {notification.map((data) => (
        <div  style={{maxBlockSize: "23.75rem"}}>
            <div className="notification-content">
                <div className="notification-prepend">
                    <img src={data.img} alt="" />
                </div>
                <div className="notification-items">
                    <div className="color-78" style={{fontSize:".975rem"}}>{data.message1}</div>
                    <div className="color-78" style={{fontSize:".8125rem"}}>{data.message2}</div>
                    <span className="color-68" style={{fontSize:".675rem"}}>{data.time}</span>
                </div>
            </div>
        </div>
    ))}
    </>
  )
}

export default SpecificNotification
