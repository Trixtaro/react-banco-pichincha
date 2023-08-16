import Input from "../../../components/Input";
import { FormStyles } from "./Form.styles";
import { useForm } from "./state/useForm";

import "./Form.css";

const Form = () => {
  const { functions, values } = useForm();

  return (
    <form
      style={FormStyles.form}
      onSubmit={functions.handleSubmit}
      autoComplete="off"
    >
      <div style={FormStyles.formTitle}>
        <h1>Formulario de Registro</h1>
      </div>
      <div style={{ padding: "20px 40px" }}>
        <div style={FormStyles.formFields}>
          <div style={FormStyles.formField}>
            <label htmlFor="id" style={FormStyles.fieldLabels}>
              ID
            </label>
            <Input
              id="id"
              name="id"
              placeHolder="trj-crd..."
              value={values.id}
              onChange={functions.handleChange}
              styles={{ width: "100%" }}
              pattern={".{3,10}"}
              validationMessage={"ID no válido"}
              forceValid={!values.invalidId}
              disabled={values.disabledId}
              required
            />
          </div>
          <div style={FormStyles.formField}>
            <label htmlFor="nombre" style={FormStyles.fieldLabels}>
              Nombre
            </label>
            <Input
              id="nombre"
              name="nombre"
              placeHolder="Tarjetas de Crédito..."
              value={values.name}
              onChange={functions.handleChange}
              styles={{ width: "100%" }}
              pattern={"[A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,100}"}
              validationMessage="Campo requerido"
              required
            />
          </div>
          <div style={FormStyles.formField}>
            <label htmlFor="descripcion" style={FormStyles.fieldLabels}>
              Descripción
            </label>
            <Input
              id="descripcion"
              name="descripcion"
              placeHolder="Tarjeta de consumo bajo..."
              value={values.description}
              onChange={functions.handleChange}
              styles={{ width: "100%" }}
              pattern={"[A-Za-zÁÉÍÓÚáéíóúÑñ ]{10,200}"}
              validationMessage="Campo requerido"
              required
            />
          </div>
          <div style={FormStyles.formField}>
            <label htmlFor="logo" style={FormStyles.fieldLabels}>
              Logo
            </label>
            <Input
              id="logo"
              name="logo"
              placeHolder="https://imgur.com/.../image.png"
              value={values.logo}
              onChange={functions.handleChange}
              styles={{ width: "100%" }}
              pattern={".{1,}"}
              validationMessage="Campo requerido"
              required
            />
          </div>
          <div style={FormStyles.formField}>
            <label htmlFor="fecha_liberacion" style={FormStyles.fieldLabels}>
              Fecha de Liberación
            </label>
            <Input
              type="date"
              id="fecha_liberacion"
              name="fecha_liberacion"
              value={values.releaseDate}
              onChange={functions.handleChange}
              styles={{ width: "100%", padding: "3px 3px" }}
              validationMessage="Campo requerido"
              required
            />
          </div>
          <div style={FormStyles.formField}>
            <label htmlFor="fecha_revision" style={FormStyles.fieldLabels}>
              Fecha de Revisión
            </label>
            <Input
              type="date"
              id="fecha_revision"
              name="fecha_revision"
              value={values.reviewDate}
              onChange={functions.handleChange}
              styles={{ width: "100%", padding: "3px 3px" }}
              disabled
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "60px 0 35px 0",
          }}
        >
          <button
            onClick={functions.handleRestart}
            style={FormStyles.formButton}
          >
            Reiniciar
          </button>
          <button
            disabled={!values.validForm}
            className="yellow-button"
            style={FormStyles.formButton}
          >
            Enviar
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
