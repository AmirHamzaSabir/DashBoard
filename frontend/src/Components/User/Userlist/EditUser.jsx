import React, { useState, useEffect, useRef } from "react";
import { FormControl, Select, MenuItem, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../../Spinner/Spinner";
import { toast } from "react-toastify";
const EditUser = ({ currentUser, toggle }) => {
  const { user } = useSelector((state) => state.auth);
  // use navigation
  const navigate = useNavigate();
  // redirect back to the login, if no user is logged in
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
    c_password: "",
    m_number: "",
    role: 0,
  });

  const { name, email, password, c_password, m_number, role } = formFields;
  const sideForm = useRef(null);
  const handleChange = (e) => {
    setFormFields((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };

  // get the states from the auth state from the store
  const { isLoading, isError, message } = useSelector((state) => state.auth);

  // handle the 3rd party
  useEffect(() => {
    if (isError) {
      alert("Not Authorized");
    }
    if (currentUser) {
      setFormFields({
        ...formFields,
        name: `${currentUser.name}`,
        email: `${currentUser.email}`,
        m_number: `${currentUser.m_number}`,
        role: `${currentUser.role}`,
      });
    }
  }, []);
  // initialze the dispatch function
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      id: `${currentUser._id}`,
      name,
      email,
      password,
      m_number,
      role,
    };
    dispatch(updateUser(userData))
      .then((res) => {
        alert("Data updated successfully");
        setFormFields({
          ...formFields,
          name: "",
          email: "",
          password: "",
          c_password: "",
          m_number: "",
        });
        toggle();
      })
      .catch((res) => alert(res));
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="" style={{ boxShadow: "none" }}>
      <div style={{ padding: "24px" }}>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <TextField
              value={name}
              onChange={handleChange}
              type="text"
              name="name"
              label="Username"
              style={{ marginBottom: "12px" }} // Add spacing here
            />
            <TextField
              value={email}
              onChange={handleChange}
              type="email"
              name="email"
              label="Email"
              style={{ marginBottom: "12px" }} // Add spacing here
            />
            {/* <TextField
              value={password}
              onChange={handleChange}
              type="password"
              name="password"
              label="Password"
              style={{ marginBottom: "12px" }} // Add spacing here
            />
            <TextField
              value={c_password}
              onChange={handleChange}
              type="password"
              name="c_password"
              label="Confirm Password"
              style={{ marginBottom: "12px" }} // Add spacing here
            /> */}
            <TextField
              value={m_number}
              onChange={handleChange}
              type="number"
              name="m_number"
              label="Mobile Number"
              style={{ marginBottom: "12px" }} // Add spacing here
            />
            <div className="col-12" style={{ padding: "0" }}>
              <label
                htmlFor="role"
                style={{
                  fontSize: ".875rem",
                  fontWeight: "400",
                  marginBottom: ".5rem",
                }}
              >
                Select Role
              </label>
              <FormControl fullWidth>
                <Select
                  value={role}
                  onChange={handleChange}
                  name="role"
                  id="demo-simple-select"
                  style={{ marginBottom: "12px", padding: "0" }} // Add spacing here
                >
                  <MenuItem value={1}>Admin</MenuItem>
                  <MenuItem value={0}>User</MenuItem>
                  <MenuItem value={2}>Super Admin</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-12">
              <button type="submit" className="navbtn primary--btn">
                Submit
              </button>
              <button type="button" className="navbtn gray--btn">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
