import React from "react";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import {
  WrapperButtonMore,
  WrapperProducts,
  WrapperTypeProduct,
} from "./style";
import slider1 from "../../assets/images/slider1.webp";
import slider2 from "../../assets/images/slider2.webp";
import slider3 from "../../assets/images/slider3.webp";
import CardComponent from "../../components/CardComponent/CardComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";
import { useSelector } from "react-redux";
import { useState } from "react";
import Loading from "../../components/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";
import { useEffect } from "react";
import Home from "../../components/MainPage/Home";
import Wrapper from "../../components/Wrapper/Wrapper";
import Annocument from "../../components/Annocument/Annocument";
import NewArrivals from "../../components/Newarrivals/NewArrivals";

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(6);
  const [typeProducts, setTypeProducts] = useState([]);

  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    const res = await ProductService.getAllProduct(search, limit);

    return res;
  };

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProducts(res?.data);
    }
  };

  const {
    isLoading,
    data: products,
    isPreviousData,
  } = useQuery(["products", limit, searchDebounce], fetchProductAll, {
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  return (
    <Loading isLoading={isLoading || loading}>
      <Home />
      <NewArrivals />
      <div style={{ maxWidth: "90%", margin: "0 auto", padding: "8px 0" }}>
        <div className="heading d_flex" style={{ alignItems: "center" }}>
          <div
            className="heading-left row  f_flex"
            style={{ alignItems: "center" }}
          >
            <div className="d_flex">
              <img src="https://img.icons8.com/windows/32/fa314a/gift.png" />
              <h2>Shop</h2>
            </div>
            <div style={{ marginLeft: "40px" }}>
              <WrapperTypeProduct>
                {typeProducts.map((item) => {
                  return <TypeProduct name={item} key={item} />;
                })}
              </WrapperTypeProduct>
            </div>
          </div>
          <div className="heading-right row ">
            <span>View all</span>
            <i className="fa-solid fa-caret-right"></i>
          </div>
        </div>
      </div>
      <div
        className="body"
        style={{
          width: "100%",
          backgroundColor: "#efefef",
          padding: "16px 0 32px",
        }}
      >
        <div id="container" style={{ width: "1270px", margin: "0 auto" }}>
          {/* <SliderComponent arrImages={[slider1, slider2, slider3]} /> */}
          <WrapperProducts>
            {products?.data?.map((product) => {
              return (
                <CardComponent
                  key={product._id}
                  countInStock={product.countInStock}
                  description={product.description}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  rating={product.rating}
                  type={product.type}
                  selled={product.selled}
                  discount={product.discount}
                  id={product._id}
                />
              );
            })}
          </WrapperProducts>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <WrapperButtonMore
              textbutton={isPreviousData ? "Load more" : "Load more"}
              type="outline"
              styleButton={{
                border: `1px solid ${
                  products?.total === products?.data?.length
                    ? "#f5f5f5"
                    : "#9255FD"
                }`,
                color: `${
                  products?.total === products?.data?.length
                    ? "#f5f5f5"
                    : "#9255FD"
                }`,
                width: "240px",
                height: "38px",
                borderRadius: "4px",
                marginTop: "8px",
              }}
              disabled={
                products?.total === products?.data?.length ||
                products?.totalPage === 1
              }
              styleTextButton={{
                fontWeight: 500,
                color: products?.total === products?.data?.length && "#fff",
              }}
              onClick={() => setLimit((prev) => prev + 6)}
            />
          </div>
        </div>
      </div>
      <Annocument />
      <Wrapper />
    </Loading>
  );
};

export default HomePage;
