import React, { useState, useEffect } from "react";
import { Selection } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components";
import { Link } from "react-router-dom";
import { EmployeeService } from "../../services/employee.service";
import { useDataContext } from "../../contexts/DataProvider";

const EmployeeNew = () => {
  const navigate = useNavigate();

  const onSave = async () => {
    const employee = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      status: true,
      avatar: document.getElementById("avatar").value,
      roleId: document.getElementById("roleId").value,
    };
    console.log(employee);
    await EmployeeService.createEmployee(employee).then(
      (response) => {
        console.log(response);
        navigate("/employees");
      },
      (error) => {
        alert("Đã xảy ra lỗi!!!");
      }
    );
  };

  return (
    <>
      <div className=" md:m-10 p-1 md:p-10 bg-white rounded-3xl">
        <div className="flex justify-between items-center mb-6">
          <Header
            title={`Người dùng mới `}
            category="Tạo thông tin người dùng"
          />
        </div>
        <div className="flex justify-center items-center bg-gray-50 ">
          <div className="w-full">
            <div>
              <div className="md:col-span-2 md:mt-0">
                <div className="sm:overflow-hidden sm:rounded-md">
                  <div className="space-y-6 bg-white rounded-x">
                    <div>
                      <div className="py-2 flex flex-col gap-2 ">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            <h1 className="font-bold mb-1">
                              Tài khoản người dùng
                            </h1>
                            <div className="mt-1">
                              <textarea
                                id="username"
                                name="username"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nhập tài khoản"
                                // defaultValue={data.name}
                              />
                              <h1 className="font-bold mb-1">Password</h1>
                              <input
                                id="password"
                                name="password"
                                type="password"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nhập password"
                                // defaultValue={data.price}
                              />
                              <h1 className="font-bold mb-1">Email</h1>

                              <textarea
                                id="email"
                                name="email"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nhập email"
                                // defaultValue={data.status}
                              />
                              <h1 className="font-bold mb-1">Số điện thoại</h1>

                              <textarea
                                id="phone"
                                name="phone"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nhập số điện thoại"
                                // defaultValue={data.discount}
                              />
                              <textarea
                                id="status"
                                name="status"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Trạng thái người dùng"
                                defaultValue={true}
                              />
                              <h1>Hình ảnh</h1>
                              <textarea
                                id="avatar"
                                name="avatar"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nhập link hình ảnh"
                                //defaultValue={data.avatar}
                              />
                              <h1 className="font-bold mb-1">
                                Vai trò người dùng
                              </h1>
                              <textarea
                                id="roleId"
                                name="roleId"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nhập Vai trò người dùng"
                                // defaultValue={data.status}
                              />
                            </div>
                          </label>
                        </div>

                        <div></div>
                      </div>
                      <div className="flex justify-end gap-2 px-4 py-3 text-right sm:px-6">
                        <Link
                          to="/employees"
                          className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Hủy
                        </Link>
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-sky-500 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={onSave}
                        >
                          Lưu
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeNew;
