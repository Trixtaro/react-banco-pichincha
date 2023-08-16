import { Link } from "react-router-dom";
import Header from "../../components/Header";
import TableHeader from "./components/TableHeader/TableHeader";
import TableRow from "./components/TableRow/TableRow";
import Input from "../../components/Input";
import { TableStyles } from "./Table.styles";
import { useTable } from "./state/useTable";

const Table = () => {
  const { values } = useTable();

  return (
    <>
      <Header />
      <div style={TableStyles.container}>
        <div style={TableStyles.top}>
          <Input placeHolder="Search..." />
          <Link to={"/nuevo-producto"} style={TableStyles.addButton}>
            Agregar
          </Link>
        </div>
        <div style={TableStyles.table}>
          <div style={TableStyles.tableRows}>
            <TableHeader />
            {values.data.map((value) => (
              <TableRow
                key={value.id}
                logo={value.logo}
                name={value.name}
                description={value.description}
                releaseDate={value.date_release}
                reviewDate={value.date_revision}
              />
            ))}
          </div>
          <div style={TableStyles.tableBottom}>
            <div style={TableStyles.tableResults}>
              {values.data.length} resultados
            </div>
            <div>
              <select style={TableStyles.tablePaginanation} name="" id="">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
