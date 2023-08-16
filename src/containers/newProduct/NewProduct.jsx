import React from "react";
import Header from "../../components/Header";
import Form from "./components/Form";

const NewProduct = () => {
  return (
    <>
      <Header />
      <div
        style={{
          maxWidth: "1024px",
          margin: "0 auto",
        }}
      >
        <Form />
      </div>
    </>
  );
};

export default NewProduct;
