import React, { useState, useEffect } from "react";
import { FormControl, Select, MenuItem } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../Spinner/Spinner";
import {
  getSingleOrder,
  updateStatus,
  reset,
} from "../../../features/order/orderSlice";
import { getProducts } from "../../../features/products/productSlice";
import { getAllUsers } from "../../../features/auth/authSlice";
import { FormGroup, Input, Label } from "reactstrap";
import { toastPromise } from "../../UiElements/PromiseToast";
import { ToastContainer } from "react-toastify";

const Detailheader = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orders, isLoading, isError, message } = useSelector(
    (state) => state.order
  );
  const { products, p_isLoading } = useSelector((state) => state.product);
  const { allUsers, u_isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      alert(message);
    }
    dispatch(reset());
  }, []);
  const [formFields, setFormFields] = useState({
    status: `${orders.status}`,
  });

  const { status } = formFields;

  const handleChange = (e) => {
    setFormFields((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(status);
    toastPromise(
      dispatch(updateStatus({ id, status })),
      "Saving Changes....",
      "Updated Successfully",
      "Error occured !"
    );
  };
  useEffect(() => {
    dispatch(getSingleOrder(id));
    dispatch(getProducts());
    dispatch(getAllUsers());

  }, [message, dispatch, id]);

  const getProduct = (product_id) => {
    const myProduct = products.find((prod) => prod._id === product_id);
    return myProduct;
  };

  const getUser = (user_id) => {
    const user = allUsers.find((user) => user._id === user_id);
    return user;
  };

  if (isLoading || p_isLoading || u_isLoading) {
    return <Spinner />;
  }
  return (
    <div className="d-flex flex-wrap justify-content-between gap-y-5 p-24">
      <div>
        <h2 className="heading">
          {getProduct(orders.product)?.name || "no data"}
        </h2>
        <p className="mr-05">
          {getUser(orders.user)?.name || "not loaded yet"}
        </p>
        <p className="mr-05">
          {getUser(orders.user)?.name || "not loaded yet"}
        </p>
        <p className="mr-05">
          {getUser(orders.user)?.email || "not loaded yet"}
        </p>
        <p className="mr-05">
          {getUser(orders.user)?.m_number || "not loaded yet"}
        </p>
      </div>
      <div>
        <div className="orderid--container" style={{ width: "max-content" }}>
          <span style={{ fontWeight: "500" }}>Order id# {orders._id}</span>
        </div>
        <div>
          <Label
            htmlFor="status"
            style={{
              marginTop: "1rem",
              fontSize: ".975rem",
              fontWeight: "500",
              marginBottom: ".5rem",
            }}
          >
            Order Status
          </Label>
          <FormGroup>
            <Input
              type="select"
              name="status"
              id="status"
              style={{ marginBottom: "12px", padding: "10px" }}
              value={status}
              onChange={handleChange}
            >
              <option value={"new"}>New</option>
              <option value={"confirm"}>Confirmed</option>
              <option value={"packed"}>Packed</option>
              <option value={"shipped"}>Shipped</option>
              <option value={"delievered"}>Delivered</option>
              <option value={"pending"}>Pending</option>
              <option value={"cancel"}>Cancelled</option>
              <option value={"failed"}>Failed</option>
              <option value={"return"}>Returned</option>
            </Input>
            <div className="col-12 mb-3 w-100">
              <button
                onClick={handleSubmit}
                type="submit"
                className="btn btn-dark w-100"
              >
                Update Status
              </button>
            </div>
          </FormGroup>
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
    </div>
  );
};

export default Detailheader;
