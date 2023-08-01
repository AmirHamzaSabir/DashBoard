import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../../features/categories/categorySlice";
import Spinner from "../../Spinner/Spinner";
import { addProduct, reset } from "../../../features/products/productSlice";
import { FormGroup, Label, Input, Button, Form, Row, Col } from "reactstrap";
import { Upload } from "react-feather";
const ProductForm = () => {
  const [load, setLoad] = useState(true);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [formFields, setFormFields] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    color: "",
  });
  const [myCategory, setMyCategory] = useState([]);
  const { categories, isLoading } = useSelector((state) => state.category);
  const { message, isError } = useSelector((state) => state.product);
  const { name, price, description, category, color } = formFields;
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileCount, setFileCount] = useState(0);
  // handle the change
  const handleImage = (e) => {
    console.log(e.target.files.length);
    const file = e.target.files[0];
    const img = URL.createObjectURL(file);
    setPhotoPreview(img);
    setPhoto(file);
  };

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
    }
  }, [categories, isLoading]);

   const handlePreview =async (e) => {
    setSelectedFiles([])
    const files = e.target.files;
    const filePreviews = [];
    setFileCount(files.length);
    console.log(files)
    for (var i=0; i< 5; i++) {
        var img = await imageUpload(files[i]);
        filePreviews.push(img)
        if(filePreviews.length === 5){
            setSelectedFiles(filePreviews)
        }

    }
    console.log(filePreviews)
  };
  // handle Image
  const handleSubmit = async (e) => {
    e.preventDefault();
    const image = await imageUpload(photo);
    console.log(selectedFiles)
    const productData = {
      name,
      price,
      description,
      category,
      color,
      image,
    };
    if (!name || !price || !description || !category || !color || !photo) {
      alert("please enter all the fields");
    } else {
      dispatch(addProduct(productData));
      setFormFields({
        ...formFields,
        name: "",
        price: "",
        description: "",
        category: "",
        color: "",
      });
      setPhotoPreview(null);
      setPhoto(null);
      alert("Product added");
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
                    <img src={file} alt="Not Found" />
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
            {/* <Col
              className="mb-3 d-flex flex-column align-items-center"
              xs={12}
              md={12}
            >
              <Label htmlFor="productImg" className="mb-3 fs-4">
                Images
              </Label>
              <div className="image w-25 mb-3">
                <img
                  width="100%"
                  name="image"
                  src={photoPreview ? photoPreview : ""}
                  alt=""
                />
              </div>
              <Input
                name="photo"
                onChange={handleImage}
                type="file"
                id="productImg"
                multiple=""
                data-max_length="10"
              />
            </Col> */}

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
      </div>
    );
  }
};
export default ProductForm;
