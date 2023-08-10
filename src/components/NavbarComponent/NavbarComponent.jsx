import { Checkbox, Col, Rate, Row } from "antd";
import React, { useEffect, useState } from "react";
import {
  WrapperContent,
  WrapperLableText,
  WrapperTextPrice,
  WrapperTextValue,
} from "./style";
import * as ProductService from "../../services/ProductService";
import { useNavigate } from "react-router-dom";

const NavBarComponent = () => {
  const [typeProducts, setTypeProducts] = useState([]);
  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProducts(res?.data);
    }
  };

  const navigate = useNavigate();
  const handleNavigatetype = (type) => {
    navigate(
      `/product/${type
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        ?.replace(/ /g, "_")}`,
      { state: type }
    );
  };
  const onChange = () => {};
  const renderContent = (type, options) => {
    switch (type) {
      case "text":
        return options.map((option) => {
          return (
            <WrapperTextValue onClick={() => handleNavigatetype(option)}>
              {option}
            </WrapperTextValue>
          );
        });
      case "checkbox":
        return (
          <Checkbox.Group
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
            onChange={onChange}
          >
            {options.map((option) => {
              return (
                <Checkbox style={{ marginLeft: 0 }} value={option.value}>
                  {option.label}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        );
      case "star":
        return options.map((option) => {
          return (
            <div style={{ dispaly: "flex" }}>
              <Rate
                style={{ fontSize: "12px" }}
                disabled
                defaultValue={option}
              />
              <span> {`tu ${option}  sao`}</span>
            </div>
          );
        });
      case "price":
        return options.map((option) => {
          return <WrapperTextPrice>{option}</WrapperTextPrice>;
        });
      default:
        return {};
    }
  };
  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  return (
    <div>
      <WrapperContent>{renderContent("text", typeProducts)}</WrapperContent>
    </div>
  );
};

export default NavBarComponent;
