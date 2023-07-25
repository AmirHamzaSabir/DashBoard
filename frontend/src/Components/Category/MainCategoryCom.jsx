import { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import UpdateorDel from '../User/Userlist/UpdateorDel';
import UserNav from '../User/Userlist/UserNav';
import '../User/Userlist/user.css';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getCategory } from '../../features/categories/categorySlice';
import Spinner from '../Spinner/Spinner';

const MainCategoryCom = () => {
  const [isLoading,setIsLoading] = useState(true)
  const { categories , isError, isSuccess, message } = useSelector(state => state.category);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
  if (isError) {
    toast.error('An error occurred');
  } else 
    setData(categories?.categories);
    setIsLoading(false);
  
}, [categories.categories,isError]);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'category',
        header: 'CATEGORY',
        muiTableHeadCellProps: { sx: { color: 'rgba(47,43,61,.78)' } },
      },
      {
        accessorKey: 'action',
        header: 'ACTIONS',
        muiTableHeadCellProps: { sx: { color: 'rgba(47,43,61,.78)' } },
        renderCell: ({ rowData }) => <UpdateorDel />
      },
    ],
    []
  );

  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  console.log(isLoading);
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='layout-content'>
      <div>
        <div className='row'>
          <div className='col-12 col-lg-8'>
            <div className='card'>
              <div className='d-flex align-items-center flex-wrap gap-4 p-3'>
                <div className='d-flex gap-3'>
                  <a className='create-invoice-btn' onClick={toggleSidebar} style={{ cursor: 'pointer' }}>
                    <span className='btn-prepend'>
                      <svg xmlns='http://www.w3.org/2000/svg' aria-hidden='true' role='img' tag='i' width='1em' height='1em' viewBox='0 0 24 24'>
                        <path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M12 5v14m-7-7h14'></path>
                      </svg>
                    </span>
                    <span className='btn-content'>Add Category</span>
                  </a>
                </div>
              </div>
              {data && data.length > 0 ? (
              <MaterialReactTable columns={columns} data={data} />
            ) : (
              <p>No data available.</p>
            )}            </div>
            <UserNav isOpen={isOpen} toggle={toggleSidebar} show={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCategoryCom;
