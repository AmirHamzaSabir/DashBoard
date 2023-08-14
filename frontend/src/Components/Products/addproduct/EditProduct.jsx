import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../../features/categories/categorySlice";
import Spinner from "../../Spinner/Spinner";
import { addProduct, reset, updateProduct } from "../../../features/products/productSlice";
import {
  FormGroup,
  Label,
  Input,
  Button,
  Form,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { Upload } from "react-feather";
import { toastPromise } from "../../UiElements/PromiseToast";
import { ToastContainer } from "react-toastify";
import { allSizes } from "../../../Functions/size";
const EditProduct = ({ toggleEdit, showEdit, product, title }) => {
  const [photoPreview, setPhotoPreview] = useState(null);
  const [myCategory, setMyCategory] = useState([]);
  const { categories, isLoading } = useSelector((state) => state.category);

  const [selectedFiles, setSelectedFiles] = useState(product.image != "" ?product.image.split(', '):[]);
  const [fileCount, setFileCount] = useState(selectedFiles.length != 0? selectedFiles.length :0);
  const [formFields, setFormFields] = useState({
    name: `${product.name}`,
    price: `${product.price}`,
    description: `${product.description}`,
    category: `${product.category}`,
    color: `${product.color}`,
    size: `${product.size}`,
    quantity: `${product.quantity}`
  });
  // console.log(formFields);
  const { name, price, description, category, color,size ,quantity} = formFields;

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
      // setLoad(false);
      // Set Default category field
      // setFormFields((prevValue) => ({
      //   ...prevValue,
      //   category: `${categories[0]._id !== "" ? categories[0]._id : ""}`,
      // }));
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
    const productData = {...product,
      name,
      price,
      description,
      category,
      color,
      image,
      quantity,
      size
    };
    console.log(productData);
    if (!name || !price || !description || !category || !color || !image) {
      alert("please enter all the fields");
    } else {
      toastPromise(
        dispatch(updateProduct(productData)),
        "Submitting.....",
        "Added Successfully",
        "Error occurred!"
      );
      // setFormFields({
      //   ...formFields,
      //   name: "",
      //   price: "",
      //   description: "",
      //   category: "",
      //   color: "",
      // });
      // setSelectedFiles([]);
      // setFileCount(0);
      // alert("Product added");
    }
  };
  useEffect(() => {

    dispatch(reset());
  }, [ dispatch]);

    return (
      <>
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
            <Col
                  md={12}
                  className="mb-3 d-flex flex-column align-items-center"
                >
                  <div id="productImages">
                    {selectedFiles.map((file, index) => (
                      <figure key={index}>
                        <img
                          src={file === undefined ? "" : file}
                          alt="Not Found"
                        />
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
                <Col className="mb-3" xs={12} md={6}>
              <FormGroup>
                <Label htmlFor="size" className="form-label">
                  Size
                </Label>
                <Input
                  name="size"
                  value={size}
                  onChange={handleChange}
                  type="select"
                  className="form-control"
                  id="size"
                >
                    {allSizes && allSizes.length > 0 ? (
                    allSizes.map((name,index) => (
                      <option key={index} value={name}>
                        {name}
                      </option>
                    ))
                  ) : (
                    <option value="">No Size Available</option>
                  )}
                </Input>
              </FormGroup>
            </Col>
            <Col className="mb-3" xs={12} md={6}>
                  <FormGroup>
                    <Label htmlFor="inputCity" className="form-label">
                      Quantity
                    </Label>
                    <Input
                      name="quantity"
                      value={quantity}
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
      </>
    );
  }
export default EditProduct;
