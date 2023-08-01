// ** React Imports
import { Fragment, useState } from "react";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Modal,
  Input,
  Label,
  Button,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { ToastContainer } from "react-toastify";

// ** Third Party Components
// import Select from 'react-select'
import { useDispatch } from "react-redux";
import { toastPromise } from "../UiElements/PromiseToast";
import { removeCategory } from "../../features/categories/categorySlice";
import { removeUser } from "../../features/auth/authSlice";
import { removeProduct } from "../../features/products/productSlice";

const Delete = ({ id, showDelete, toggleDelete,title,type="" }) => {
  const dispatch = useDispatch();  
  const handleDelete = (e) => {
    e.preventDefault();
    if(title === "Delete User"){
    toastPromise(dispatch(removeUser(id)),"Saving Changes....","Delete Successfully","Error occured !");

    }else if(title === "Delete Product"){
    toastPromise(dispatch(removeProduct(id)),"Saving Changes....","Delete Successfully","Error occured !");

    }
    else{
    toastPromise(dispatch(removeCategory(id)),"Saving Changes....","Delete Successfully","Error occured !");
    }
  };
  return (
    <Fragment>
      <Modal
        isOpen={showDelete}
        toggle={() => toggleDelete()}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => toggleDelete()}
        ></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5 ">
         
          <Row tag="form" className="gy-1 pt-75">
            <Col md={12} xs={12}>
              <Label className="form-label" for="email">
                Are you sure you want to Delete this record?
              </Label>
            </Col>
            <Col xs={12} className="text-end mt-2 pt-50 me-0">
              <Button
                type="button"
                className="me-1"
                color="danger"
                onClick={handleDelete}
              >
                {title.split(" ")[0]}
              </Button>
              <Button
                type="reset"
                color="secondary"
                outline
                onClick={() => toggleDelete()}
              >
                Discard
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Fragment>
  );
};

export default Delete;
