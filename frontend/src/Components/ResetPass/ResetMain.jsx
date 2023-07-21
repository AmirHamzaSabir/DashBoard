
import {Row, Col} from 'react-bootstrap';
import ResetForm from './ResetForm';
import resetImg from '../../images/resetPass.png'
import Banner from './Banner';
const ResetMain = () => {
    return (
        <div style={{ overflow: 'hidden' }}>
            <Row style={{ height: '100vh', alignItems: 'center', overflowX: "hidden" }}>
                <Col lg={8} className="d-none d-lg-block">
                    <Banner resetImg={resetImg} />
                </Col>
                <Col lg={4}>
                    <ResetForm heading={'Reset Password? 🔒'} title={"for user mail here!"} />
                </Col>
            </Row>
        </div>
    )
}

export default ResetMain

