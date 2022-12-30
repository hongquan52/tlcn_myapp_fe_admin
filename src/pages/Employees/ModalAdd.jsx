import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Selection } from "@syncfusion/ej2-react-grids";
import { EmployeeService } from "../../services/employee.service";

const ModalAdd = ({ open, onClose }) => {
  const [data, setData] = useState(EmployeeService.getAllEmployee());
  const navigate = useNavigate();
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const [nameCheck, setNameCheck] = useState(false);
  const [descriptionCheck, setDescriptionCheck] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    await EmployeeService.getAllEmployee().then((response) => {
      setData(response);
    });
  };

  const onSaveClick = async (e) => {
    e.preventDefault();
    if (
      nameRef.current.value.trim() === "" &&
      descriptionRef.current.value.trim() === ""
    ) {
      nameRef.current.focus();
      setNameCheck(true);
      setDescriptionCheck(true);
    } else if (nameRef.current.value.trim() === "") {
      nameRef.current.focus();
      setNameCheck(true);
    } else if (descriptionRef.current.value.trim() === "") {
      descriptionRef.current.focus();
      setDescriptionCheck(true);
    } else {
      const employee = {
        name: nameRef.current.value,
        description: descriptionRef.current.value,
        parentId: Number(document.getElementById("parentCategory").value),
      };
      try {
        await EmployeeService.createEmployee(employee).then(
          (response) => {
            alert("Thêm loại mới thành công!");
            navigate("/employees");

            onClose();
          },
          (error) => {
            console.log(error);
          }
        );
      } catch (e) {
        alert(e);
      }
    }
  };
  if (!open) {
    return null;
  }
  return (
    <>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-1/4 my-0 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <form
              action="#"
              className="flex w-full flex-col justify-center items-center rounded-xl border border-gray-200 relative bg-white"
            >
              <div className="flex justify-center gap-2 bg-gray-50 py-2 mb-2 text-right sm:px-6 w-full">
                <h1 className="py-4 font-bold">THÊM DANH MỤC MỚI</h1>
              </div>

              <div className="w-3/4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  <h1 className="font-bold mb-1">Tên Loại</h1>
                  <div className="mt-1">
                    <textarea
                      id="name"
                      name="name"
                      rows={3}
                      className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                      placeholder="Tên danh mục"
                      ref={nameRef}
                      onChange={(event) => {
                        if (event.target.value.trim() !== "") {
                          setNameCheck(false);
                        }
                      }}
                    />
                  </div>
                </label>
                {nameCheck && (
                  <p className="text-red-500 text-sm mb-1">
                    Vui lòng nhập tên danh mục
                  </p>
                )}
              </div>
              <div className="w-3/4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  <h1 className="font-bold mb-1">Mô tả</h1>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows={5}
                      className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                      placeholder="Mô tả về danh mục"
                      ref={descriptionRef}
                      onChange={(event) => {
                        if (event.target.value.trim() !== "") {
                          setDescriptionCheck(false);
                        }
                      }}
                    />
                  </div>
                </label>
                {descriptionCheck && (
                  <p className="text-red-500 text-sm mb-1">
                    Vui lòng nhập mô tả
                  </p>
                )}
              </div>
              <div className="w-3/4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  <h1 className="font-bold mb-1">Danh mục lớn</h1>
                  <div className="mt-1 pb-2 pt-1">
                    <Selection
                      id={"parentCategory"}
                      name={"parentCategory"}
                      data={data}
                      isDefault={true}
                    />
                  </div>
                </label>
              </div>
              <div className="flex justify-end gap-2 bg-gray-50 py-3 text-right sm:px-6 w-full mt-4">
                <button
                  className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-3 px-6 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => {
                    setDescriptionCheck(false);
                    setNameCheck(false);
                    onClose();
                  }}
                >
                  Hủy
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 py-3 px-6 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={onSaveClick}
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalAdd;
