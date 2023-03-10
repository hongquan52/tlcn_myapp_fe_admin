import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import { IoIosMore } from "react-icons/io";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { MdAssignment, MdCheckCircleOutline, MdCheckCircle, MdLocalCarWash, MdElectricMoped, MdAssignmentTurnedIn } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Chart } from "react-google-charts";
import '../App.css'
import { Stacked, Pie, Button, LineChart, SparkLine } from "../components";
import {
  medicalproBranding,
  recentTransactions,
  weeklyStats,
  dropdownData,
  SparklineAreaData,
  ecomPieChartData,

} from "../data/dummy";
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
import { useStateContext } from "../contexts/ContextProvider";

import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { StaticsService } from "../services/statics.service";
import { useState } from "react";
import { ProductService } from "../services/product.service";

const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent
      id="time"
      fields={{ text: "Time", value: "Id" }}
      style={{ border: "none", color: currentMode === "Dark" && "white" }}
      value="1"
      dataSource={dropdownData}
      popupHeight="220px"
      popupWidth="120px"
    />
  </div>
);

const Ecommerce = () => {



  //-----------------------------------------------
  const navigate = useNavigate();
  const { currentColor, currentMode } = useStateContext();

  // const [startDate, setStartDate] = useState('');
  // const [endDate, setEndDate] = useState('');

  // console.log('type of start date: ', typeof startDate, startDate)
  // console.log('type of end date: ', typeof endDate, endDate)
  const [data, setData] = useState([])
  const [numberOfProduct, setNumberOfProduct] = useState(0)
  const [numberOfCustomer, setNumberOfCustomer] = useState(0)
  const [numberOfBill, setNumberOfBill] = useState(0)
  const [sale, setSale] = useState(0)
  const [dataUserByDay, setDataUserByDay] = useState([]);
  const [dataRevenueByDay, setDataRevenueByDay] = useState([]);
  const [numberProductOfAllBill, setNumberProductOfAllBill] = useState([])

  //status
  const [status1, setStatus1] = useState([])
  const [status2, setStatus2] = useState([])
  const [status3, setStatus3] = useState([])
  const [status4, setStatus4] = useState([])
  const [status5, setStatus5] = useState([])
  const [status6, setStatus6] = useState([])

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    await StaticsService.getNumberOfProduct().then((response) => {
      setNumberOfProduct(response)
      StaticsService.getNumberOfBill().then((response) => {

        setNumberOfBill(response);

        StaticsService.getNumberOfCustomer().then((response) => {
          setNumberOfCustomer(response);
          StaticsService.getSales().then((response) => {
            setSale(response);

            StaticsService.getALlUserByDay().then((response) => {
              setDataUserByDay(response);

              StaticsService.getAllRevenueByDay().then((response) => {
                setDataRevenueByDay(response);

                StaticsService.getNumberProductOfAllBill().then((response) => {
                  setNumberProductOfAllBill(response);

                  StaticsService.getNumberOfBillWaitingConfirm().then((response) => {
                    setStatus1(response);
                    StaticsService.getNumberOfBillConfirmed().then((response) => {
                      setStatus2(response);
                      StaticsService.getNumberOfBillReadyToDelivery().then((response) => {
                        setStatus3(response);
                        StaticsService.getNumberOfBillDelivering().then((response) => {
                          setStatus4(response);
                          StaticsService.getNumberOfBillWaitingPaid().then((response) => {
                            setStatus5(response);
                            StaticsService.getNumberOfBillWaitingCancel().then((response) => {
                              setStatus6(response);

                            });

                          });

                        });

                      });

                    });

                  });

                });

              });

            });

          })

        })
      });
    });
  }
  //-------------
  console.log("data is: ", data);
  console.log("Top product: ", data?.topProduct);

  // CHUA LOGIN
  // if (!localStorage.getItem("username")) {
  //   return <Navigate to="/admin/login" />;
  // }
  const earningData = [
    {
      icon: <MdAssignment />,
      amount: numberOfProduct,
      title: "T???ng s???n ph???m",
      iconColor: "#03C9D7",
      iconBg: "#E5FAFB",
      pcColor: "red-600",
    },
    {
      icon: <MdCheckCircleOutline />,
      amount: numberOfBill,
      title: "T???ng s??? h??a ????n",
      iconColor: "rgb(255, 244, 229)",
      iconBg: "rgb(254, 201, 15)",
      pcColor: "green-600",
    },
    {
      icon: <MdCheckCircle />,
      amount: numberOfCustomer,
      title: "T???ng s??? kh??ch h??ng",
      iconColor: "rgb(255, 244, 229)",
      iconBg: "rgb(254, 201, 15)",
      pcColor: "green-600",
    },
    {
      icon: <MdLocalCarWash />,
      amount: numberProductOfAllBill,
      title: "S???n ph???m ???? b??n",
      iconColor: "rgb(228, 106, 118)",
      iconBg: "rgb(255, 244, 229)",

      pcColor: "green-600",
    },

  ];
  const earningData1 = [
    {
      icon: <MdAssignment />,
      amount: `${data?.orderInDate?.newOrder} ????n`,
      title: "????n h??ng m???i",
      iconColor: "#03C9D7",
      iconBg: "#E5FAFB",
      pcColor: "red-600",
    },
    {
      icon: <MdCheckCircleOutline />,
      amount: `${data?.orderInDate?.cancelOrder} ????n`,
      title: "????n b??? h???y",
      iconColor: "rgb(255, 244, 229)",
      iconBg: "rgb(254, 201, 15)",
      pcColor: "green-600",
    },
    {
      icon: <MdCheckCircle />,
      amount: `${data?.orderInDate?.revenueOrder} VN??`,
      title: "Doanh thu trong ng??y",
      iconColor: "rgb(255, 244, 229)",
      iconBg: "rgb(254, 201, 15)",
      pcColor: "green-600",
    },
    {
      icon: <MdLocalCarWash />,
      amount: `${data?.orderInDate?.newCustomer} kh??ch h??ng`,
      title: "Kh??ch h??ng m???i",
      iconColor: "rgb(228, 106, 118)",
      iconBg: "rgb(255, 244, 229)",

      pcColor: "green-600",
    },


  ];
  // pie chart children props
  const dataChart = [
    ["Task", "Hours per Day"],
    ["Ch??? ch???p nh???n", 2],
    ["???? ch???p nh???n", 1],
    ["S???n s??ng v???n chuy???n", 2],
    ["??ang v???n chuy???n", 1],
    ["Ho??n th??nh", 4],
    ["????n b??? h???y", 1],
  ];
  // console.log('Type of data: ',typeof data?.statusOrder?.completed)

  const optionsChart = {
    title: `T???ng s??? ????n h??ng: ${numberOfBill}`,
  };
  //--------------------------------
  //   const quantitySalesColumn = (props) => {
  //     return (
  //       <div>{props.quantitySales} s???n ph???m</div>
  //     )
  // }
  // const totalPriceColumn = (props) => {
  //   return (
  //     <div>{props.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VN??</div>
  //   )
  // }
  const shipperGrid = [

    {
      headerText: "S???n ph???m hot",
      field: "name",
      textAlign: "Center",
      width: "100",
    },

    {
      headerText: "S??? l?????ng b??n ra",
      field: "quantitySales",
      width: "100",
      textAlign: "Center",
    },
    {
      headerText: "T???ng doanh s???",
      field: "totalPrice",
      width: "100",
      textAlign: "Center",
    },

  ];
  const userByDayGrid = [

    {
      headerText: "Th???i gian",
      field: "times",
      textAlign: "Center",
      width: "200",
    },

    {
      headerText: "S??? l?????ng kh??ch h??ng",
      field: "value",
      width: "200",
      textAlign: "Center",
    },
  ];
  const RevenueByDayGrid = [

    {
      headerText: "Th???i gian",
      field: "times",
      textAlign: "Center",
      width: "200",
    },

    {
      headerText: "Doanh thu trong ng??y",
      field: "value",
      width: "200",
      textAlign: "Center",
    },
  ];

  return (
    <div className="mt-24">
      <h3 className="statistic_title">Th???ng k?? chung</h3>
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">

            <div>
              <p className="font-bold text-gray-400">T???ng doanh thu</p>
              <p className="text-2xl">{sale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VN??</p>

            </div>

          </div>
          <div className="mt-6">
            <button onClick={() => navigate('/orders')}>
              <Button
                color="white"
                bgColor={currentColor}
                text="Qu???n l?? ????n h??ng"
                borderRadius="10px"

              />
            </button>
          </div>
          {/* --- */}
          <div className="flex justify-between items-center mt-6">

            <div>
              <p className="font-bold text-gray-400">T???ng s??? ????n h??ng</p>
              <p className="text-2xl">{numberOfBill} ????n h??ng</p>

            </div>

          </div>
          <div className="mt-6">
            <button onClick={() => navigate('/orders')}>
              <Button
                color="white"
                bgColor={currentColor}
                text="Qu???n l?? ????n h??ng"
                borderRadius="10px"

              />
            </button>
          </div>

        </div>
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">

          {earningData.map((item) => (
            <div
              key={item.title}
              className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl "
            >
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount} ????n</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{item.title}</p>
            </div>
          ))}

          <div className="w-100">

            <Chart
              chartType="PieChart"
              data={dataChart}
              options={optionsChart}
              width={"100%"}
              height={"400px"}
            />
          </div>
        </div>
      </div>
      <h3 className="statistic_title">T??nh tr???ng ????n h??ng</h3>
      <div className="flex justify-center items-center mt-6">
        
        <div className="m-8 status_container ">
          <p className="text-3xl font-semibold">{status6}</p>

          <p className="text-gray-500 mt-1">B??? h???y</p>
        </div>
        
        
        <div className="m-8 status_container">
          <p className="text-3xl font-semibold">{status5}</p>

          <p className="text-gray-500 mt-1">Th??nh c??ng</p>
        </div>

        
        <div className="m-8 status_container">
          <p className="text-3xl font-semibold">{status4}</p>

          <p className="text-gray-500 mt-1">??ang giao</p>
        </div>

        
        <div className="m-8 status_container">
          <p className="text-3xl font-semibold">{status3}</p>

          <p className="text-gray-500 mt-1">Chu???n b??? giao</p>
        </div>

        
        <div className="m-8 status_container">
          <p className="text-3xl font-semibold">{status2}</p>

          <p className="text-gray-500 mt-1">???? x??c nh???n</p>
        </div>

        
        <div className="m-8 status_container">
          <p className="text-3xl font-semibold">{status1}</p>

          <p className="text-gray-500 mt-1">Ch??? x??c nh???n</p>
        </div>
      </div>
      {/* GetBillByDay */}
      <div className="flex gap-10 flex-wrap justify-center">

        <div className="gap-5">
          <div id="grid-data">
            <h3 className="statistic_title">B???ng th???ng k?? kh??ch h??ng m???i theo ng??y</h3>

            <GridComponent
              id="gridcomp"
              dataSource={dataUserByDay}
              allowPaging
              allowSorting
              pageSettings={{ pageSize: 10 }}
            >
              <ColumnsDirective>
                {userByDayGrid.map((item, index) => (
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
        <div className="gap-5">
          <div id="grid-data">
            <h3 className="statistic_title">B???ng th???ng k?? doanh thu theo ng??y</h3>
            <GridComponent
              id="gridcomp"
              dataSource={dataRevenueByDay}
              allowPaging
              allowSorting
              pageSettings={{ pageSize: 10 }}
            >
              <ColumnsDirective>
                {RevenueByDayGrid.map((item, index) => (
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


      </div>
      {/* ------------------------------- */}

      <div className="flex gap-10 flex-wrap justify-center">

        {/* Top product */}
        <div id="grid-data">
          <h3 className="statistic_title">S???n ph???m b??n ch???y</h3>
          <GridComponent
            id="gridcomp"
            dataSource={getNumberProductOfBill}
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
    </div>
  );
};


export default Ecommerce;

const getNumberProductOfBill = [
  {
    "id": 5,
    "name": "Chu???t kh??ng d??y Logitech",
    "quantity": 48,
    "price": 120000.00,
    "quantitySales": 30,
    "totalPrice": 3600000.00
  },
  {
    "id": 4,
    "name": "Card m??n h??nh NVDIA",
    "quantity": 8,
    "price": 1400000.00,
    "quantitySales": 20,
    "totalPrice": 29400000.00
  },
  {
    "id": 2,
    "name": "CPU ???? ch???nh s???a l???n 345",
    "quantity": 100,
    "price": 34555555.00,
    "quantitySales": 12,
    "totalPrice": 1796888860.00
  },
  {
    "id": 3,
    "name": "Main m???nh ch???",
    "quantity": 19,
    "price": 1000000.00,
    "quantitySales": 10,
    "totalPrice": 10000000.00
  },
  {
    "id": 8,
    "name": "B??n ph??m Gaming",
    "quantity": 4,
    "price": 900000.00,
    "quantitySales": 5,
    "totalPrice": 4500000.00
  },
  {
    "id": 7,
    "name": "Laptop Asus A412F 512G SSD",
    "quantity": 5,
    "price": 14500000.00,
    "quantitySales": 2,
    "totalPrice": 43500000.00
  },
  {
    "id": 6,
    "name": "Nguy???n H???ng Qu??n",
    "quantity": 46,
    "price": 480000.00,
    "quantitySales": 1,
    "totalPrice": 480000.00
  },
  {
    "id": 9,
    "name": "Loa bluetooth 4.0",
    "quantity": 8,
    "price": 490000.00,
    "quantitySales": 1,
    "totalPrice": 490000.00
  }
]