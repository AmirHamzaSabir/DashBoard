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

// ** Third Party Components
// import Select from 'react-select'
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../features/auth/authSlice";
import { toastPromise } from "../../UiElements/PromiseToast";

const EditUser = ({ user, showEdit, toggleEdit, title = "Update" }) => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState({
    name: `${user.name}`,
    email: `${user.email}`,
    password: `${user.password}`,
    c_password: `${user.password}`,
    m_number: `${user.m_number}`,
    role: `${user.role}`,
  });

  const { name, email, password, c_password, m_number, role } = formFields;

  const handleChange = (e) => {
    setFormFields((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {...user,
      name,
      email,
      password,
      m_number,
      role: role === "undefined" ? 0 : role,
    };
    console.log(userData)
    toastPromise(
      dispatch(updateUser(userData)),
      "Saving Changes....",
      "Updated Successfully",
      "Error occured !"
    )
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
          <div className="text-center mb-3">
            <h3 className="mb-1"> {title}</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <FormGroup className="col-md-6 col-xs-12">
                <Label for="name" className="form-label">
                  User Name
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  placeholder="Username"
                />
              </FormGroup>
              <FormGroup className="col-md-6 col-xs-12">
                <Label for="email" className="form-label">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Email"
                  disabled
                />
              </FormGroup>
            </div>
            <div className="row">
              <FormGroup className="col-md-6 col-xs-12">
                <Label for="password" className="form-label">
                  Password
                </Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Password"
                  disabled
                />
              </FormGroup>
              <FormGroup className="col-md-6 col-xs-12">
                <Label for="c_password" className="form-label">
                  Confirm Password
                </Label>
                <Input
                  type="password"
                  id="c_password"
                  name="c_password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  disabled
                />
              </FormGroup>
            </div>
            <div className="row">
              <FormGroup className="col-md-6 col-xs-12">
                <Label for="m_number" className="form-label">
                  Mobile Number
                </Label>
                <Input
                  type="number"
                  id="m_number"
                  name="m_number"
                  value={m_number}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                />
              </FormGroup>
              <FormGroup className="col-md-6 col-xs-12">
                <Label
                  for="role"
                  className="form-label"
                  style={{
                    fontSize: ".875rem",
                    fontWeight: "400",
                    marginBottom: ".5rem",
                  }}
                >
                  Select Role
                </Label>
                <Input
                  type="select"
                  id="role"
                  name="role"
                  value={role}
                  onChange={handleChange}
                >
                  <option value={1}>Admin</option>
                  <option value={0}>User</option>
                  <option value={2}>Super Admin</option>
                </Input>
              </FormGroup>
            </div>
            <FormGroup className="row">
              <div className="col-md-12 col-xs-12 text-center">
                {/* Wrap the buttons inside a div with text-right class */}
                <Button type="submit" color="primary" className="me-1">
                  Update
                </Button>
                <Button
                  type="button"
                  color="secondary"
                  outline
                  onClick={() => toggleEdit()}
                >
                  Discard
                </Button>
              </div>
            </FormGroup>
          </form>
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

export default EditUser;

// import React, { useState, useEffect } from "react";
// import { ModalBody, FormGroup, Label, Input, Button } from "reactstrap";
// import { useSelector, useDispatch } from "react-redux";
// import { addNewUser, reset } from "../../../features/auth/authSlice";
// import { useNavigate } from "react-router-dom";
// import Spinner from "../../Spinner/Spinner";
// import { toast } from "react-toastify";

// const AddUser = () => {
//   const { user } = useSelector((state) => state.auth);
//   // use navigation
//   const navigate = useNavigate();
//   // redirect back to the login, if no user is logged in
//   useEffect(() => {
//     if (!user) {
//       navigate("/");
//     }
//   }, [navigate, user]);

//   // get the states from the auth state from the store
//   const { isLoading, isError, isSuccess, message } = useSelector(
//     (state) => state.auth
//   );
//   // handle the 3rd party
//   useEffect(() => {
//     if (isError) {
//       alert("Not Authorized");
//     }
//   }, [isError, message, isSuccess]);
//   // initialze the dispatch function
//   const dispatch = useDispatch();
//   const [formFields, setFormFields] = useState({
//     name: "",
//     email: "",
//     password: "",
//     c_password: "",
//     m_number: "",
//     role: 0,
//   });

//   const { name, email, password, c_password, m_number, role } = formFields;

//   const handleChange = (e) => {
//     setFormFields((prevValue) => ({
//       ...prevValue,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const userData = {
//       name,
//       email,
//       password,
//       m_number,
//       role: role === "undefined" ? 0 : role,
//     };
//     dispatch(addNewUser(userData))
//       .then((res) => {
//         setFormFields({
//           name: "",
//           email: "",
//           password: "",
//           c_password: "",
//           m_number: "",
//           role: 0,
//         });
//       })
//       .catch((err) => alert(err));
//   };

//   if (isLoading) {
//     return <Spinner />;
//   }

//   return (

//   );
// };

// export default AddUser;
