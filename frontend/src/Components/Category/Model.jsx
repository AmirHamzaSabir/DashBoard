// ** React Imports
import { Fragment, useState } from "react";

// ** Reactstrap Imports
import {
  Card,
  Row,
  Col,
  Modal,
  Input,
  Label,
  Button,
  CardBody,
  CardText,
  CardTitle,
  ModalBody,
  ModalHeader,
  FormFeedback,
} from "reactstrap";

// ** Third Party Components
// import Select from 'react-select'
import { useDispatch, useSelector } from "react-redux";
import { updateCategory } from "../../features/categories/categorySlice";

const EditCategory = ({ categoryName, showEdit, toggleEdit }) => {
  const { categories,response } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [name, setName] = useState(categoryName.category);

  const checkCategory = (category) => {
    return categories.every(
      (item) =>
        item.category.toLowerCase().trim() == category.toLowerCase().trim()
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(response)
    dispatch(updateCategory({ ...response, category: name }))
      .then((res) => {
        alert("Updated Successfully");
        toggleEdit();
    })
      .catch((err) => console.log(error));
  };
  const handleChange = (e) => {
    setName(e.target.value);
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
            <h3 className="mb-1">Update Category Information</h3>
          </div>
          <Row tag="form" className="gy-1 pt-75">
            <Col md={12} xs={12}>
              <Label className="form-label" for="email">
                Category
              </Label>
              <Input
                type="text"
                id="category"
                name="category"
                placeholder="Name of the Category"
                value={name}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} className="text-center mt-2 pt-50">
              <Button
                type="button"
                className="me-1"
                color="primary"
                onClick={handleSubmit}
              >
                Update
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
    </Fragment>
  );
};

export default EditCategory;
