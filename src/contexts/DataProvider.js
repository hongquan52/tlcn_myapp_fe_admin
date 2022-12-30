import React, { createContext, useContext, useEffect, useState } from "react";
import { BrandService } from "../services/brand.service";
import { CustomerService } from "../services/customer.service";
import { EmployeeService } from "../services/employee.service";
import { OrderService } from "../services/order.service";
import { ProductTypeService } from "../services/producttype.service";
import { ProductService } from "../services/product.service";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  //brand data
  const [brandsData, setBrandsData] = useState(null);

  // customer data
  const [customersData, setCustomerData] = useState(null);

  //employee data
  const [employeesData, setEmployeeData] = useState(null);

  // order data
  const [ordersData, setOrderData] = useState(null);

  //producttype data
  const [producttypeData, setProducttypeData] = useState(null);

  //product data
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchBrandsData = () => {
      BrandService.getAllBrand().then((response) => {
        setBrandsData(response);
      });
    };
    fetchBrandsData();
    setCount((currentcount) => {
      console.log(currentcount + 1);
      return currentcount + 1;
    });
  }, []);
  const data = {
    brandsData,
    customersData,
    employeesData,
    ordersData,
    productData,
    producttypeData,
  };
  const setData = {
    setBrandsData,
    setCustomerData,
    setEmployeeData,
    setOrderData,
    setProductData,
    setProducttypeData,
  };
  return (
    <DataContext.Provider value={{ ...data, ...setData }}>
      {children}
    </DataContext.Provider>
  );
};
export const useDataContext = () => useContext(DataContext);
