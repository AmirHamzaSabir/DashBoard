import {Row, Col} from 'react-bootstrap';
import Banner from './Banner'
import loginImg from '../../images/login.png'
import LoginForm from './LoginForm';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Spinner from '../Spinner/Spinner';
const Login = () => {
  // get the loading state from the auth state
  const { isLoading } = useSelector(state => state.auth);
  // update the count whenever user visits the login
  const updateCount = async () => {
    try{
      await axios.post(`${process.env.REACT_APP_BASE_URL}/visitors/track`);
    } catch (error) {
      toast(error);
    }
  }
  useEffect(() => {
    updateCount();
  },[])
  if (isLoading) {
    return <Spinner/>
  }
  return (
    <div style={{ overflow: 'hidden' }}>
            <Row style={{ height: '100vh', alignItems: 'center', overflowX: "hidden" }}>
                <Col lg={8} className="d-none d-lg-block">
                    <Banner loginUpImg={loginImg}/>
                </Col>
                <Col lg={4}>
                    <LoginForm heading={"Welcome to Khan Copper's! 👋🏻"} title={'Please sign-in to your account and start the adventure'}/>
                </Col>
            </Row>
    </div>
  )
}

export default Login
