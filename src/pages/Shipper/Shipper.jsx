import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ModalAdd from "./ModalAdd";

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

const Shipper = () => {
  document.title = "Quản lý đơn hàng";
  const navigate = useNavigate();
  const { currentColor } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    await OrderService.getlistShip().then((response) => {
      setData(response);
      
    });
  };
  const addressDelivery = (props) => {
    return (
      <div>{props.deliveryApartmentNumber}, 
      {props.deliveryWard}, 
      {props.deliveryDistrict}, 
      {props.deliveryProvince}</div>
      
    );
  };
  const editShipperGrid = (props) => {
    return (
      <div className="flex justify-start items-center">
        <Link
          style={{ background: "#00d084" }}
          className="text-white font-bold py-2 px-6 capitalize rounded-full text-sm hover:drop-shadow-lg"
          to={`edit/${props.id}`}
        >
          Xem đơn
        </Link>
        <button
          type="button"
          style={{ background: "#FF3333" }}
          className="text-white font-bold py-2 px-6 capitalize rounded-full text-sm hover:drop-shadow-lg"
          onClick={() => {
            const messageBox = window.confirm(
              "Bạn có muốn không nhận đơn " + props.orderCode + "?"
            );
            if (messageBox) {
              deleteOnClick(props.id);
            }
          }}
        >
          Không nhận đơn
        </button>
      </div>
    );
  };

  const shipperGrid = [
   
    {
      headerText: "Delivery ID",
      field: "id",
      textAlign: "Center",
      width: "60",
    },

    {
      headerText: "Bill ID",
      field: "billId",
      width: "60",
      textAlign: "Center",
    },
    {
      headerText: "Trạng thái",
      field: "status",
      width: "100",
      textAlign: "Center",
    },
    {
      field: "address",
      headerText: "Địa chỉ",
      template: addressDelivery,
      width: "200",
      textAlign: "Center",
    },
    {
      field: "description",
      headerText: "Hành động",
      template: editShipperGrid,
      width: "140",
      textAlign: "Center",
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
          <Header title="Quản lý đơn hàng" category="Phân hệ Shipper" />
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
              {shipperGrid.map((item, index) => (
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

export default Shipper;
