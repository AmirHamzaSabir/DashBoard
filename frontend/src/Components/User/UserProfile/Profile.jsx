import React from 'react'

const Profile = () => {
    const url = process.env.REACT_APP_BASE_URL;
    return (
        <div className='col-12'>
            <div className='card p-24'>
                <div className='row'>
                    <div className='col-12'>
                        <h5 className='color-78'>John Doe</h5>
                    </div>
                    <div className='col-12 my-2'>
                        <div className='profile-img'>
                            <img src={`${url}/static/media/avatar.ead651e178d810a8d0f1.png`} alt="" />
                        </div>
                    </div>
                    <div className='col-12 mt-1 mb-3'>
                        <div className='role'>
                            <h6>Admin</h6>
                        </div>
                    </div>
                    <hr />
                    <div className='col-12 my-1'>
                        <h6 className='color-78'>DETAILS</h6>
                    </div>
                    <div className='col-12 my-2'>
                        <h6 style={{ fontWeight: "700", display: "inline-block" }} className='color-78'>Username:</h6>
                        <span className='ms-2 color-68'>John Doe</span>
                    </div>
                    <div className='col-12 my-2'>
                        <h6 style={{ fontWeight: "700", display: "inline-block" }} className='color-78'>Email:</h6>
                        <span className='ms-2 color-68'>JohnDoe@gmail.com</span>
                    </div>
                    <div className='col-12 my-2'>
                        <h6 style={{ fontWeight: "700", display: "inline-block" }} className='color-78'>Role:</h6>
                        <span className='ms-2 color-68'>Admin</span>
                    </div>
                    <div className='col-12 my-2'>
                        <h6 style={{ fontWeight: "700", display: "inline-block" }} className='color-78'>Address:</h6>
                        <span className='ms-2 color-68'>Xyz New York City</span>
                    </div>
                    <div className='col-12 my-2'>
                        <h6 style={{ fontWeight: "700", display: "inline-block" }} className='color-78'>Phone Number:</h6>
                        <span className='ms-2 color-68'>134567952</span>
                    </div>
                    <div className='col-12 my-2'>
                        <h6 style={{ fontWeight: "700", display: "inline-block" }} className='color-78'>Language:</h6>
                        <span className='ms-2 color-68'>English</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
