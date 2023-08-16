import { BrowserRouter, Route, Routes } from "react-router-dom";

import Table from "./containers/table/Table";
import "./App.css";
import NewProduct from "./containers/newProduct/NewProduct";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/nuevo-producto" element={<NewProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
