import {Row, Col} from 'react-bootstrap';
import Banner from './Banner'
import forgetImg from '../../images/forgetPass.png'
import ForgetForm from './ForgetForm';

const Main = () => {
  return (
    <div style={{ overflow: 'hidden' }}>
            <Row style={{ height: '100vh', alignItems: 'center', overflowX: "hidden" }}>
                <Col lg={8} className="d-none d-lg-block">
                    <Banner forgetImg={forgetImg}/>
                </Col>
                <Col lg={4}>
                    <ForgetForm heading={'Forgot Password? 🔒'} title={"Enter your email and we'll send you instructions to reset your password"}/>
                </Col>
            </Row>
    </div>
  )
}

export default Main
