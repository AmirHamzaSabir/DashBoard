import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addShipping } from "../../../features/shipping/shippingSlice";
import Spinner from "../../Spinner/Spinner";
import { useParams } from "react-router-dom";
const Shipping = () => {
  const { id } = useParams();

  const [formFields, setFormFields] = useState({
    name: "",
    awb: "",
    address: "",
  });
  const { s_isLoading } = useSelector((state) => state.shipping);
  const { name, awb, address } = formFields;
  const handleChange = (e) => {
    setFormFields((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !awb || !address) {
      alert("Please enter all the fields");
    } else {
      const shippingData = {
        name,
        awb,
        address,
      };
      let func = dispatch(addShipping(shippingData));
      if (func) {
        alert("Added Successfully");
        setFormFields({ ...formFields, name: "", awb: "", address: "" });
      } else {
        alert("An Error Occured");
      }
    }
  };
  if (s_isLoading) {
    return <Spinner />;
  }
  return (
    <div className="p-24">
      <form className="row">
        <div className="col-12 mb-3">
          <h2>Shipping</h2>
        </div>
        <div className="col-12 col-md-4 col-lg-4 mb-3">
          <div>
            <label htmlFor="courier" className="mb-3 fs-5">
              Courier Name:{" "}
            </label>
          </div>
          <input
            value={name}
            onChange={handleChange}
            type="text"
            name="name"
            id="courier"
            className="bank-input w-100"
          />
        </div>
        <div className="col-12 col-md-4 col-lg-4 mb-3">
          <div>
            <label htmlFor="awb" className="mb-3 fs-5">
              AWB No:{" "}
            </label>
          </div>
          <input
            value={awb}
            onChange={handleChange}
            type="number"
            name="awb"
            id="awb"
            className="bank-input w-100"
          />
        </div>
        <div className="col-12 mb-3">
          <div>
            <label htmlFor="courierurl" className="mb-3 fs-5">
              Courier Address:{" "}
            </label>
          </div>
          <input
            value={address}
            onChange={handleChange}
            type="url"
            name="address"
            id="courierurl"
            className="bank-input w-100"
          />
        </div>
        <div className="col-12 mb-3">
          <button onClick={handleSubmit} type="submit" className="btn btn-dark">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default Shipping;
