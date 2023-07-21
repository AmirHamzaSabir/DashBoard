import UserNav from "./UserNav"
import { useState } from "react";
const UpdateorDel = ({id}) => {
  
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const editdata = () => {
    toggleSidebar();

  }
  // alert(id)
  return (
    <>
    <div>
        <button onClick={() => alert("Button clicked")} className="updateBtn me-3">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" tag="i" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"></path></svg>
        </button> 
        <button onClick={() => editdata()} className="updateBtn">
        <svg xmlns="http://www.w3.org/2000/svg"  aria-hidden="true" role="img" tag="i"  width="1em" height="1em" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1"></path><path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3l8.385-8.415zM16 5l3 3"></path></g></svg>
        </button>
    </div>
    <UserNav isOpen={isOpen} toggle={toggleSidebar} show={false}/>
    </>
  )
}

export default UpdateorDel
