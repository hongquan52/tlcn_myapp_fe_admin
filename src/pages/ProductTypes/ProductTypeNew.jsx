import React, { useState, useEffect } from "react";
import { Selection } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components";
import { Link } from "react-router-dom";
import { ProductTypeService } from "../../services/producttype.service";
import { useDataContext } from "../../contexts/DataProvider";
import { producttypeData } from "../../data/dummy";

const ProductTypeNew = () => {
  const navigate = useNavigate();

  const onSave = async () => {
    const producttype = {
      code: document.getElementById("code").value,
      name: document.getElementById("name").value,
      status: true,
    };
    console.log(producttype);
    await ProductTypeService.createProductType(producttype).then(
      (response) => {
        console.log(response);
        navigate("/productTypes");
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
            title={`Loại sản phẩm mới `}
            category="Thêm thông tin loại sản phẩm"
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
                            <h1 className="font-bold mb-1">Mã loại sản phẩm</h1>
                            <div className="mt-1">
                              <textarea
                                id="code"
                                name="code"
                                rows={2}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Mã loại sản phẩm"
                              />
                            </div>
                          </label>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            <h1 className="font-bold mb-1">
                              Tên loại sản phẩm
                            </h1>
                            <div className="mt-1">
                              <textarea
                                id="name"
                                name="name"
                                rows={3}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Tên loại sản phẩm"
                              />
                              <h1 className="font-bold mb-1">
                                Trạng thái loại sản phẩm
                              </h1>

                              <textarea
                                id="status"
                                name="status"
                                rows={3}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Trạng thái loại sản phẩm"
                              />
                            </div>
                          </label>
                        </div>
                        <div>
                          {/* <label className="block text-sm font-medium text-gray-700">
                            <h1 className="font-bold mb-1">Danh mục lớn</h1>
                            <div className="mt-1 pb-2 pt-1">
                              <Selection
                                id={"parentCategory"}
                                name={"parentCategory"}
                                data={producttypeData}
                                parentId={data?.parentId}
                                isDefault={true}
                              />
                            </div>
                          </label> */}
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 px-4 py-3 text-right sm:px-6">
                        <Link
                          to="/productTypes"
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

export default ProductTypeNew;
