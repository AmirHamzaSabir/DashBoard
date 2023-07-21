import React, { useMemo,useEffect } from 'react'
import { MaterialReactTable } from 'material-react-table'
import { Link } from 'react-router-dom';
import UpdateorDel from '../../../User/Userlist/UpdateorDel';
import { getInvoice, reset } from '../../../../features/invoice/invoiceSlice';
import { useDispatch, useSelector } from 'react-redux';
const Tablee = () => {
  const dispatch = useDispatch()
  const {i_isLoading,invoice,isError,message} = useSelector(state=>state.invoice)
  useEffect(() => {
    if (isError) {
      alert('An Error Occured')
    }
    dispatch(getInvoice());
    dispatch(reset());
  },[])
    const columns = useMemo(
        () => [
          {
            accessorKey: "_id",
            header: "#ID",
            muiTableHeadCellProps: {sx:{color:"rgba(47,43,61,.78)"}}
          },
          {
            accessorKey:'cost',
            header: "TOTAL",
            muiTableHeadCellProps: {sx:{color:"rgba(47,43,61,.78)"}}
          },
          {
            accessorKey:'issueDate',
            header: "ISSUE-DATE",
            muiTableHeadCellProps: {sx:{color:"rgba(47,43,61,.78)"}}
          },
          {
            accessorKey:'dueDate',
            header: "DUE-DATE",
            muiTableHeadCellProps: {sx:{color:"rgba(47,43,61,.78)"}}
          },
          {
            accessorKey:'action',
            header: "ACTIONS",
            muiTableHeadCellProps: {sx:{color:"rgba(47,43,61,.78)"}}
          }
        ],
        []
      );
  return (
    <div className='col-12 col-lg-8 mb-4'>  
        <div className='card h-100 w-100'>
            <div className='d-flex align-items-center flex-wrap gap-4 p-3'>
                <div className='d-flex gap-3'>
                    <Link to="/dashboard/add" className='create-invoice-btn'>
                        <span className='btn-prepend'>
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" tag="i" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 5v14m-7-7h14"></path>
                            </svg>
                        </span>
                        <span className='btn-content'>Create invoice</span>
                    </Link>
                </div>
            </div>
            <MaterialReactTable columns={columns} data={invoice}/>
        </div>
    </div>
  )
}

export default Tablee
