import { useEffect, useState } from 'react';
import {Form, Stack,Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser,reset } from '../../features/auth/authSlice';
import Spinner from '../Spinner/Spinner'
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
            navigate('/dashboard')
        }
        dispatch(reset())
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
                        <svg width="32" height="22" viewBox="0 0 34 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.00183571 0.3125V7.59485C0.00183571 7.59485 -0.141502 9.88783 2.10473 11.8288L14.5469 23.6837L21.0172 23.6005L19.9794 10.8126L17.5261 7.93369L9.81536 0.3125H0.00183571Z"></path>
                            <path opacity="0.06" fill-rule="evenodd" clip-rule="evenodd" d="M8.17969 17.7762L13.3027 3.75173L17.589 8.02192L8.17969 17.7762Z" ></path>
                            <path opacity="0.06" fill-rule="evenodd" clip-rule="evenodd" d="M8.58203 17.2248L14.8129 5.24231L17.6211 8.05247L8.58203 17.2248Z"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.25781 17.6914L25.1339 0.3125H33.9991V7.62657C33.9991 7.62657 33.8144 10.0645 32.5743 11.3686L21.0179 23.6875H14.5487L8.25781 17.6914Z"></path>
                        </svg>
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
                    <div className='ms-3 gray'><Link to='/register' style={{ textDecoration: "none", color: "rgb(115,103,240)" }}>Create an account</Link></div>
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
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="facebook">
                                    <path fill="#1976D2" fill-rule="evenodd" d="M12 5.5H9v-2a1 1 0 0 1 1-1h1V0H9a3 3 0 0 0-3 3v2.5H4V8h2v8h3V8h2l1-2.5z" clip-rule="evenodd"></path>
                                </svg>
                            </span>
                        </button>
                        <button className='social--btns' style={{ backgroundColor: "#F9E2DF" }}>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="google-plus">
                                    <path fill="#F44336" d="M16 7h-2V5h-1v2h-2v1h2v2h1V8h2zM5 9h2.829A3.006 3.006 0 0 1 5 11c-1.654 0-3-1.346-3-3s1.346-3 3-3c.717 0 1.407.257 1.943.724l1.314-1.508A4.955 4.955 0 0 0 5 3C2.243 3 0 5.243 0 8s2.243 5 5 5 5-2.243 5-5V7H5v2z"></path>
                                </svg>
                            </span>
                        </button>
                        <button className='social--btns' style={{ backgroundColor: "#DBF0FD" }}>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="twitter">
                                    <path fill="#03A9F4" d="M16 3.539a6.839 6.839 0 0 1-1.89.518 3.262 3.262 0 0 0 1.443-1.813 6.555 6.555 0 0 1-2.08.794 3.28 3.28 0 0 0-5.674 2.243c0 .26.022.51.076.748a9.284 9.284 0 0 1-6.761-3.431 3.285 3.285 0 0 0 1.008 4.384A3.24 3.24 0 0 1 .64 6.578v.036a3.295 3.295 0 0 0 2.628 3.223 3.274 3.274 0 0 1-.86.108 2.9 2.9 0 0 1-.621-.056 3.311 3.311 0 0 0 3.065 2.285 6.59 6.59 0 0 1-4.067 1.399c-.269 0-.527-.012-.785-.045A9.234 9.234 0 0 0 5.032 15c6.036 0 9.336-5 9.336-9.334 0-.145-.005-.285-.012-.424A6.544 6.544 0 0 0 16 3.539z"></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                </Stack>
            </Stack>
        </>
    )
}

export default LoginForm
