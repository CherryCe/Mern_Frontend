import React from "react";
import Header from "../../common/header/Header";
import Footer from "../../common/footer/Footer";

const DefaultComponent = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default DefaultComponent;
