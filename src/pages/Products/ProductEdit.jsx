import React, { useState, useEffect } from "react";
import { Selection } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components";
import { Link } from "react-router-dom";
import { ProductService } from "../../services/product.service";
import { BrandService } from "../../services/brand.service";
import { ProductTypeService } from "../../services/producttype.service";

import { useDataContext } from "../../contexts/DataProvider";

const ProductEdit = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [brand, setBrandData] = useState([]);
  const [producttype, setProductTypeData] = useState([]);

  const navigate = useNavigate();
  const { productData } = useDataContext();
  //const brandname = [];
  useEffect(() => {
    const fetchData = async () => {
      console.log(id);
      await ProductService.getProductById(id).then((response) => {
        console.log(response);
        setData(response);

        // BrandService.getAllBrand().then((response) => {
        //   //console.log(response.results.data);
        //   setBrandData(response.results.data);

        //   ProductTypeService.getAllProductType().then((response) => {
        //     console.log(response);
        //     setProductTypeData(response.results.data);
        //   });
        // });
      });
    };
    fetchData();
  }, [id]);
  const onSave = async () => {
      const name = document.getElementById("name").value
      const price = Number(document.getElementById("price").value)
      const brand = Number(document.getElementById("brand").value)
      const quantity = Number(document.getElementById("quantity").value)
      const promotion = Number(document.getElementById("promotion").value)
      const category = document.getElementById("category").value
      const description = document.getElementById("description").value
      
      
    // call api
    var formdata = new FormData();
    formdata.append("name", name);
    formdata.append("quantity", quantity);
    formdata.append("promotion", promotion);
    formdata.append("description", description);
    formdata.append("category", 1);
    formdata.append("brand", 1);
    formdata.append("price", price);
    

    var requestOptions = {
      method: 'PUT',
      body: formdata,
      redirect: 'follow'
    };

    fetch(`http://localhost:8080/api/v1/product?id=${id}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    //
    // navigate("/products");
    window.location.reload()
    
    

    // await ProductService.updateProduct(id, product).then(
    //   (response) => {
    //     console.log(response);
    //     navigate("/products");
    //   },
    //   (error) => {
    //     alert("???? x???y ra l???i!!!");
    //   }
    // );
  };
  console.log("Product detail data: ", data);
  return (
    <>
      <div className=" md:m-10 p-1 md:p-10 bg-white rounded-3xl">
        <div className="flex justify-between items-center mb-6">
          <Header
            title={`S???n ph???m ${data.name}`}
            category="Ch???nh s???a th??ng tin s???n ph???m"
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
                            <h1 className="font-bold mb-1">T??n s???n ph???m</h1>
                            <div className="mt-1">
                              <textarea
                                id="name"
                                name="name"
                                rows={2}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="T??n s???n ph???m"
                                defaultValue={data.name}
                              />

                              <h1 className="font-bold mb-1">Gi??</h1>
                              <textarea
                                id="price"
                                name="price"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Gi??"
                                defaultValue={data.price}
                              />
                              <h1 className="font-bold mb-1">
                                Th????ng hi???u
                              </h1>
                              <textarea
                                id="brand"
                                name="status"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Tr???ng th??i s???n ph???m"
                                defaultValue={data.brand}
                              />
                              <h1 className="font-bold mb-1">S??? l?????ng</h1>
                              <textarea
                                id="quantity"
                                name="discount"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Gi???m gi??"
                                defaultValue={data.quantity}
                              />
                              
                              <h1 className="font-bold mb-1">Khuy???n m??i</h1>
                              <textarea
                                id="promotion"
                                name="expiryDate"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="B???o h??nh"
                                defaultValue={data.promotion}
                              />
                              <h1 className="font-bold mb-1">Lo???i s???n ph???m</h1>
                              <textarea
                                id="category"
                                name="expiryDate"
                                rows={1}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="B???o h??nh"
                                defaultValue={data.category}
                              />
                              {/* <select
                                id="productType"
                                name="productType"
                                defaultValue={data.category}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                              >
                                {producttype.map((itemm) => {
                                  return (
                                    <option
                                      key={itemm.uid}
                                      selected={data.productType === itemm.name}
                                      value={itemm.uid}
                                      style={{ fontSize: "24px" }}
                                    >
                                      {itemm.name}
                                    </option>
                                  );
                                })}
                              </select>
                              <h1 className="font-bold mb-1">Nh??n hi???u</h1>
                              
                              <select
                                id="brand"
                                name="brand"
                                defaultValue={data.brand}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                              >
                                {brand.map((item) => {
                                  return (
                                    <option
                                      key={item.uid}
                                      selected={data.brand === item.name}
                                      value={item.uid}
                                      style={{ fontSize: "24px" }}
                                    >
                                      {item.name}
                                    </option>
                                  );
                                })}
                              </select> */}
                              <h1 className="font-bold mb-1">M?? t???</h1>
                              
                              <textarea
                                id="description"
                                name="descriptionSummary"
                                rows={3}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="M?? t???"
                                defaultValue={data.description}
                              />
                              <h1>H??nh ???nh</h1>
                              
                              <textarea
                                id="image"
                                name="image"
                                rows={3}
                                className="image mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nh???p link h??nh ???nh"
                                defaultValue={data.image}
                              />
                              
                            </div>
                          </label>
                        </div>
                        <div>
                          {/* <label className="block text-sm font-medium text-gray-700">
                            <h1 className="font-bold mb-1">M?? t???</h1>
                            <div className="mt-1">
                              <textarea
                                id="description"
                                name="description"
                                rows={5}
                                className="mt-1 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="M?? t??? v??? danh m???c"
                                defaultValue={data.status}
                              />
                            </div>
                          </label> */}
                        </div>
                        
                      </div>
                      <div className="flex justify-end gap-2 px-4 py-3 text-right sm:px-6">
                        <Link
                          to="/products"
                          className="inline-flex justify-center rounded-md border border-transparent bg-red-500 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          H???y
                        </Link>
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-sky-500 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={onSave}
                        >
                          L??u
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

export default ProductEdit;
