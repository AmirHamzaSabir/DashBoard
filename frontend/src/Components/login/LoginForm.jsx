import { useEffect, useState } from 'react';
import {Form, Stack,Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser,reset } from '../../features/auth/authSlice';
import Spinner from '../Spinner/Spinner';
import wire from '../../images/wire.png';
import { FacebookIcon, GooglePlusIcon, TwitterIcon } from './SocialMediaIcons';
const LoginForm = ({heading,title}) => {
    // initialze the state values for the form
    const [formFields, setFormFields] = useState({
        email:'',password:''
    });
    // destructure the form fields
    const { email, password } = formFields;
    // handle the change
    const handleChange = (e) => {
        setFormFields((prevValue) => ({
            ...prevValue,
            [e.target.name]: e.target.value,
        }));
    };
    // initialize navigation and dispatching
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // get the states from redux store
    const { isError, isSuccess, message, user,isLoading } = useSelector(state => state.auth);
    
    // handle the third party
    useEffect(()=>{
        if (isError) {
            toast('Invalid Credential')
            alert('Invalid Credential');
        } if (isSuccess) {
            navigate('/dashboard');
        }
        // dispatch(reset())
    },[isError,isSuccess,user,navigate,dispatch])
    // handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email,password
        }
        if (!email || !password) {
            alert('Please enter the fields!')
        } else {
            dispatch(loginUser(userData));
            
        }
        
    }
    if(isLoading){
        return <Spinner/>
    }
    return (
        <>
            <Stack direction='vertical' className='p-4'>
                <Stack direction='vertical' className='mb-3'>
                    <div className='signup--logo py-3'>
                    {/* <img src={wire} alt="Khan Copper's" /> */}
                    </div>
                    <h5 className='heading'>{heading}</h5>
                    <p className='gray'>{title}</p>
                </Stack>
                <Form style={{ width: "100%" }}>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label className='label--heading gray'>Email</Form.Label>
                        <Form.Control name="email" value={email} onChange={handleChange} type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label className='label--heading gray'>Password</Form.Label>
                        <Form.Control name="password" value={password} onChange={handleChange} type="password" placeholder="Password" />
                    </Form.Group>
                    <Stack direction='horizontal' className='d-flex justify-content-between'>
                        <Stack direction='horizontal'>
                            <Form.Check className='mb-3' type='checkbox' id='default-checkbox' />
                            <Form.Label className='mb-3 ms-3'>
                                <span className='gray'>Remember me</span>
                            </Form.Label>
                        </Stack>
                        <Stack direction='horizontal' style={{marginTop: "-12px"}}>
                            <Link to="/forget-password"  style={{ textDecoration: "none", color: "rgb(115,103,240)",cursor:'pointer' }}>Forgot Password? </Link>
                        </Stack>
                    </Stack>
                    <Button type="submit" onClick={handleSubmit} style={{ width: "100%", backgroundColor: "#7367F0" }}>login</Button>
                </Form>
                <Stack direction='horizontal' className='mx-auto mt-3'>
                    <div className='gray'>New on our platform?</div>
                    <div className='ms-3 gray'><NavLink to='/register' style={{ textDecoration: "none", color: "rgb(115,103,240)" }}>Create an account</NavLink></div>
                </Stack>
                <Stack direction='horizontal' className='d-flex align-items-center mt-3'>
                    <hr className='hr' aria-orientation="horizontal" role="separator" />
                    <span className="mx-4">or</span>
                    <hr className='hr' aria-orientation="horizontal" role="separator" />
                </Stack>
                <Stack>
                    <div className='d-flex justify-content-center gap-3 flex-wrap'>
                        <button className='social--btns' style={{ backgroundColor: '#E1E6F2' }}>
                            <span>
                                <FacebookIcon />
                            </span>
                        </button>
                        <button className='social--btns' style={{ backgroundColor: "#F9E2DF" }}>
                            <span>
                                <GooglePlusIcon />
                            </span>
                        </button>
                        <button className='social--btns' style={{ backgroundColor: "#DBF0FD" }}>
                            <span>
                                <TwitterIcon />
                            </span>
                        </button>
                    </div>
                </Stack>
            </Stack>
        </>
    )
}

export default LoginForm
