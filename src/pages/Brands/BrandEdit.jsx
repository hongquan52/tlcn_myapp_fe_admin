import React, { useState, useEffect } from "react";
import { Selection } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components";
import { Link } from "react-router-dom";
import { BrandService } from "../../services/brand.service";
import { useDataContext } from "../../contexts/DataProvider";

const BrandEdit = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const { brandsData } = useDataContext();
  useEffect(() => {
    const fetchData = async () => {
      await BrandService.getBrandById(id).then((response) => {
        setData(response.data.results);
        console.log(response);
      });
    };
    fetchData();
  }, [id]);
  const onSave = async () => {
    const brand = {
      code: document.getElementById("code").value,
      name: document.getElementById("name").value,
      status: true,
      image: document.getElementById("image").value,
    };
    console.log(brand);
    await BrandService.updateBrand(id, brand).then(
      (response) => {
        console.log(response);
        navigate("/brands");
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
            title={`Nhãn hiệu  ${data.name}`}
            category="Chỉnh sửa thông tin nhãn hiệu"
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
                            <h1 className="font-bold mb-1">Mã nhãn hiệu</h1>
                            <div className="mt-1">
                              <textarea
                                id="code"
                                name="code"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nhập mã nhãn hiệu"
                                defaultValue={data.code}
                              />
                              <h1 className="font-bold mb-1">Tên nhãn hiệu</h1>
                              <textarea
                                id="name"
                                name="name"
                                rows={2}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nhập tên nhãn hiệu"
                                defaultValue={data.name}
                              />
                              <h1 className="font-bold mb-1">
                                Trạng thái nhãn hiệu
                              </h1>

                              <textarea
                                id="status"
                                name="status"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Trạng thái nhãn hiệu"
                                defaultValue={data.status}
                              />
                              <h1>Hình ảnh</h1>
                              <label className="block">
                                <span className="sr-only">Chọn file</span>
                                {/* <input
                                  type="file"
                                  className="image block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                                  multiple="multiple"
                                  id="image"
                                /> */}
                                <textarea
                                  id="image"
                                  name="image"
                                  rows={3}
                                  className="image mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                  placeholder="Nhập link hình ảnh"
                                  defaultValue={data.image}
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
                              </label>
                            </div>
                          </label>
                        </div>
                        <div></div>
                        <div></div>
                      </div>
                      <div className="flex justify-end gap-2 px-4 py-3 text-right sm:px-6">
                        <Link
                          to="/brands"
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

export default BrandEdit;
