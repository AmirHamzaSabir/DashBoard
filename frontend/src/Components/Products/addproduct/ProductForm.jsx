import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../../../features/categories/categorySlice';
import Spinner from '../../Spinner/Spinner';
import { addProduct, reset } from '../../../features/products/productSlice';
import { toast } from 'react-toastify';

const ProductForm = () => {
    const [load, setLoad] = useState(true)
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [formFields, setFormFields] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        color: '',
    });
    const [myCategory, setMyCategory] = useState([]);
    const { categories, isLoading } = useSelector((state) => state.category);
    const { message, isError } = useSelector((state) => state.product);
    const { name, price, description, category, color } = formFields;

    // handle the change
    const handleImage = (e) => {
        const file = e.target.files[0];
        const img = URL.createObjectURL(file);
        setPhotoPreview(img);
        setPhoto(file);
    };

    // handle the change 
    const handleChange = e => {
        setFormFields((prevValue) => ({
            ...prevValue,
            [e.target.name]: e.target.value
        }))
    }

    // handle the cloud upload
    const imageUpload = async () => {
        const formData = new FormData();
        formData.append('file', photo);
        formData.append('upload_preset', 'vgvxg0kj');
        let res = await fetch('https://api.cloudinary.com/v1_1/djo5zsnlq/image/upload', {
            method: 'post',
            body: formData
        })
        const myImage = await res.json();
        return myImage.url;

    }

    const dispatch = useDispatch();

    // get the categories
    useEffect(() => {
        dispatch(getCategory());
    }, [dispatch]);


    useEffect(() => {
        if (!isLoading) {
            setMyCategory(categories.categories);
            setLoad(false);
        }
    }, [categories.categories, isLoading]);

    // handle Image
    const handleSubmit = async(e) => {
        e.preventDefault();
        const image = await imageUpload(photo);
        
        const productData = {
            name, price, description, category, color, image
        }
        if (!name || !price || !description || !category || !color || !photo) {
            alert('please enter all the fields');
        } else {
            dispatch(addProduct(productData));
            setFormFields({...formFields,name: '',
            price: '',
            description: '',
            category: '',
            color: '',
            })
            setPhotoPreview(null);
            setPhoto(null);
            alert('Product added')
        }
    }
    useEffect(() => {
        if (isError) {
            alert(message)
        }
        dispatch(reset())
    }, [isError, dispatch, message]);
        
    if (load) {
        return <Spinner />
    } else {
        return (
            <div className='card p-3'>
                <form className='row g-3'>
                    <div className='col-12 mb-3 d-flex flex-column'>
                        <label htmlFor='productImg' className='mb-3 fs-4 '>
                            Images
                        </label>
                        <div className="image w-25 mb-3">
                            <img width="100%" name="image" src={photoPreview ? photoPreview : ''} alt="" />

                        </div>
                        <input name='photo' onChange={handleImage} type='file' id='productImg' multiple=''
                            data-max_length='10' />
                    </div>
                
                    <div className='col-12 col-md-4 col-lg-4 mb-3'>
                        <label htmlFor='inputName' className='form-label'>
                            Name
                        </label>
                        <input name='name' value={name} onChange={handleChange} type='text' className='form-control'
                            id='inputName' />
                    </div>
                    <div className='col-12 col-md-4 col-lg-4 mb-3'>
                        <label htmlFor='inputPrice' className='form-label'>
                            Price
                        </label>
                        <input name='price' value={price} onChange={handleChange} type='number' className='form-control'
                            id='inputPrice' />
                    </div>
                    <div className='col-md-4 mb-3'>
                        <label htmlFor='inputState' className='form-label'>
                            Category
                        </label>
                        <select value={category} name="category" onChange={handleChange} id="inputState" className="form-select">
                            {myCategory && myCategory.length > 0 ? (
                                myCategory.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.category}
                                    </option>
                                ))
                            ) : (
                                <option value="">No Categories Available</option>
                            )}
                        </select>
                    </div>
                    <div className='col-12 col-md-4 col-lg-4 mb-3'>
                        <label htmlFor='exampleFormControlTextarea1' className='form-label'>
                            Description
                        </label>
                        <textarea name='description' value={description} onChange={handleChange} className='form-control'
                            id='exampleFormControlTextarea1' rows='3'></textarea>
                    </div>
                    <div className='col-2 mb-3'>
                        <label htmlFor='inputCity' className='form-label'>
                            Color
                        </label>
                        <input name='color' value={color} onChange={handleChange} type='color' className='form-control'
                            id='inputCity' />
                    </div>
                    <div className='col-12 mb-3'>
                        <button onClick={handleSubmit} type='submit' className='btn btn-dark'>
                            Create
                        </button>
                    </div>
                </form>
            </div>
    )}

}
export default ProductForm;

