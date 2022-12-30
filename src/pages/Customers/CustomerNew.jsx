import React, { useState, useEffect } from "react";
import { Selection } from "@syncfusion/ej2/buttons";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components";
import { Link } from "react-router-dom";
import { CustomerService } from "../../services/customer.service";
import { useDataContext } from "../../contexts/DataProvider";
import { ComboBox } from "@syncfusion/ej2/dropdowns";

const CustomerNew = () => {
  const navigate = useNavigate();

  const onSave = async () => {
    const customer = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      dateOfBirth: document.getElementById("dateOfBirth").value,
      sex: document.getElementById("sex").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      status: true,
      avatar: document.getElementById("avatar").value,
      address: [
        {
          street: document.getElementById("street").value,
          province: document.getElementById("province").value,
          district: document.getElementById("district").value,
          ward: document.getElementById("ward").value,
          status: true,
        },
      ],
    };
    console.log(customer);
    await CustomerService.createCustomer(customer).then(
      (response) => {
        console.log(response);
        navigate("/customers");
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
            title={`Khách hàng mới`}
            category="Tạo thông tin khách hàng"
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
                            <h1 className="font-bold mb-1">Tài khoản</h1>
                            <div className="mt-1">
                              <textarea
                                id="username"
                                name="username"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nhập Tài khoản"
                                // defaultValue={data.name}
                              />
                              <h1 className="font-bold mb-1">Password</h1>
                              <input
                                id="password"
                                name="password"
                                type="password"
                                rows={3}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nhập password"
                                // defaultValue={data.price}
                              />
                              <h1 className="font-bold mb-1">Tên</h1>

                              <textarea
                                id="firstName"
                                name="firstName"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nhập tên"
                                // defaultValue={data.status}
                              />
                              <h1 className="font-bold mb-1">Họ</h1>

                              <textarea
                                id="lastName"
                                name="lastName"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nhập họ"
                                // defaultValue={data.status}
                              />
                              <h1 className="font-bold mb-1">Ngày sinh</h1>

                              <textarea
                                id="dateOfBirth"
                                name="dateOfBirth"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Ngày sinh"
                                // defaultValue={data.discount}
                              />
                              <h1 className="font-bold mb-1">Giới tính</h1>

                              <textarea
                                id="sex"
                                name="sex"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nhập giới tính"
                                // defaultValue={data.discount}
                              />

                              <h1 className="font-bold mb-1">Số điện thoại</h1>

                              <textarea
                                id="phone"
                                name="phone"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nhập số điện thoại"
                                // defaultValue={data.discountPrice}
                              />
                              <h1 className="font-bold mb-1">Email</h1>

                              <textarea
                                id="email"
                                name="email"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nhập email"
                                // defaultValue={data.expiryDate}
                              />
                              <h1 className="font-bold mb-1">
                                Trạng thái người dùng
                              </h1>

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
                              <h1 className="font-bold mb-1">Địa chỉ</h1>
                              <h1 className="font-bold mb-1">Đường</h1>
                              <textarea
                                id="street"
                                name="street"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nhập đường"
                                // defaultValue={data.expiryDate}
                              />
                              <h1 className="font-bold mb-1">Tỉnh/Thành phố</h1>
                              <textarea
                                id="province"
                                name="province"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nhập tỉnh/thành phố"
                                // defaultValue={data.expiryDate}
                              />
                              <h1 className="font-bold mb-1">Quận/Huyện</h1>
                              <textarea
                                id="district"
                                name="district"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nhập quận/huyện"
                                // defaultValue={data.expiryDate}
                              />
                              <h1 className="font-bold mb-1">Phường</h1>
                              <textarea
                                id="ward"
                                name="ward"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nhập phường"
                                // defaultValue={data.expiryDate}
                              />
                              <h1 className="font-bold mb-1">Trạng thái</h1>

                              <textarea
                                id="status1"
                                name="status1"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Trạng thái "
                                defaultValue={true}
                              />

                              {/* {data.image &&
                                    data.image.map((item) => {
                                      <img
                                        className="image"
                                        src={item}
                                        key={item}
                                        alt=""
                                      />;
                                    })} */}
                            </div>
                          </label>
                        </div>
                        <div>
                          {/* <label className="block text-sm font-medium text-gray-700">
                                <h1 className="font-bold mb-1">Mô tả</h1>
                                <div className="mt-1">
                                  <textarea
                                    id="description"
                                    name="description"
                                    rows={5}
                                    className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                    placeholder="Mô tả về danh mục"
                                    defaultValue={data.status}
                                  />
                                </div>
                              </label> */}
                        </div>
                        <div>
                          {/* <label className="block text-sm font-medium text-gray-700">
                                <h1 className="font-bold mb-1">Danh mục lớn</h1>
                                <div className="mt-1 pb-2 pt-1">
                                  <Selection
                                    id={"parentCategory"}
                                    name={"parentCategory"}
                                    data={data}
                                    parentId={data.parentId}
                                    isDefault={true}
                                  />
                                </div>
                              </label> */}
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 px-4 py-3 text-right sm:px-6">
                        <Link
                          to="/customers"
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

export default CustomerNew;
