import Header from './Header';
import { useMemo, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../Spinner/Spinner';
import { Link, useParams } from 'react-router-dom';
import { reset } from '../../../features/order/orderSlice';
import { getOrders } from '../../../features/order/orderSlice';
import { getProducts } from '../../../features/products/productSlice';
import { getAllUsers } from '../../../features/auth/authSlice';

const Ordertable = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, isError, message } = useSelector(state => state.order);
  const { products, p_isLoading } = useSelector(state => state.product);
  const { allUsers, u_isLoading } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getOrders());
    dispatch(getProducts());
    dispatch(getAllUsers());
    dispatch(reset());
  }, [dispatch]);

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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    tag="i"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    >
                      <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0"></path>
                      <path d="M21 12c-2.4 4-5.4 6-9 6c-3.6 0-6.6-2-9-6c2.4-4 5.4-6 9-6c3.6 0 6.6 26c-3"></path>
                    </g>
                  </svg>
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
