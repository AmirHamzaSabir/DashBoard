import { useEffect } from 'react';
import { Link,useParams } from "react-router-dom"
import { getOrders,reset } from '../../features/order/orderSlice';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../Spinner/Spinner';

const View = () => {
  const {orders,isLoading,isError,message} = useSelector(state=>state.order)
  const dispatch = useDispatch();
useEffect(() => {
    if(isError){
      alert(message)
    }
    dispatch(getOrders())
    dispatch(reset())
  },[isError,message,dispatch])
  console.log([...orders])
  if (isLoading) {
    return <Spinner/>
  }
  return (
    <div>
      <Link to={`/user/orderdetail/${orders._id}`}>
        <button className="updateBtn me-3">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" tag="i" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0"></path><path d="M21 12c-2.4 4-5.4 6-9 6c-3.6 0-6.6-2-9-6c2.4-4 5.4-6 9-6c3.6 0 6.6 26c-3"></path></g></svg>
        </button>
      </Link> 
    </div>
  )
}

export default View
