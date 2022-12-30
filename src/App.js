import React, { useEffect } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import {
  Ecommerce,
  Orders,
  Calendar,
  Employees,
  Stacked,
  Pyramid,
  Customers,
  Kanban,
  Line,
  Area,
  Bar,
  Pie,
  Financial,
  ColorPicker,
  ColorMapping,
  Editor,
  Brands,
  Products,
  ProductTypes,
} from "./pages";
import "./App.css";

import { useStateContext } from "./contexts/ContextProvider";
import ProductEdit from "./pages/Products/ProductEdit";
import ProductTypeEdit from "./pages/ProductTypes/ProductTypeEdit";
import ProductNew from "./pages/Products/ProductNew";
import ProductTypeNew from "./pages/ProductTypes/ProductTypeNew";
import CustomerNew from "./pages/Customers/CustomerNew";
import EmployeeNew from "./pages/Employees/EmployeeNew";
import BrandNew from "./pages/Brands/BrandNew";
import BrandEdit from "./pages/Brands/BrandEdit";
import EmployeeEdit from "./pages/Employees/EmployeeEdit";
import CustomerEdit from "./pages/Customers/CustomerEdit";
import OrderNew from "./pages/Oders/OrderNew";
import Shipper from "./pages/Shipper/Shipper";
import Login from "./pages/Login/Login";
import OrderEdit from "./pages/Oders/OrderEdit";
import ShipperEdit from "./pages/Shipper/ShipperEdit";

const App = () => {

  
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    
      <div className={currentMode === "Dark" ? "dark" : ""}>
        <BrowserRouter>
          <div className="flex relative dark:bg-main-dark-bg">
            <div className="fixed right-4 bottom-4" s style={{ zIndex: "1000" }}>
              <TooltipComponent content="Settings" position="Top">
                <button
                  type="button"
                  onClick={() => setThemeSettings(true)}
                  style={{ background: currentColor, borderRadius: "50%" }}
                  className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                >
                  <FiSettings />
                </button>{" "}
              </TooltipComponent>{" "}
            </div>{" "}
            {activeMenu ? (
              <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                <Sidebar />
              </div>
            ) : (
              <div className="w-0 dark:bg-secondary-dark-bg">
                <Sidebar />
              </div>
            )}{" "}
            <div
              className={
                activeMenu
                  ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                  : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
              }
            >
              <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                <Navbar />
              </div>{" "}
              <div>
                {" "}
                {themeSettings && <ThemeSettings />}{" "}
                <Routes>
                  {/* <Route path="/admin/login" element={<Login />} />{" "} */}
                  <Route path="/" element={<Ecommerce />} />{" "}
                  <Route path="/ecommerce" element={<Ecommerce />} />{" "}
                  <Route path="/shipper" element={<Shipper />} />{" "}
                  <Route path="/shipper/edit/:id" element={<ShipperEdit />} />{" "}
                  <Route path="/orders" element={<Orders />} />{" "}
                  <Route path="/orders/new" element={<OrderNew />} />{" "}
                  <Route path="/orders/edit/:id" element={<OrderEdit />} />{" "}
                  <Route path="/employees" element={<Employees />} />{" "}
                  <Route path="/employees/new" element={<EmployeeNew />} />{" "}
                  <Route path="/employees/edit/:id" element={<EmployeeEdit />} />{" "}
                  <Route path="/customers" element={<Customers />} />{" "}
                  <Route path="/customers/edit/:id" element={<CustomerEdit />} />{" "}
                  <Route path="/customers/new" element={<CustomerNew />} />{" "}
                  <Route path="/brands" element={<Brands />} />{" "}
                  <Route path="/brands/edit/:id" element={<BrandEdit />} />{" "}
                  <Route path="/brands/new" element={<BrandNew />} />{" "}
                  <Route path="/products" element={<Products />} />{" "}
                  <Route path="/products/new" element={<ProductNew />} />{" "}
                  <Route path="/products/edit/:id" element={<ProductEdit />} />{" "}
                  <Route path="/productTypes" element={<ProductTypes />} />{" "}
                  <Route path="/productTypes/new" element={<ProductTypeNew />} />{" "}
                  <Route
                    path="/productTypes/edit/:id"
                    element={<ProductTypeEdit />}
                  />{" "}
                  </Routes>{" "}
              </div>{" "}
              <Footer />
            </div>{" "}
          </div>{" "}
        </BrowserRouter>{" "}
      </div>
    
  );
  
};

export default App;
