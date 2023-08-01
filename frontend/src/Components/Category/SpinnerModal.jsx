// ** Reactstrap Imports
import { Row, Modal, ModalBody, Spinner } from "reactstrap";
import { PulseLoader } from "react-spinners";
// import Spinner from "../Spinner/Spinner";
const SpinnerModal = () => {
  return (
    <>
      <Modal
        isOpen={true}
        className="modal-dialog-centered modal-lg"
        id="SpinnerModal"
      >
        <ModalBody>
          <p>Loading</p>
          <Spinner />
          {/* <PulseLoader /> */}
        </ModalBody>
      </Modal>
    </>
  );
};

export default SpinnerModal;
