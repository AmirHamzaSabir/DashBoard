import AddCategory from "../../Category/AddCategory";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
const UserNav = ({ isOpen, toggle, show, data, title ,category}) => {
  const callRequiredForm = () => {
    let componentToRender;
    switch (title) {
      case "Add User":
        componentToRender= isOpen?<AddUser show={show}/> : null;
        console.log(title);
        break;
      case "Update User":
        componentToRender =isOpen ? <EditUser toggle={toggle} show={show}/> :null;
        console.log(title);
        break;
      case "Add Category":
        componentToRender = isOpen ? <AddCategory toggle={toggle} show={show}/> :null;
        break;
      case "Update Category":
        componentToRender= isOpen ? <AddCategory toggle={toggle} show={show} category={category}/> :null;

        break;
      default:
        componentToRender= isOpen ? <AddUser toggle={toggle} show={show} /> :null;
    }

    return <>{componentToRender}</>;
  };
  return (
    <div className={` ${isOpen ? "addingUser--nav show" : "addingUser--nav"} `}>
      <div className="usernav-content">
        <div className="align-items-center nav-header">
          <h3
            className="mb-0"
            style={{
              fontSize: "1.375rem",
              fontWeight: "500",
              color: "rgba(47,43,61,.78)",
            }}
          >
            {title}
          </h3>
          <div className="flex-grow-1"></div>
          <button type="button" className="crossbtn" onClick={toggle}>
            <span className="btn-content">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                tag="i"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M18 6L6 18M6 6l12 12"
                ></path>
              </svg>
            </span>
          </button>
        </div>
        {callRequiredForm()}
      </div>
    </div>
  );
};

export default UserNav;
