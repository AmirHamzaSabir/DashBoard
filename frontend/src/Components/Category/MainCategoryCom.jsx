import React, { useMemo, useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import UpdateorDel from "../User/Userlist/UpdateorDel";
import UserNav from "../User/Userlist/UserNav";
import "../User/Userlist/user.css";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getCategory,
  getSingleCategory,
} from "../../features/categories/categorySlice";
import Delete from "../UiElements/DeleteModal";
import Spinner from "../Spinner/Spinner";
import EditCategory from "./EditCategory";
import SpinnerModal from "./SpinnerModal";
import { getStatus } from "../../Functions/status";
const MainCategoryCom = () => {
  const { categories, isError, message } = useSelector(
    (state) => state.category
  );
  const dispatch = useDispatch();
  const [loadingTable, setLoadingTable] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [loadingSpinner, setloadingSpinner] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setshowDelete] = useState(false);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("Add Category");
  const [category, setCategory] = useState("");
  const [modifiedCategories, setmodifiedCategories] = useState();
  const toggleEdit = () => {
    setShowEdit(!showEdit);
  };
  const toggleDelete = () => {
    setshowDelete(!showDelete);
  };
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const onEdit = (id) => {
    setloadingSpinner(true);
    dispatch(getSingleCategory(id))
      .then((data) => {
        setCategory(data.payload);
        setTitle("Update Category");
        setShowEdit(true);
        setloadingSpinner(false);
      })
      .catch((err) => console.log(err));
  };
  const onDelete = (id) => {
    setloadingSpinner(true);
    dispatch(getSingleCategory(id))
      .then((data) => {
        console.log(data.payload._id)
        setId(data.payload._id);
        setTitle("Delete Category");
        setshowDelete(true);
        setloadingSpinner(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    if (categories?.length > 0) {
      const allCategories = categories.map((category) => ({
        ...category,
        status: getStatus(category.status),
        action: (
          <UpdateorDel onEdit={onEdit} onDelete={onDelete} id={category._id} />
        ),
      }));
      setmodifiedCategories(allCategories);
      setLoadingTable(false);
    }
  }, [categories]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "category",
        header: "CATEGORY",
        muiTableHeadCellProps: { sx: { color: "rgba(47,43,61,.78)" } },
        renderCell: ({ rowData }) => <span>{rowData.category}</span>,
      },
      {
        accessorKey: "status",
        header: "Status",
        muiTableHeadCellProps: { sx: { color: "rgba(47, 43, 61, .78)" } },
        renderCell: ({ rowData }) => <span>getRoleName({rowData.role})</span>,
      },
      {
        accessorKey: "action",
        header: "ACTIONS",
        muiTableHeadCellProps: { sx: { color: "rgba(47,43,61,.78)" } },
        renderCell: ({ rowData }) => <span>{rowData.action}</span>,
      },
    ],
    []
  );

  return (
    <div className="layout-content">
      {loadingTable ? (
        <Spinner />
      ) : (
        <div>
          <div className="row">
            <div className="col-12 col-lg-8">
              <div className="card">
                <div className="d-flex align-items-center flex-wrap gap-4 p-3">
                  <div className="d-flex gap-3">
                    <a
                      className="create-invoice-btn"
                      onClick={() => {
                        setTitle("Add Category");
                        toggleSidebar();
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <span className="btn-prepend">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="img"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M12 5v14m-7-7h14"
                          />
                        </svg>
                      </span>

                      <span className="btn-content">Add Category</span>
                    </a>
                  </div>
                </div>
                {/* <div><StickyHeadTable /></div> */}
                {modifiedCategories?.length > 0 ? (
                  <MaterialReactTable
                    columns={columns}
                    data={modifiedCategories}
                  />
                ) : (
                  <p>No data found</p>
                )}
              </div>
              <UserNav
                isOpen={isOpen}
                toggle={toggleSidebar}
                show={true}
                title={title}
                category={message}
              />
            </div>
          </div>
        </div>
      )}
      {showEdit ? (
        <EditCategory
          toggleEdit={toggleEdit}
          showEdit={showEdit}
          categoryName={category}
          title={title}
        />
      ) : null}
      {showDelete ? <Delete toggleDelete={toggleDelete} showDelete={showDelete} id={id} title={title} /> : null}
      {loadingSpinner ? <SpinnerModal /> : null}
    </div>
  );
};
export default MainCategoryCom;
