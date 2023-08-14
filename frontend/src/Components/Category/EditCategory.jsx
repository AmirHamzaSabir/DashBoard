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
  FormGroup,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ** Third Party Components
// import Select from 'react-select'
import { useDispatch, useSelector } from "react-redux";
import { updateCategory } from "../../features/categories/categorySlice";
import { toastPromise } from "../UiElements/PromiseToast";

const EditCategory = ({ categoryName, showEdit, toggleEdit, title }) => {
  const { categories, response } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState({
    category: `${categoryName.category}`,
    status : `${categoryName.status}`,
  });

  const { category, status} = formFields;

  const handleChange = (e) => {
    setFormFields((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    toastPromise(
      dispatch(updateCategory({...categoryName, category,status})),
      "Saving Changes....",
      "Updated Successfully",
      "Error occured !"
    );
  };
  
  return (
    <Fragment>
      <Modal
        isOpen={showEdit}
        toggle={() => toggleEdit()}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => toggleEdit()}
        ></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h3 className="mb-1"> {title}</h3>
          </div>
          <Row tag="form" className="gy-1 pt-75">
            <div className="row">
              <FormGroup className="col-md-6 col-xs-12">
                <Label className="form-label" for="email">
                  Category
                </Label>
                <Input
                  type="text"
                  id="category"
                  name="category"
                  placeholder="Name of the Category"
                  value={category}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup className="col-md-6 col-xs-12">
                <Label
                  for="Status"
                  className="form-label"
                  style={{
                    fontSize: ".875rem",
                    fontWeight: "400",
                    marginBottom: ".5rem",
                  }}
                >
                  Select Status
                </Label>
                <Input
                  type="select"
                  id="role"
                  name="status"
                  value={status}
                  onChange={handleChange}
                >
                  <option value={true}>Active</option>
                  <option value={false}>InActive</option>
                </Input>
              </FormGroup>
            </div>

            <Col xs={12} className="text-center mt-2 pt-50">
              <Button
                type="button"
                className="me-1"
                color="primary"
                onClick={handleSubmit}
              >
                {title.split(" ")[0]}
              </Button>
              <Button
                type="reset"
                color="secondary"
                outline
                onClick={() => toggleEdit()}
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

export default EditCategory;
