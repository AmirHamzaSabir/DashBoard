import React, { useMemo, useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import UpdateorDel from "../User/Userlist/UpdateorDel";
import UserNav from "../User/Userlist/UserNav";
import "../User/Userlist/user.css";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  removeCategory,
  getCategory,
  getSingleCategory,
} from "../../features/categories/categorySlice";
import Spinner from "../Spinner/Spinner";
import EditCategory from "./Model";
const MainCategoryCom = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { categories, isError, isSuccess, message } = useSelector(
    (state) => state.category
  );
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [title, setTitle] = useState("Add Category");
  const [category, setCategory] = useState("");
  const [modifiedCategories, setmodifiedCategories] = useState();
  const toggleEdit = () =>{
    setShowEdit(!showEdit);
  }
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const onEdit = (id) => {
    dispatch(getSingleCategory(id))
      .then((data) => {
        setCategory(data.payload);
        setTitle("Update Category");
        toggleEdit();
        
      })
      .catch((err) => console.log(err));
  };
  const onDelete = (id) => {
    dispatch(removeCategory(id))
      .then((data) => {
        alert("Category deleted successfully");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error("An error occurred");
    }
    if (categories?.length > 0) {
      const allCategories = categories.map((category) => ({
        ...category,
        action: (
          <UpdateorDel onEdit={onEdit} onDelete={onDelete} id={category._id} />
        ),
      }));
      setmodifiedCategories(allCategories);
      setIsLoading(false);
    }
  }, [categories, isError]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "category",
        header: "CATEGORY",
        muiTableHeadCellProps: { sx: { color: "rgba(47,43,61,.78)" } },
        renderCell: ({ rowData }) => <span>{rowData.category}</span>,
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
      {isLoading ? (
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
      {showEdit?<EditCategory toggleEdit={toggleEdit} showEdit={showEdit} categoryName={category}/> : null}
    </div>
  );
};
export default MainCategoryCom;
