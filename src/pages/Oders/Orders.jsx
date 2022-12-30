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

import { ordersData } from "../../data/dummy";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { OrderService } from "../../services/order.service";
import { colGroup } from "@syncfusion/ej2/grids";


const Orders = () => {
  document.title = "Quản lý đơn hàng";
  const navigate = useNavigate();
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);

  
  useEffect(() => {
    
    fetchData();
  }, []);

  const fetchData = async () => {
    await OrderService.getAllOrders().then((response) => {
      setData(response);
    });
  };

  console.log("Reponse bill: ",data);

  
  const editProductGrid = (props) => {
    
    return (
      <div className="flex justify-center items-center gap-2">
        <Link
          style={{ background: "#00d084" }}
          className="text-white font-bold py-2 px-6 capitalize rounded-full text-sm hover:drop-shadow-lg"
          to={`edit/${props.billId}`}
        >
          Xem đơn
        </Link>

        {props.status === "paid" ? (
          null
        ) : (
          <button
            type="button"
            style={{ background: "#FF3333" }}
            className="text-white font-bold py-2 px-6 capitalize rounded-full text-sm hover:drop-shadow-lg"
            // onClick={deleteOnClick}
          >
            Hủy đơn
          </button>
        )}
      </div>
    );
  };
  const ordersGrid = [
    // { type: "checkbox", width: "50" },

    {
      headerText: "ID",
      field: "billId",
      width: "70",
      textAlign: "Center",
    },
    {
      headerText: "Trạng thái",
      width: "120",
      textAlign: "Center",
      field: "status",
    },
    {
      field: "paymentMethod",
      headerText: "Phương thức thanh toán",
      width: "100",
      format: "yMd",
      textAlign: "Center",
    },
    {
      headerText: "Giá trị Bill",
      field: "totalPrice",
      width: "100",
      textAlign: "Center",
    },
    {
      headerText: "Ngày tạo bill",
      field: "payDate",
      width: "70",
      textAlign: "Center",
      
    },
    {
      field: "action",
      headerText: "Hành động",
      template: editProductGrid,
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
          <Header title="Quản lý đơn hàng" category="Phân hệ Admin" />
          {/* <Link
            to="/orders/new"
            style={{
              backgroundColor: currentColor,
              color: "white",
            }}
            className="font-semibold hover:drop-shadow rounded-full px-6 py-3"
          >
            <span>Thêm Đơn hàng</span>
          </Link> */}
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
              {ordersGrid.map((item, index) => (
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
export default Orders;
