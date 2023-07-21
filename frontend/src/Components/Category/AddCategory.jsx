import React, { useState,useEffect } from 'react';
import { TextField } from "@mui/material";
import {toast} from 'react-toastify'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { addCategory,reset } from '../../features/categories/categorySlice';
import Spinner from '../Spinner/Spinner';

const AddCategory = () => {
    const [category, setCategory] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isLoading,isSuccess,isError,message} = useSelector(state=>state.category)
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        if (!user) {
            navigate('/register');
        }
        if (isError) {
            toast.error(message)
        }
        if (isSuccess) {
            toast.success('Inserted Successfully')
        }
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!category) {
            alert('Please enter the requried field');
        }
        dispatch(addCategory({ category }));
    }
    if(isLoading){
        return <Spinner/>
    }
    return (
    <div style={{boxShadow:"none"}}>
        <div style={{padding:"24px"}}>
            <form action="">
                <div className="row">
                    <TextField
                    value={category}
                    onChange={(e)=>setCategory(e.target.value)}
                    type="text"
                    name="category"
                    label="Category"
                    style={{ marginBottom: "12px" }} // Add spacing here
                    />
                    <div className="col-12">
                        <button onClick={handleSubmit} type="submit" className="navbtn primary--btn">Submit</button>
                        <button className="navbtn gray--btn">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddCategory
