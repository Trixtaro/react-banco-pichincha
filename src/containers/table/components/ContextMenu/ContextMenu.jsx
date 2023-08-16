import { ContextMenyStyles as styles } from "./ContextMenu.styles";

import "./ContextMenu.css";

const ContextMenu = ({ onEdit, onDelete }) => {
  return (
    <div style={styles.contextMenu}>
      <div
        style={styles.option}
        className="ContextMenu-option"
        onClick={onEdit}
      >
        Editar
      </div>
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
