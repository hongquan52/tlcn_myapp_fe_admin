import React from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import {
  AiOutlineCalendar,
  AiOutlineShoppingCart,
  AiOutlineAreaChart,
  AiOutlineBarChart,
  AiOutlineStock,
} from "react-icons/ai";

import { links } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import "./Sidebar.css";

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            {/* <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <SiShopware /> <span>Shoppy</span>
            </Link> */}
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>

          <div className="mt-10">
            <p className="text-grat-400 dark:test-gray-400 m-3 mt-4 uppercase">
              Quản lý
            </p>
            <ul>
              

                  <Link to="/shipper" style={{ textDecoration: "none" }}>
                    <li>
                      <AiOutlineShoppingCart className="icon" />
                      <span>Giao hàng</span>
                    </li>
                  </Link>
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <li>
                      <AiOutlineCalendar className="icon" />
                      <span>Thống kê</span>
                    </li>
                  </Link>
                  <Link to="/orders" style={{ textDecoration: "none" }}>
                    <li>
                      <AiOutlineShoppingCart className="icon" />
                      <span>Đơn hàng</span>
                    </li>
                  </Link>
                  <Link to="/employees" style={{ textDecoration: "none" }}>
                    <li>
                      <AiOutlineCalendar className="icon" />
                      <span>Người dùng</span>
                    </li>
                  </Link>

                  <Link to="/customers" style={{ textDecoration: "none" }}>
                    <li>
                      <AiOutlineCalendar className="icon" />
                      <span>Khách hàng</span>
                    </li>
                  </Link>

                  <Link to="/products" style={{ textDecoration: "none" }}>
                    <li>
                      <AiOutlineShoppingCart className="icon" />
                      <span>Sản phẩm</span>
                    </li>
                  </Link>

                  <Link to="/brands" style={{ textDecoration: "none" }}>
                    <li>
                      <AiOutlineShoppingCart className="icon" />
                      <span>Nhãn hiệu</span>
                    </li>
                  </Link>
                  <Link to="/producttypes" style={{ textDecoration: "none" }}>
                    <li>
                      <AiOutlineShoppingCart className="icon" />
                      <span>Loại sản phẩm</span>
                    </li>
                  </Link>
            </ul>
          </div>

          
        </>
      )}
    </div>
  );
};

export default Sidebar;
