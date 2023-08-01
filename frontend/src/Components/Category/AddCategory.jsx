import React, { useState } from "react";
import { TextField } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { addCategory } from "../../features/categories/categorySlice";
import { toastPromise } from "../UiElements/PromiseToast";

const AddCategory = () => {
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setCategory(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category) {
      alert("Please enter the requried field");
    }
    toastPromise( dispatch(addCategory({ category: category })), // Wrap the dispatch in a function
      "Submitting.....",
      "Added Successfully",
      "Error occurred!"
    );
  };
  return (
    <div style={{ boxShadow: "none" }}>
      <div style={{ padding: "24px" }}>
        <div>
          <div className="row">
            <TextField
              value={category}
              onChange={handleChange}
              type="text"
              name="category"
              label="Category"
              style={{ marginBottom: "12px" }} // Add spacing here
            />
            <div className="col-12">
              <button
                onClick={handleSubmit}
                type="button"
                className="navbtn primary--btn"
              >
                Submit
              </button>
              <button className="navbtn gray--btn">Cancel</button>
            </div>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
};

export default AddCategory;
