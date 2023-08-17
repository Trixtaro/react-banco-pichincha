import { useState } from "react";

export const useTableRow = (id, onDelete) => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleShowOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleDelete = () => {
    toggleShowOptions();
    onDelete(encodeURIComponent(id));
  };

  return {
    values: {
      showOptions,
    },
    functions: {
      toggleShowOptions,
      handleDelete,
    },
  };
};
