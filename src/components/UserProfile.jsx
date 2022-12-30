import React,{useState} from "react";
import { MdOutlineCancel } from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";

import { Button } from ".";
import { userProfileData } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import avatar from "../data/avatar.jpg";
import { Alert, AlertTitle } from '@mui/material'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
const userinfo = JSON.parse(localStorage.getItem("username"));

const UserProfile = () => {
  //-----------------notify alert----------------
  const [open, setOpen] = useState(false)


  const handleClickSuccess_xacnhandon = () => {
    setOpen(!open);
  }
  const handleClickError = () => {
    setOpen(!open);
  };
  //--------------------------------------------------------------
  const { currentColor } = useStateContext();
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("token");

    navigate("/admin/login");
    // handleClickSuccess_xacnhandon()
    window.location.reload();
  };

  return (
    <div>
      {JSON.parse(localStorage.getItem("role")) === "Admin" && (
        <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-lg dark:text-gray-200">
              Thông tin người dùng
            </p>
            <Button
              icon={<MdOutlineCancel />}
              color="rgb(153, 171, 180)"
              bgHoverColor="light-gray"
              size="2xl"
              borderRadius="50%"
            />
          </div>

          <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
            {userinfo ? (
              <>
                <img
                  className="rounded-full h-24 w-24"
                  src={avatar}
                  alt="user-profile"
                />

                <div>
                  <p className="font-semibold text-xl dark:text-gray-200">
                    {userinfo.username}
                  </p>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    {userinfo.email}
                  </p>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    {userinfo.phone}
                  </p>
                  <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
                    {userinfo.roleId}
                  </p>
                </div>
              </>
            ) : null}
          </div>
          <div>
            {/* {userProfileData.map((item, index) => (
          <div key={index} className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400"> {item.desc} </p>
            </div>
          </div>
        ))} */}
          </div>
          <div className="mt-5">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-sky-500 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={Logout}
            >
              Đăng xuất
            </button>
          </div>
        </div>
      )}
      {JSON.parse(localStorage.getItem("role")) === "Shipper" && (
        <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-lg dark:text-gray-200">
              Thông tin người dùng
            </p>
            <Button
              icon={<MdOutlineCancel />}
              color="rgb(153, 171, 180)"
              bgHoverColor="light-gray"
              size="2xl"
              borderRadius="50%"
            />
          </div>

          <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
            {userinfo ? (
              <>
                <img
                  className="rounded-full h-24 w-24"
                  src={avatar}
                  alt="user-profile"
                />

                <div>
                  <p className="font-semibold text-xl dark:text-gray-200">
                    {userinfo.username}
                  </p>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    {userinfo.email}
                  </p>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    {userinfo.phone}
                  </p>
                  <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
                    {userinfo.roleId}
                  </p>
                </div>
              </>
            ) : null}
          </div>
          <div>
            {/* {userProfileData.map((item, index) => (
          <div key={index} className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400"> {item.desc} </p>
            </div>
          </div>
        ))} */}
          </div>
          <div className="mt-5">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-sky-500 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={Logout}
            >
              Đăng xuất
            </button>
            
          </div>
          <div>
            <Dialog open={open} onClose={handleClickSuccess_xacnhandon}>
              <Alert

              //props go here
              >
                <AlertTitle>Tài khoản</AlertTitle>
                Đăng xuất thành công !!!
              </Alert>
            </Dialog>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
