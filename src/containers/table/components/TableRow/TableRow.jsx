import React from "react";
import { TableRowStyles } from "./TableRow.styles";
import ContextMenu from "../ContextMenu/ContextMenu";
import { useTableRow } from "./state/useTableRow";
import { transformDate } from "../../../newProduct/components/state/useForm";

const TableRow = ({ logo, name, description, releaseDate, reviewDate }) => {
  const { functions, values } = useTableRow();

  return (
    <div style={TableRowStyles.tableRow}>
      <div style={{ width: "5rem" }}>
        <img src={logo} alt={name} style={TableRowStyles.logo} />
      </div>
      <div style={{ width: "15%" }}>{name}</div>
      <div style={{ width: "25%" }}>{description}</div>
      <div style={{ width: "15%" }}>{transformDate(new Date(releaseDate))}</div>
      <div style={{ width: "16%" }}>{transformDate(new Date(reviewDate))}</div>
      <div
        style={{ width: "2rem", cursor: "pointer" }}
        onClick={functions.toggleShowOptions}
      >
        <img
          src={"/images/3dots.png"}
          alt="options"
          style={{ width: "20px" }}
        />
      </div>
      {values.showOptions && <ContextMenu />}
    </div>
  );
};

export default TableRow;
