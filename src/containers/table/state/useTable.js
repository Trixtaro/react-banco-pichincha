import { useEffect, useState } from "react";
import {
  fetchDeleteProduct,
  fetchGetProducts,
} from "../../../infrastructure/endpoints";

export const useTable = () => {
  const [pagination, setPagination] = useState("5");
  const [data, setData] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetchGetProducts();
      const data = await response.json();

      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetchDeleteProduct(id);

      if (response.status === 200) fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "paginacion":
        setPagination(e.target.value);
        break;

      default:
        break;
    }
  };

  const handleDelete = (id) => {
    deleteProduct(id);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    values: {
      data,
      pagination,
    },
    functions: {
      fetchProducts,
      handleDelete,
      handleChange,
    },
  };
};
