import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { postOrder, reset } from '../../../features/order/orderSlice';
import Spinner from '../../Spinner/Spinner';

const Form = ({ item }) => {
  const { isLoading, isSuccess, isError, message } = useSelector(state => state.order);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      alert(message);
      dispatch(reset());
    }
    if (isSuccess) {
      dispatch(reset());
    }
  }, [isError, isSuccess, message]);

  const handleSubmit = async (e) => {
    console.log(item)
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/payments/charge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item: {...item,quantity:1},
        }),
      });
      const data = await response.json();
      window.location.assign(data.url);

      const product = item._id;
      const user_id = user.id;
      const orderData = {
        product,
        user: user_id,
      };
      dispatch(postOrder(orderData));
    } catch (error) {
      console.error('Error:', error);
      // Handle error and display an error message to the user
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Link style={{ textDecoration: 'none' }}>
        <div className="card w-100 h-100" style={{ width: '18rem' }}>
          <img
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            src={item.image}
            className="card-img-top p-1 rounded w-100 h-100"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <input type="hidden" value={item._id} />
            <p className="card-text"></p>
            <button onClick={handleSubmit} type="submit" className="btn btn-dark">
              PKR {item.price}
            </button>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Form;
