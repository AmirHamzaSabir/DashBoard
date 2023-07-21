import SpecificNotification from "./SpecificNotification"

const Notification = () => {
  return (
    <div className="overlay-content" style={{right:"88px",width:"380px"}}>
        <div className="overlay-list" style={{overflow:"hidden"}}>
            <div className="notification-header">
                <div className="header-content">
                    <div class="v-card-title text-lg"> Notifications </div>
                </div>
                <div className="header-append">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" tag="i" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                        <path d="m3 9l9 6l9-6l-9-6l-9 6"></path><path d="M21 9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9m0 10l6-6m6 0l6 6"></path></g></svg>
                </div>
            </div>
            <hr style={{margin:"0"}}/>
            <SpecificNotification/>
        </div>
    </div>
  )
}

export default Notification
