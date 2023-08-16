import { useState } from "react";

export const useTableRow = () => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleShowOptions = () => {
    setShowOptions(!showOptions);
  };

  return {
    values: {
      showOptions,
    },
    functions: {
      toggleShowOptions,
    },
  };
};
