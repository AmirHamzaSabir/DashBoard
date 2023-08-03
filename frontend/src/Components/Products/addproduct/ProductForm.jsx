import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../../features/categories/categorySlice";
import Spinner from "../../Spinner/Spinner";
import { addProduct, reset } from "../../../features/products/productSlice";
import { FormGroup, Label, Input, Button, Form, Row, Col } from "reactstrap";
import { Upload } from "react-feather";
import { toastPromise } from "../../UiElements/PromiseToast";
import { ToastContainer } from "react-toastify";
const ProductForm = () => {
  const [load, setLoad] = useState(true);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [myCategory, setMyCategory] = useState([]);
  const { categories, isLoading } = useSelector((state) => state.category);
  const { message, isError } = useSelector((state) => state.product);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileCount, setFileCount] = useState(0);
  const [formFields, setFormFields] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    color: "",
  });
  const { name, price, description, category, color } = formFields;

  // handle the change
  const handleChange = (e) => {
    setFormFields((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };

  // handle the cloud upload
  const imageUpload = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "vgvxg0kj");
    let res = await fetch(
      "https://api.cloudinary.com/v1_1/djo5zsnlq/image/upload",
      {
        method: "post",
        body: formData,
      }
    );
    const myImage = await res.json();
    return myImage.url;
  };

  const dispatch = useDispatch();

  // get the categories
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading) {
      setMyCategory(categories);
      setLoad(false);
      // Set Default category field
      setFormFields((prevValue) => ({
        ...prevValue,
        category: `${categories[0]._id !== "" ? categories[0]._id : ""}`,
      }));
    }
  }, [categories, isLoading]);

  const handlePreview = async (e) => {
    setSelectedFiles([]);
    const files = e.target.files;
    const filePreviews = [];
    const iterator = files.length > 5 ? 5 : files.length;
    setFileCount(iterator);

    for (var i = 0; i < iterator; i++) {
      var img = await imageUpload(files[i]);
      filePreviews.push(img);
      if (filePreviews.length === iterator) {
        setSelectedFiles(filePreviews);
      }
    }
    console.log(filePreviews);
  };
  // handle Image
  const handleSubmit = async (e) => {
    e.preventDefault();
    const image = selectedFiles.join(", ");
    const productData = {
      name,
      price,
      description,
      category,
      color,
      image,
    };
    console.log(productData);
    if (!name || !price || !description || !category || !color || !image) {
      alert("please enter all the fields");
    } else {
      toastPromise(
        dispatch(addProduct(productData)),
        "Submitting.....",
        "Added Successfully",
        "Error occurred!"
      );
      setFormFields({
        ...formFields,
        name: "",
        price: "",
        description: "",
        category: "",
        color: "",
      });
      setSelectedFiles([]);
      setFileCount(0);
      // alert("Product added");
    }
  };
  useEffect(() => {
    if (isError) {
      alert(message);
    }
    dispatch(reset());
  }, [isError, dispatch, message]);

  if (load) {
    return <Spinner />;
  } else {
    return (
      <div className="card p-3" id="addProduct">
        <Form className="mx-5">
          <Row>
            <Col md={12} className="mb-3 d-flex flex-column align-items-center">
              <div id="productImages">
                {selectedFiles.map((file, index) => (
                  <figure key={index}>
                    <img src={file === undefined ? "" : file} alt="Not Found" />
                    {/* <figcaption>{file.name}</figcaption> */}
                  </figure>
                ))}
              </div>
              <Input
                type="file"
                id="file-input"
                accept="image/png, image/jpeg"
                onChange={handlePreview}
                multiple
              />
              <Label id="imagesUploader" for="file-input">
                <Upload className="fas fa-upload"></Upload> &nbsp; Choose A
                Photo
              </Label>
              <p id="num-of-files" className="text-center mt-1">
                {fileCount == 0
                  ? "No Image Chosen"
                  : `${fileCount} Image Selected`}
              </p>
            </Col>

            <Col className="mb-3" xs={12} md={6}>
              <FormGroup>
                <Label htmlFor="inputName" className="form-label">
                  Name
                </Label>
                <Input
                  name="name"
                  value={name}
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  id="inputName"
                />
              </FormGroup>
            </Col>
            <Col className="mb-3" xs={12} md={6}>
              <FormGroup>
                <Label htmlFor="inputPrice" className="form-label">
                  Price
                </Label>
                <Input
                  name="price"
                  value={price}
                  onChange={handleChange}
                  type="number"
                  className="form-control"
                  id="inputPrice"
                />
              </FormGroup>
            </Col>
            <Col className="mb-3" xs={12} md={6}>
              <FormGroup>
                <Label htmlFor="inputState" className="form-label">
                  Category
                </Label>
                <Input
                  type="select"
                  value={category}
                  name="category"
                  onChange={handleChange}
                  id="inputState"
                  className="form-select"
                >
                  {myCategory && myCategory.length > 0 ? (
                    myCategory.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.category}
                      </option>
                    ))
                  ) : (
                    <option value="">No Categories Available</option>
                  )}
                </Input>
              </FormGroup>
            </Col>
            <Col className="mb-3" xs={12} md={6}>
              <FormGroup>
                <Label htmlFor="inputCity" className="form-label">
                  Color
                </Label>
                <Input
                  name="color"
                  value={color}
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  id="inputCity"
                />
              </FormGroup>
            </Col>
            <Col className="mb-3" xs={12} md={12}>
              <FormGroup>
                <Label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Description
                </Label>
                <Input
                  type="textarea"
                  name="description"
                  value={description}
                  onChange={handleChange}
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="4"
                ></Input>
              </FormGroup>
            </Col>

            <Col className="mb-3 text-end">
              <Button
                onClick={handleSubmit}
                type="submit"
                className="btn btn-dark"
              >
                Create
              </Button>
            </Col>
          </Row>
        </Form>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    );
  }
};
export default ProductForm;
