import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div
      style={{
        maxWidth: "100%",
        background: "#efefef",
        height: "100%",
        margin: "0 auto",
      }}
    >
      <div style={{ maxWidth: "90%", height: "100%", margin: "0 auto" }}>
        <h3 style={{ padding: "8px 0" }}>
          <span
            style={{ cursor: "pointer", fontWeight: "bold" }}
            onClick={() => {
              navigate("/");
            }}
          >
            Home page
          </span>{" "}
          -> Product details
        </h3>
        <ProductDetailsComponent idProduct={id} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
