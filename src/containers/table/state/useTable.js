import { useEffect, useState } from "react";
import { AUTHOR_ID, BACKEND_URL } from "../../../infrastructure/constants";

export const useTable = () => {
  const [data, setData] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/bp/products`, {
        headers: {
          authorId: AUTHOR_ID,
        },
      });
      const data = await response.json();

      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    values: {
      data,
    },
    functions: {
      fetchProducts,
    },
  };
};
