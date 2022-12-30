import React, { useState, useEffect } from "react";
import ModalAdd from "./ModalAdd";
import { Link, useNavigate } from "react-router-dom";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
} from "@syncfusion/ej2-react-grids";

import { producttypeData } from "../../data/dummy";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { ProductTypeService } from "../../services/producttype.service";

const ProductTypes = () => {
  document.title = "Quản lý loại sản phẩm";
  const navigate = useNavigate();
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    await ProductTypeService.getAllProductType().then((response) => {
      setData(response.results.data);
    });
  };

  const deleteOnClick = async (id) => {
    await ProductTypeService.deleteProductType(id).then(
      (response) => {
        console.log(response);
        window.location.reload();
      },
      (error) => {
        alert("Đã xảy ra lỗi!!!");
      }
    );
  };
  const editProductTypeGrid = (props) => {
    return (
      <div className="flex justify-start items-center gap-2">
        <Link
          style={{ background: "#00d084" }}
          className="text-white font-bold py-2 px-6 capitalize rounded-full text-sm hover:drop-shadow-lg"
          to={`edit/${props.uid}`}
        >
          Sửa
        </Link>
        <button
          type="button"
          style={{ background: "#FF3333" }}
          className="text-white font-bold py-2 px-6 capitalize rounded-full text-sm hover:drop-shadow-lg"
          onClick={() => {
            const messageBox = window.confirm(
              "Bạn có muốn xóa loại sản phẩm " + props.name + "?"
            );
            if (messageBox) {
              deleteOnClick(props.uid);
            }
          }}
        >
          Xóa
        </button>
      </div>
    );
  };
  const productTypeGrid = [
    { type: "checkbox", width: "50" },

    {
      field: "uid",
      headerText: "ID",
      textAlign: "Center",
      width: "100",
    },
    {
      field: "code",
      headerText: "Mã loại",
      textAlign: "center",
      width: "150",
    },
    {
      field: "name",
      headerText: "Tên loại",
      textAlign: "center",
      width: "150",
    },
    {
      field: "status",
      headerText: "Trạng thái",
      textAlign: "center",
      width: "150",
    },

    {
      field: "description",
      headerText: "Hành động",
      template: editProductTypeGrid,
      width: "120",
      textAlign: "Left",
    },
  ];

  return (
    <>
      <div id="modal-category">
        <ModalAdd
          open={openModal}
          onClose={() => {
            setOpenModal(false);
          }}
        />
        {openModal && (
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        )}
      </div>

      <div className=" md:m-10 p-1 md:p-10 bg-white rounded-3xl">
        <div className="flex justify-between items-center mb-6">
          <Header title="Quản lý loại sản phẩm" category="Phân hệ Admin" />
          <Link
            to="/productTypes/new"
            style={{
              backgroundColor: currentColor,
              color: "white",
            }}
            className="font-semibold hover:drop-shadow rounded-full px-6 py-3"
          >
            <span>Thêm Loại Sản Phẩm</span>
          </Link>
        </div>
        <div id="grid-data">
          <GridComponent
            id="gridcomp"
            dataSource={data}
            allowPaging
            allowSorting
            pageSettings={{ pageSize: 10 }}
          >
            <ColumnsDirective>
              {productTypeGrid.map((item, index) => (
                <ColumnDirective key={index} {...item} />
              ))}
            </ColumnsDirective>
            <Inject
              services={[
                Resize,
                Sort,
                ContextMenu,
                Filter,
                Page,
                ExcelExport,
                Edit,
                PdfExport,
              ]}
            />
          </GridComponent>
        </div>
      </div>
    </>
  );
};

export default ProductTypes;
