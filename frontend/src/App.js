import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/login/Login";
import Signup from "./Components/signup/Signup";
import Main from "./Components/ForgetPass/Main";
import Dashboard from "./Components/Dashboard/Main";
import Report from "./Components/Dashboard/main/Reports/Report";
import MainContent from "./Components/Dashboard/main/MainContent";
import InvoiceTable from "./Components/Dashboard/main/invoice/InvoiceTable";
import MainInvoice from "./Components/Dashboard/main/createInvoice/MainInvoice";
import UserList from "./Components/User/UserList";
import List from "./Components/User/Userlist/List";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MainCategoryCom from "./Components/Category/MainCategoryCom";
import ResetMain from "./Components/ResetPass/ResetMain";
import MainProduct from "./Components/Products/MainProduct";
import AddProdMain from "./Components/Products/addproduct/AddProdMain";
import Order from "./Components/order/Order";
import ViewOrderDetail from "./Components/order/ViewDetails/ViewOrderDetail";
import RefundMain from "./Components/Refund/RefundMain";
import Store from "./Components/Store/Store";
import SpecificProduct from "./Components/Store/ShowProducts/SpecificProduct";
import ViewShipping from "./Components/shipping/ViewShipping";
import Upload from "./Components/InvoiceUpload/Upload";
import ProfileView from "./Components/User/UserProfile/ProfileView";
import Settings from "./Components/User/UserSetting/Settings";
import { useSelector } from "react-redux";
import { isUserLoggedIn } from "./authentication/UserAuthentication";
import Customers from "./Components/Customers";
function App() {
  console.log(isUserLoggedIn());
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Signup />} />
          <Route exact path="/forget-password" element={<Main />} />
          <Route exact path="/reset-password/:token" element={<ResetMain />} />

          {isUserLoggedIn() && (
            <>
              <Route exact path="/dashboard" element={<Dashboard />}>
                <Route index element={<MainContent />} />
                <Route path="/dashboard/report" element={<Report />} />
                <Route path="/dashboard/invoice" element={<InvoiceTable />} />
                <Route path="/dashboard/add" element={<MainInvoice />} />
              </Route>

              <Route exact path="/user" element={<UserList />}>
                <Route index element={<List />} />
                <Route path="/user/category" element={<MainCategoryCom />} />
                <Route path="/user/customer" element={<Customers />} />
                {/* <Route path='/user/category/:id' element={<Custome/>}/> */}
                <Route path="/user/product" element={<MainProduct />} />
                <Route path="/user/addproduct" element={<AddProdMain />} />
                <Route path="/user/order" element={<Order />} />
                <Route
                  path="/user/orderdetail/:id"
                  element={<ViewOrderDetail />}
                />
                <Route path="/user/refund" element={<RefundMain />} />
                <Route path="/user/orderdetail" element={<ViewOrderDetail />} />
                <Route path="/user/order/refund" element={<RefundMain />} />
                <Route path="/user/order/refund/:id" element={<RefundMain />} />
                <Route path="/user/order/shipping/:id" element={<ViewShipping />} />
                <Route path="/user/order/shipping" element={<ViewShipping />} />
                <Route path="/user/order/uploadinvoice" element={<Upload />} />
                <Route path="/user/profile" element={<ProfileView />} />
                <Route path="/user/settings" element={<Settings />} />
              </Route>

              <Route path="/store" element={<Store />} />
              <Route path="/store/product/:id" element={<SpecificProduct />} />
            </>
          )}
          {/* <Route exact path='/*' element={isUserLoggedIn() ? <Navigate to='/dashboard' /> : <Navigate to='login' />}/> */}
          <Route
            path="/*"
            element={
              isUserLoggedIn() ? (
                <Navigate to="/dashboard" />
              ) : (
                <>
                  <Navigate to="/login" />
                  
                </>
              )
            }
          />
        </Routes>
      </BrowserRouter>
      {/* <ToastContainer limit={1} /> */}
    </>
  );
}

export default App;
