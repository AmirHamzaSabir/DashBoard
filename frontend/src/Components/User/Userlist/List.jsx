import { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import './user.css';
import UserNav from './UserNav';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '../../../features/auth/authSlice';
import { toast } from 'react-toastify';
import Spinner from '../../Spinner/Spinner';
import UpdateorDel from './UpdateorDel';
const List = () => {
  const [data, setData] = useState([]);
  const { isLoading, isError, allUsers, message } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast(message);
    }
    dispatch(getAllUsers());

  }, []);

  useEffect(() => {
    if (allUsers?.length > 0) {
      const modifiedData = allUsers.map(user => ({
        ...user,
        role: getRoleName(Number(user.role)),
        action:<UpdateorDel id={user._id} />
      }));
      setData(modifiedData);
    }
  }, [allUsers]);

  const getRoleName = (role) => {
    switch (role) {
      case 0:
        return 'User';
      case 1:
        return 'Admin';
      case 2:
        return 'Super Admin';
      default:
        return '';
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'USER',
        muiTableHeadCellProps: { sx: { color: 'rgba(47, 43, 61, .78)' } },
        renderCell: ({ rowData }) => <span>{rowData.name}</span>
      },
      {
        accessorKey: 'email',
        header: 'EMAIL',
        muiTableHeadCellProps: { sx: { color: 'rgba(47, 43, 61, .78)' } },
        renderCell: ({ rowData }) => <span>{rowData.email}</span>
      },
      {
        accessorKey: 'role',
        header: 'ROLE',
        muiTableHeadCellProps: { sx: { color: 'rgba(47, 43, 61, .78)' } },
        renderCell: ({ rowData }) => <span>getRoleName({rowData.role})</span>
      },
      {
        accessorKey: 'm_number',
        header: 'Mobile',
        muiTableHeadCellProps: { sx: { color: 'rgba(47, 43, 61, .78)' } },
        renderCell: ({ rowData }) => <span>{rowData.m_number}</span>
      },
      {
        accessorKey: 'action',
        header: 'action',
        muiTableHeadCellProps: { sx: { color: 'rgba(47, 43, 61, .78)' } },
        renderCell: ({ rowData }) => <span>{rowData.action}</span> 
      },
    ],
    []
  );

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='layout-content'>
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='d-flex align-items-center flex-wrap gap-4 p-3'>
              <div className='d-flex gap-3'>
                <a className='create-invoice-btn' onClick={toggleSidebar} style={{ cursor: 'pointer' }}>
                  <span className='btn-prepend'>
                    <svg xmlns='http://www.w3.org/2000/svg' aria-hidden='true' role='img' tag='i' width='1em' height='1em'
                      viewBox='0 0 24 24'>
                      <path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5'
                        d='M12 5v14m-7-7h14'></path>
                    </svg>
                  </span>
                  <span className='btn-content'>Add New User</span>
                </a>
              </div>
            </div>
            <MaterialReactTable columns={columns} data={data} />
          </div>
          <UserNav isOpen={isOpen} toggle={toggleSidebar} show={false} />
        </div>
      </div>
    </div>
  );
};

export default List;