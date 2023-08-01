import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import avatar from '../../../../images/avatar.png'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, reset } from '../../../../features/auth/authSlice';

const ProfileView = () => {
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    const { user,isSuccess } = useSelector(state => state.auth);
    useEffect(() => {
        dispatch(reset())
    }, [user, navigate,isSuccess, dispatch]);
    const handleLogout = () => {
        dispatch(logout());
    }
    return (
        <div className="overlay-content">
            <div className="overlay-list">
                <div className="item-content">
                    <div className="item__prepend">
                        <img src={avatar} alt="" />
                    </div>
                    <div class="item__content" data-no-activator="">
                        <div className='color-78' style={{ fontSize: ".9375rem", fontWeight: "500" }}>John Doe</div>
                        <div class="color-68" style={{ fontSize: '.8125rem', fontWeight: "400" }}>admin</div>
                    </div>
                </div>
                <div style={{ overflow: "hidden !important", overflowAnchor: "none" }}>
                    <hr style={{marginBottom:"0"}}/>
                    <Link to='/user/profile' className='items'>
                        <div className='items-childOne'>
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" tag="i" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path>
                            </svg>
                        </div>
                        <div className='items-childTwo'>
                            <div className='color-78' style={{ fontSize: "1.1rem", fontWeight: "400" }}>Profile</div>
                        </div>
                    </Link>
                    <Link to='/user/settings' className='items'>
                        <div className='items-childOne'>
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" tag="i" width="1em" height="1em" viewBox="0 0 24 24">
                                <g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37c1 .608 2.296.07 2.572-1.065z"></path><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0-6 0"></path></g></svg>
                        </div>
                        <div className='items-childTwo'>
                            <div className='color-78' style={{ fontSize: "1.1rem", fontWeight: "400" }}>Settings</div>
                        </div>
                    </Link>
                    <hr style={{margin:0}}/>
                    <a href="" className='items'>
                        <div className='items-childOne'>
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" tag="i" width="1em" height="1em" viewBox="0 0 24 24">
                                <g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                                    <path d="M14 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2"></path><path d="M7 12h14l-3-3m0 6l3-3"></path>
                                </g>
                            </svg>
                        </div>
                        <div className='items-childTwo'>
                            <div onClick={handleLogout} className='color-78' style={{ fontSize: "1.1rem", fontWeight: "400" }}>Logout</div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default ProfileView
