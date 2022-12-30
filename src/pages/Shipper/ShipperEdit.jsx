import React, { useState, useEffect } from "react";
import { Selection } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components";
import { Link } from "react-router-dom";
import { OrderService } from "../../services/order.service";
import { EmployeeService } from "../../services/employee.service";
import { useDataContext } from "../../contexts/DataProvider";
import { Modal, Button } from "react-bootstrap";

const ShipperEdit = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [shipper, setShipperData] = useState([]);

  const navigate = useNavigate();
  const { ordersData } = useDataContext();
  const [showModal, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    
    fetchData();
  }, [id]);
  const fetchData = async () => {
    await OrderService.getDeliveryById(id).then((response) => {

      setData(response);

    });
  };
  console.log("data user delivery: ", data)

  const deliveryId = document.getElementById("deliveryId")?.value
  const billId = document.getElementById("billId")?.value
  

  const onSave = async () => {

  };

  const Transport = async () => {
    var formdata = new FormData();
    formdata.append("status", "delivering");
    formdata.append("billId", billId);
    formdata.append("shipperId", "5");

    var requestOptions = {
      method: 'PUT',
      body: formdata,
      redirect: 'follow'
    };

    fetch(`http://localhost:8080/api/v1/delivery?deliveryId=${deliveryId}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    
    window.location.reload();
    // navigate('/shipper')
  };
  const Complete = async () => {
    var formdata = new FormData();
    formdata.append("status", "paid");
    formdata.append("billId", billId);
    formdata.append("shipperId", "5");

    var requestOptions = {
      method: 'PUT',
      body: formdata,
      redirect: 'follow'
    };

    fetch(`http://localhost:8080/api/v1/delivery?deliveryId=${deliveryId}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    
    window.location.reload();
    // navigate('/shipper')
  };
  
  return (
    <>
      <div className=" md:m-10 p-1 md:p-10 bg-white rounded-3xl">
        <div className="flex justify-between items-center mb-6">
          <Header
            title={`Đơn hàng ${data?.id}`}
            category="Thông tin chi tiết đơn hàng"
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
                            <h1 className="font-bold mb-1">Delivery ID</h1>
                            <div className="mt-1">
                              <textarea
                                id="deliveryId"
                                name="orderCode"
                                disabled
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Tên danh mục"
                                defaultValue={data.id}
                              />
                              
                            </div>
                          </label>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            <h1 className="font-bold mb-1">Bill ID</h1>
                            <div className="mt-1">
                              <textarea
                                id="billId"
                                name="customerId"
                                rows={1}
                                disabled
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Mã khách hàng"
                                defaultValue={data.billId}
                              />
                            </div>
                            <h1 className="font-bold mb-1">Trạng thái</h1>
                            <div className="mt-1">
                              <textarea
                                id="status"
                                name="customerName"
                                disabled
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Mã khách hàng"
                                defaultValue={data.status}
                              />
                            </div>
                            <h1 className="font-bold mb-1">Địa chỉ giao hàng</h1>
                            <div className="mt-1">
                              <h5>Số nhà</h5>
                              <textarea
                                id="customerName"
                                name="customerName"
                                disabled
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Mã khách hàng"
                                // defaultValue={addressDetail}
                                defaultValue={data?.deliveryApartmentNumber}
                              />
                            </div>
                            <div className="mt-1">
                              <h5>Quận</h5>
                              <textarea
                                id="customerName"
                                name="customerName"
                                disabled
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Mã khách hàng"
                                // defaultValue={addressDetail}
                                defaultValue={data?.deliveryWard}
                              />
                            </div>
                            <div className="mt-1">
                              <h5>Huyện</h5>
                              <textarea
                                id="customerName"
                                name="customerName"
                                disabled
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Mã khách hàng"
                                // defaultValue={addressDetail}
                                defaultValue={data?.deliveryDistrict}
                              />
                            </div>
                            <div className="mt-1">
                              <h5>Tỉnh</h5>
                              <textarea
                                id="customerName"
                                name="customerName"
                                disabled
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Mã khách hàng"
                                // defaultValue={addressDetail}
                                defaultValue={data?.deliveryProvince}
                              />
                            </div>
                          </label>
                        </div>
                        
                      </div>
                      <div className="flex justify-end gap-2 px-4 py-3 text-right sm:px-6">
                        <Link
                          to="/shipper"
                          className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Quay lại
                        </Link>
                        <button
                          type="button"
                          disabled={
                            data.status === "Đã xác nhận" ||
                            data.status === "Đang giao hàng" ||
                            data.status === "Đã hủy đơn" ||
                            data.status === "Chưa xác nhận" ||
                            data.status === "Hoàn tất"
                          }
                          onClick={Transport}
                          className="inline-flex justify-center rounded-md border border-transparent bg-sky-500 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Nhận đơn
                        </button>
                        {/* <button
                          type="button"
                          disabled={
                            data.status === "Chưa xác nhận" ||
                            data.status === "Đang chờ giao" ||
                            data.status === "Đang giao hàng" ||
                            data.status === "Hoàn tất"
                          }
                          className="inline-flex justify-center rounded-md border border-transparent bg-sky-500 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={onSave}
                        >
                          Lưu
                        </button> */}

                        <button
                          type="button"
                          disabled={
                            data.status === "Đang chờ giao" ||
                            data.status === "Chưa xác nhận" ||
                            data.status === "Đã xác nhận" ||
                            data.status === "Đã hủy đơn" ||
                            data.status === "Hoàn tất"
                          }
                          className="inline-flex justify-center rounded-md border border-transparent bg-sky-500 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={Complete}
                        >
                          Giao hàng
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

export default ShipperEdit;
