import React from "react";

const TableHeader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        fontWeight: "bold",
        fontSize: "13px",
      }}
    >
      <div style={{ width: "5rem" }}>Logo</div>
      <div style={{ width: "15%" }}>Nombre de productos</div>
      <div style={{ width: "25%" }}>Descripcion</div>
      <div style={{ width: "15%" }}>Fecha de liberación</div>
      <div style={{ width: "16%" }}>Fecha de reestructuración</div>
      <div style={{ width: "2rem" }}></div>
    </div>
  );
};

export default TableHeader;
