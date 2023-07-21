    import React, { useState, useEffect } from 'react';
    import { useDispatch, useSelector } from 'react-redux';
    import { getProducts } from '../../../features/products/productSlice';
    import Spinner from '../../Spinner/Spinner';
    import { Link } from 'react-router-dom';
    import { getCategory } from '../../../features/categories/categorySlice';
    import Form from './Form';

    const ViewAllProduct = () => {
    const [formFields, setFormFields] = useState({
        product: '',
    });
    const [product, setProduct] = useState([]);
    const [cats, setCats] = useState([]);
    const dispatch = useDispatch();
    const { products, isLoading } = useSelector(state => state.product);
    const { categories } = useSelector(state => state.category);

    useEffect(() => {
        dispatch(getCategory());
        dispatch(getProducts());
    }, [dispatch]);

    useEffect(() => {
        setProduct(products);
        setCats(categories.categories);
    }, [products, categories]);

    const handleProductChange = (productId, productName) => {
        setFormFields({ ...formFields, product: productId, productName: productName });
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className='col-12'>
        <div className="card">
            <div className="row p-24">
            <div className="col-12">
                <h2>Products</h2>
                <hr />
            </div>
            <form>
                {product.map((item, index) => {
                return (
                    <div key={index} className="col-12 col-md-4 col-lg-4" style={{ cursor: 'pointer' }}>
                    <Form item={item} formFields={formFields} setFormFields={setFormFields} onItemSelected={handleProductChange} />
                    </div>
                );
                })}
            </form>
            </div>
        </div>
        </div>
    );
    }

    export default ViewAllProduct;
