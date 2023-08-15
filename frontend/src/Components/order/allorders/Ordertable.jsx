import Header from './Header';
import { useMemo, useEffect, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../Spinner/Spinner';
import { Link, useParams } from 'react-router-dom';
import { reset } from '../../../features/order/orderSlice';
import { getOrders } from '../../../features/order/orderSlice';
import { getProducts } from '../../../features/products/productSlice';
import { getAllUsers } from '../../../features/auth/authSlice';
import orderActionIcons from '../../UiElements/orderIcons';
import { ArrowUpCircle,DollarSign,Eye, Repeat, Truck } from 'react-feather';

const Ordertable = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, isError, message } = useSelector(state => state.order);
  const { products, p_isLoading } = useSelector(state => state.product);
  const { allUsers, u_isLoading } = useSelector(state => state.auth);
  const [data, setData] = useState([]);
  useEffect(() => {
    dispatch(getOrders());
    dispatch(getProducts());
    dispatch(getAllUsers());
    dispatch(reset());
  }, [dispatch]);

  useEffect(() => {
    if (orders?.length > 0) {
      const modifiedData = orders.map((order) => ({
        ...orders,
        action: (
          <orderActionIcons  id={order._id} />
        ),
      }));
      setData(modifiedData);
    }
  }, [orders]);
  const getProductName = (product_id) => {
    const myProduct = products.find(prod => prod._id === product_id);
    return myProduct?.name || 'not loaded yet';
  };

  

  const getProductPrice = (product_id) => {
    const myProduct = products.find(prod => prod._id === product_id);
    return myProduct?.price || 'not loaded yet';
  };
  const getUserName = (user_id) => {
    const user = allUsers.find(user => user._id === user_id);
    return user?.name || 'not loaded yet';
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: '_id',
        header: 'ORDER ID',
        muiTableHeadCellProps: { sx: { color: 'rgba(47,43,61,.78)' } },
      },
      {
        accessorKey: 'product',
        header: 'PRODUCT',
        muiTableHeadCellProps: { sx: { color: 'rgba(47,43,61,.78)' } },
        Cell: ({ row }) => {
          return getProductName(row.original.product);
        },
      },
      {
        accessorKey: 'price',
        header: 'PRICE',
        muiTableHeadCellProps: { sx: { color: 'rgba(47,43,61,.78)' } },
        Cell: ({ row }) => {
          return `Rs.${getProductPrice(row.original.product)}`;
        },
      },
      {
        accessorKey: 'status',
        header: 'STATUS',
        muiTableHeadCellProps: { sx: { color: 'rgba(47,43,61,.78)' } },
      },
      {
        accessorKey: 'user',
        header: 'User',
        muiTableHeadCellProps: { sx: { color: 'rgba(47,43,61,.78)' } },
        Cell: ({ row }) => {
          return getUserName(row.original.user);
        },
      },
      {
        accessorKey: 'action',
        header: 'ACTIONS',
        muiTableHeadCellProps: { sx: { color: 'rgba(47,43,61,.78)' } },
        Cell: ({ row }) => {
          return (
            <div>
              <Link to={`/user/orderdetail/${row.original._id}`}>
                <button className="updateBtn me-3">
                  <Eye />
                </button>
              </Link>
              <Link to={`/user/order/refund/${row.original._id}`}>
                <button className="updateBtn me-3">
                  <DollarSign />
                </button>
              </Link>
              <Link to={`/user/order/shipping/${row.original._id}`}>
                <button className="updateBtn me-3">
                  <Truck />
                </button>
              </Link>
              
            </div>
          );
        },
      },
    ],
    [products, allUsers]
  );

  if (isLoading || p_isLoading || u_isLoading) {
    return <Spinner />;
  }

  return (
    <div className="col-12">
      <div className="card">
        <Header order={orders.length} />
        <MaterialReactTable columns={columns} data={orders} />
      </div>
    </div>
  );
};

export default Ordertable;
