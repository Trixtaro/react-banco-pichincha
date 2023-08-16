import { ContextMenyStyles as styles } from "./ContextMenu.styles";

import "./ContextMenu.css";
import { Link } from "react-router-dom";

const ContextMenu = ({ product, onDelete }) => {
  return (
    <div style={styles.contextMenu}>
      <Link
        style={styles.option}
        className="ContextMenu-option"
        to={`/editar-producto/${product.id}`}
        state={{
          ...product,
        }}
      >
        Editar
      </Link>
      <div
        style={styles.option}
        className="ContextMenu-option"
        onClick={onDelete}
      >
        Eliminar
      </div>
    </div>
  );
};

export default ContextMenu;
