import { useMemo, useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";

import { useSelector, useDispatch } from "react-redux";
import Spinner from "../Spinner/Spinner";
import UpdateorDel from "../User/Userlist/UpdateorDel";
import Delete from "../UiElements/DeleteModal";
import SpinnerModal from "../Category/SpinnerModal";
import { getAllCustomers, getSingleCustomer } from "../../features/customer/customerSlice";
import EditCustomer from "./EditCustomer";

function Customers() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("Add Customer");
  const { isLoading, isError, customers, message } = useSelector(
    (state) => state.customers
  );
  const dispatch = useDispatch();
  const [loadingSpinner, setloadingSpinner] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setshowDelete] = useState(false);
  const [id, setId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [customer, setCustomer] = useState("");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleEdit = () => {
    setShowEdit(!showEdit);
  };
  const toggleDelete = () => {
    setshowDelete(!showDelete);
  };

  useEffect(() => {
    dispatch(getAllCustomers());
  }, [dispatch]);

  const onEdit = (id) => {
    setloadingSpinner(true);
    dispatch(getSingleCustomer(id))
      .then((data) => {
        console.log(data.payload.customer)
        setCustomer(data.payload.customer);
        setTitle("Update User");
        setShowEdit(true);
        setloadingSpinner(false);
      })
      .catch((err) => console.log(err));
  };
  const onDelete = (id) => {
    setloadingSpinner(true);
    dispatch(getSingleCustomer(id))
      .then((data) => {
        console.log(data.payload);
        setId(data.payload._id);
        setTitle("Delete User");
        setshowDelete(true);
        setloadingSpinner(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (customers?.length > 0) {
      const modifiedData = customers.map((customer) => ({
        ...customer,
        status: getStatus(customer.status),
        action: (
          <UpdateorDel onEdit={onEdit} onDelete={onDelete} id={customer._id} />
        ),
      }));
      setData(modifiedData);
    }
  }, [customers]);

  const getStatus = (status) => {
    console.log(status);
    return status ? 'active' : 'inactive';
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Customer",
        muiTableHeadCellProps: { sx: { color: "rgba(47, 43, 61, .78)" } },
        renderCell: ({ rowData }) => <span>{rowData.name}</span>,
      },
      {
        accessorKey: "email",
        header: "EMAIL",
        muiTableHeadCellProps: { sx: { color: "rgba(47, 43, 61, .78)" } },
        renderCell: ({ rowData }) => <span>{rowData.email}</span>,
      },
      {
        accessorKey: "contactNumber",
        header: "Mobile",
        muiTableHeadCellProps: { sx: { color: "rgba(47, 43, 61, .78)" } },
        renderCell: ({ rowData }) => <span>{rowData.m_number}</span>,
      },
      {
        accessorKey: "status",
        header: "Status",
        muiTableHeadCellProps: { sx: { color: "rgba(47, 43, 61, .78)" } },
        renderCell: ({ rowData }) => <span>getRoleName({rowData.role})</span>,
      },
      {
        accessorKey: "action",
        header: "action",
        muiTableHeadCellProps: { sx: { color: "rgba(47, 43, 61, .78)" } },
        renderCell: ({ rowData }) => <span>{rowData.action}</span>,
      },
    ],
    []
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="layout-content">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="d-flex align-items-center flex-wrap gap-4 p-3">
              <div className="d-flex gap-3">
                <h2>Customers</h2>
              </div>
            </div>
            <MaterialReactTable columns={columns} data={data} />
          </div>
        </div>
        {showEdit ? (
          <EditCustomer
            toggleEdit={toggleEdit}
            showEdit={showEdit}
            customer={customer}
            title={title}
          />
        ) : null}
        {showDelete ? (
          <Delete
            toggleDelete={toggleDelete}
            showDelete={showDelete}
            id={id}
            title={title}
            type={"customer"}
          />
        ) : null}
        {loadingSpinner ? <SpinnerModal /> : null}
      </div>
    </div>
  );
}
export default Customers;
