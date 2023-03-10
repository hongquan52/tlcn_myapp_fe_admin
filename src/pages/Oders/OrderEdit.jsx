import React, { useState, useEffect } from "react";
import { Selection } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components";
import { Link } from "react-router-dom";
import { OrderService } from "../../services/order.service";
import { EmployeeService } from "../../services/employee.service";
import { useDataContext } from "../../contexts/DataProvider";
import { Modal, Button } from "react-bootstrap";

import { Alert, AlertTitle } from '@mui/material'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle ,
Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { AddressService } from "../../services/address.service";

const OrderEdit = () => {
  const [mashipper, setMashipper] = useState();

  const handleChange = (event) => {
    setMashipper(event.target.value);
  };
  //------------------------------notify alert choose--------------------------------
  const [openNotify, setOpenNotify] = React.useState(false);

  const handleClickOpenNotify = () => {
    setOpenNotify(true);

  };


  const handleCloseNotify = () => {
    setOpenNotify(false);
  };
  //-----------------notify alert----------------
  const [open, setOpen] = useState(false)

  const handleClickSuccess_luuthongtin = () => {
    setOpen(!open);
  };
  const handleClickSuccess_xacnhandon = () => {
    setOpen(!open);
  }
  const handleClickError = () => {
    setOpen(!open);
  };
  //--------------------------------------------------------------
  const { id } = useParams();
  const [data, setData] = useState({});
  const [shipperData, setShipperData] = useState([]);
  const [addressData, setAddressData] = useState([])

  const navigate = useNavigate();
  const { ordersData } = useDataContext();
  const [showModal, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    const fetchData = async () => {
      await OrderService.getOrderById(id).then((response) => {

        setData(response);

        EmployeeService.getAllEmployee().then((response) => {

          setShipperData(response);

          AddressService.getAddressByUser().then((response) => {
            setAddressData(response)
          });
        });
      });
    };
    fetchData();
  }, [id]);

  console.log("List shipper: ", shipperData);
  console.log("getBillById: ", data);
  console.log("address user: ", addressData);

  const billId = document.getElementById("billId")?.value
  const addressId = document.getElementById("addressId")?.value
  const userName = document.getElementById("userName")?.value
  const paymentMethod = document.getElementById("paymentMethod")?.value
  const status = document.getElementById("status")?.value
  const totalPrice = document.getElementById("totalPrice")?.value
  const payDate = document.getElementById("payDate")?.value
  const shipperId = document.getElementById("shipperId")?.value

  const onSave = async () => {

    console.log(order);
    await OrderService.updateOrder(id, order).then(
      (response) => {
        console.log(response);
        // navigate("/orders");
        handleClickSuccess_luuthongtin()
      },
      (error) => {

      }
    );
  };
  const deleteOnClick = async () => {
    const order3 = {
      status: "cancelled",
    };

    await OrderService.updateStatusOrderCancel(id, order3).then(
      (response) => {
        console.log(response);
        // navigate("/orders");
        handleClickSuccess_xacnhandon();
      },
      (error) => {
        handleClickError();
      }
    );

  };

  const upApproved = async () => {

    var formdata = new FormData();
    formdata.append("status", "confirmed");
    formdata.append("paymentMethod", paymentMethod);
    formdata.append("payDate", "2022/12/15");

    var requestOptions = {
      method: 'PUT',
      body: formdata,
      redirect: 'follow'
    };

    fetch(`http://localhost:8080/api/v1/bill?billId=${billId}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    window.location.reload();
  };
  const readyToShip = async () => {

    
    // create new delivery
    var formdata = new FormData();
    formdata.append("status", "ready_to_delivery");
    formdata.append("billId", billId);
    formdata.append("shipperId", mashipper);
    formdata.append("addressId", addressId);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("http://localhost:8080/api/v1/delivery", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    
      // update status of bill
    var formdata = new FormData();
    formdata.append("status", "ready_to_delivery");
    formdata.append("paymentMethod", paymentMethod);
    formdata.append("payDate", "2022/12/30");

    var requestOptions = {
      method: 'PUT',
      body: formdata,
      redirect: 'follow'
    };

    fetch(`http://localhost:8080/api/v1/bill?billId=${billId}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    window.location.reload();
  };

  return (
    <>
      <div className=" md:m-10 p-1 md:p-10 bg-white rounded-3xl">
        <div className="flex justify-between items-center mb-6">
          <Header
            title={`????n h??ng ${data.billId}`}
            category="Th??ng tin chi ti???t ????n h??ng"
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
                            <h1 className="font-bold mb-1">M?? ????n h??ng</h1>
                            <div className="mt-1">
                              <textarea
                                id="billId"
                                name="orderCode"
                                disabled
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="T??n danh m???c"
                                defaultValue={data.billId}
                              />
                              {/* tr???ng th??i ????n h??ng */}
                              <h1 className="font-bold mb-1">Tr???ng th??i ????n h??ng</h1>
                              <select
                                id="status"
                                name="status"
                                defaultValue={data.status}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                              >

                                <option

                                  value={data.status}
                                  style={{ fontSize: "24px" }}
                                >
                                  {data.status}
                                </option>
                                <option

                                  value="confirmed"
                                  style={{ fontSize: "24px" }}
                                >
                                  confirmed
                                </option>
                                <option

                                  value="delivering"
                                  style={{ fontSize: "24px" }}
                                >
                                  delivering
                                </option>
                                <option

                                  value="paid"
                                  style={{ fontSize: "24px" }}
                                >
                                  paid
                                </option>
                                <option

                                  value="canceled"
                                  style={{ fontSize: "24px" }}
                                >
                                  canceled
                                </option>
                                <option

                                  value="ready_to_delivery"
                                  style={{ fontSize: "24px" }}
                                >
                                  ready_to_delivery
                                </option>
                                <option

                                  value="waiting_confirm"
                                  style={{ fontSize: "24px" }}
                                >
                                  waiting_confirm
                                </option>


                              </select>

                            </div>
                          </label>
                        </div>
                        <div>

                          <Dialog
                            open={openNotify}
                            onClose={handleCloseNotify}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          // TransitionComponent={Transition}
                          >
                            <DialogTitle id="alert-dialog-title">
                              {"????n h??ng"}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                B???n c?? ch???c mu???n h???y ????n h??ng ?
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleCloseNotify}>H???y</Button>
                              <Button onClick={handleCloseNotify}>
                                <span onClick={deleteOnClick}>?????ng ??</span>
                              </Button>
                            </DialogActions>
                          </Dialog>

                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">

                            <h1 className="font-bold mb-1">T??n kh??ch h??ng</h1>
                            <div className="mt-1">
                              <textarea
                                id="userName"
                                name="customerName"
                                disabled
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="M?? kh??ch h??ng"
                                defaultValue={data.userName}
                              />
                            </div>
                            <h1 className="font-bold mb-1">Ph????ng th???c thanh to??n</h1>
                            <div className="mt-1">
                              <textarea
                                id="paymentMethod"
                                name="customerName"
                                disabled
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Ph????ng th???c thanh to??n"
                                defaultValue={data.paymentMethod}
                              />
                            </div>

                            <h1 className="font-bold mb-1">Pay date</h1>
                            <div className="mt-1">
                              <textarea
                                id="payDate"
                                name="street"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nh???p ???????ng"
                                defaultValue={data.payDate}
                              />
                            </div>
                          </label>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            <div className="mt-1 pb-2 pt-1">
                              
                              {
                                addressData.map((item) => {
                                  if (item.defaultAddress === true) {

                                    return (
                                      <>
                                      <h5 className="font-bold mb-1">M?? ?????a ch???</h5>
                                      <textarea
                                        id="addressId"
                                        name="street"
                                        rows={1}
                                        className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                        placeholder="Nh???p ???????ng"
                                        defaultValue={item.address.id}
                                      />
                                      <h5 className="font-bold mb-1">S??? nh??</h5>
                                      <textarea
                                        id="street"
                                        name="street"
                                        rows={1}
                                        className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                        placeholder="Nh???p ???????ng"
                                        defaultValue={item.address.apartmentNumber}
                                      />
                                      <h5 className="font-bold mb-1">Ph?????ng</h5>
                                      <textarea
                                        id="province"
                                        name="province"
                                        rows={1}
                                        className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                        placeholder="Nh???p t???nh/th??nh ph???"
                                        defaultValue={item.address.ward}
                                      />
                                      <h5 className="font-bold mb-1">Qu???n/Huy???n</h5>
                                      <textarea
                                        id="district"
                                        name="district"
                                        rows={1}
                                        className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                        placeholder="Nh???p qu???n/huy???n"
                                        defaultValue={item.address.district}
                                      />
                                      <h5 className="font-bold mb-1">T???nh / Th??nh ph???</h5>
                                      <textarea
                                        id="ward"
                                        name="ward"
                                        rows={1}
                                        className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                        placeholder="Nh???p ph?????ng"
                                        defaultValue={item.address.province}
                                      />
                                      </>
                                    )
                                  }
                                })
                              }
                              <h1 className="font-bold mb-1">T???ng gi??</h1>

                              <textarea
                                id="totalPrice"
                                name="total"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nh???p t???ng gi?? ????n h??ng"
                                defaultValue={data.totalPrice}
                              />

                              <h1 className="font-bold mb-1">
                                Vui l??ng ch???n shipper
                              </h1>
                              <Box sx={{ minWidth: 200 }}>
                                <FormControl fullWidth>
                                  {/* <InputLabel id="demo-simple-select-label">Vui l??ng ch???n shipper</InputLabel> */}
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={mashipper}
                                    label="M?? shipper"
                                    onChange={handleChange}
                                  >
                                    {
                                  shipperData.map((item) => {
                                    if(item.role.id ===3)
                                    return (
                                      
                                        <MenuItem value={item.id}>{item.name}</MenuItem>
                                       
                                    )
                                  }
                                    
                                  )
                                }
                                    
                                  </Select>
                                </FormControl>
                              </Box>

                              {/* <select
                                id="shipperId"
                                name="shipperId"
                                defaultValue={4}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                              >
                                {shipperData.map((itemm) => {
                                  if (itemm.role.id === 3) {
                                    
                                    return (
                                      <option
                                        key={itemm.id}
                                        selected={data.shipper === itemm.name}
                                        value={itemm.id}
                                        style={{ fontSize: "24px" }}
                                      >
                                        {itemm.name}
                                      </option>
                                    );
                                  }

                                })}
                              </select> */}

                              {/* <h1 className="font-bold mb-1">Th???c thu</h1>
                              <textarea
                                id="mon"
                                name="mon"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nh???p th???c thu"
                                defaultValue={data.total - data.discount}
                              /> */}
                              {/* <div
                                className="flex justify-center items-center flex-wrap"
                                style={{ height: "300px" }}
                              ></div>
                              <Modal show={showModal} onHide={handleClose}>
                                <h1 className="font-bold mb-1"></h1>
                                <h1 className="font-bold mb-1">
                                  Vui l??ng x??c nh???n
                                </h1>
                                <h1 className="font-bold mb-1">
                                  Th??ng tin chi ti???t ????n h??ng
                                </h1> */}

                              {/* <div className="flex justify-between items-center mb-6">
                                  <Header
                                    title={`????n h??ng ${data.orderCode},
                                    T???ng gi?? tr??? ${data.total},
                                    ???????c b??n giao cho shipper ${data.shipperId}`}
                                  />
                                </div> */}

                              {/* <Modal.Footer>
                                  <div className="flex justify-end gap-2 px-4 py-3 text-right sm:px-6">
                                    <button
                                      type="button"
                                      className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                      onClick={handleClose}
                                    >
                                      H???y
                                    </button>
                                    <button
                                      type="button"
                                      className="inline-flex justify-center rounded-md border border-transparent bg-sky-500 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                      //onClick={alert("Giao h??ng th??nh c??ng")}
                                    >
                                      X??c nh???n
                                    </button>
                                  </div>
                                </Modal.Footer>
                              </Modal> */}
                            </div>
                          </label>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 px-4 py-3 text-right sm:px-6">
                        <Link
                          to="/orders"
                          className="inline-flex justify-center rounded-md border border-transparent bg-yellow-500 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Quay l???i
                        </Link>
                        <button
                          type="button"
                          disabled={
                            data.status === "???? x??c nh???n" ||
                            data.status === "??ang ch??? giao" ||
                            data.status === "??ang giao h??ng" ||
                            data.status === "???? h???y ????n" ||
                            data.status === "Ho??n t???t"
                          }
                          onClick={handleClickOpenNotify}
                          className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          {" "}
                          H???y ????n
                        </button>
                        <button
                          type="button"
                          disabled={
                            data.status === "???? x??c nh???n" ||
                            data.status === "??ang ch??? giao" ||
                            data.status === "??ang giao h??ng" ||
                            data.status === "???? h???y ????n" ||
                            data.status === "Ho??n t???t"
                          }
                          onClick={upApproved}
                          className="inline-flex justify-center rounded-md border border-transparent bg-sky-500 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          X??c nh???n ????n
                        </button>

                        <button
                          type="button"
                          disabled={
                            data.status === "??ang ch??? giao" ||
                            data.status === "??ang giao h??ng" ||
                            data.status === "???? h???y ????n" ||
                            data.status === "Ho??n t???t"
                          }
                          className="inline-flex justify-center rounded-md border border-transparent bg-sky-500 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={readyToShip}
                        >
                          Giao h??ng
                        </button>

                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-sky-500 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={onSave}
                        >
                          L??u th??ng tin
                        </button>
                      </div>
                      <div>
                        {/* <Dialog open={open} onClose={handleClickSuccess_luuthongtin}>
                          <Alert

                            //props go here
                          >
                            <AlertTitle>Th??ng tin ????n h??ng</AlertTitle>
                            C???p nh???t th??ng tin th??nh c??ng
                          </Alert>
                        </Dialog> */}
                        {
                          (
                            <>
                              <Dialog open={open} onClose={handleClickSuccess_xacnhandon}>
                                <Alert

                                  severity="success"
                                >
                                  <AlertTitle>Th??ng tin ????n h??ng</AlertTitle>
                                  Th???c hi???n th??nh c??ng
                                </Alert>
                              </Dialog>

                              {/* <Dialog open={open} onClose={handleClickError}>
                                <Alert

                                  severity="warning"
                                >
                                  <AlertTitle>Th??ng tin ????n h??ng</AlertTitle>
                                  Th???c hi???n th???t b???i
                                </Alert>
                              </Dialog> */}
                            </>
                          )
                        }
                        {/* <Dialog open={open} onClose={handleClickError}>
                          <Alert

                            severity="error"
                          >
                            <AlertTitle>Th??ng tin ????n h??ng</AlertTitle>
                            X??c nh???n ????n th???t b???i
                          </Alert>
                        </Dialog>
                        <Dialog open={open} onClose={handleClickError}>
                          <Alert

                            severity="error"
                          >
                            <AlertTitle>Th??ng tin ????n h??ng</AlertTitle>
                            X??c nh???n ????n th???t b???i
                          </Alert>
                        </Dialog> */}
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

export default OrderEdit;
