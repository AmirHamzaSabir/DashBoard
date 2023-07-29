import { useDispatch, useSelector } from "react-redux";
import UserNav from "./UserNav";
import { useState } from "react";
import {
  getAllUsers,
  getSingleUser,
  removeUser,
} from "../../../features/auth/authSlice";

const UpdateorDel = ({id, onEdit ,onDelete}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  // const editdata = async (id) => {
  //   toggleSidebar();
  //   if (type === "category") {
  //   } else if (type === "user") {
  //     dispatch(getSingleUser(id))
  //       .then((data) => {
  //         setCurrentUser(data.payload);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };
  // const handleDelete = async (id) => {
  //   if (type === "category") {
  //     dispatch(removeCategory(id))
  //       .then((data) => {
  //         alert("Category deleted successfully");
  //       })
  //       .catch((err) => console.log(err));
  //   } else if (type === "user") {
  //     dispatch(removeUser(id))
  //       .then((data) => {
  //         alert("User deleted successfully");
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };
  return (
    <>
      <div>
        <button onClick={() => onDelete(id)} className="updateBtn me-3">
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
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"
            />
          </svg>
        </button>
        <button onClick={() => onEdit(id)} className="updateBtn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
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
              <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1"></path>
              <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3l8.385-8.415zM16 5l3 3"></path>
            </g>
          </svg>
        </button>
      </div>
    </>
  );
};

export default UpdateorDel;
