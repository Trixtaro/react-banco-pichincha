import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  fetchSaveProducts,
  fetchUpdateProduct,
  fetchValidateId,
} from "../../../../infrastructure/endpoints";

export const getTwoDigitsNumber = (num) => {
  return num < 10 ? `0${num}` : `${num}`;
};

export const transformDate = (date) => {
  return `${date.getFullYear()}-${getTwoDigitsNumber(
    date.getMonth() + 1
  )}-${getTwoDigitsNumber(date.getDate())}`;
};

export const useForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  const [invalidId, setInvalidId] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");
  const [releaseDate, setReleaseDate] = useState(transformDate(new Date()));

  const [mode, setMode] = useState("new");

  const [reviewDate, setReviewDate] = useState(
    transformDate(
      (() => {
        let tempDate = new Date();
        tempDate.setFullYear(new Date().getFullYear() + 1);
        tempDate.setDate(tempDate.getDate());
        return tempDate;
      })()
    )
  );

  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e, valid) => {
    switch (e.target.name) {
      case "id":
        setId(e.target.value);
        setInvalidId(false);
        validateId(e.target.value);
        break;
      case "nombre":
        setName(e.target.value);
        break;
      case "descripcion":
        setDescription(e.target.value);
        break;
      case "logo":
        setLogo(e.target.value);
        break;
      case "fecha_liberacion":
        const newDate = new Date(
          `${e.target.value}T${getTwoDigitsNumber(
            new Date().getHours()
          )}:00:00.000Z`
        );

        // la nueva fecha no puede ser menor a la fecha actual
        if (newDate.getTime() < new Date().getTime()) return;

        newDate.setFullYear(newDate.getFullYear() + 1);

        setReleaseDate(e.target.value);
        setReviewDate(transformDate(newDate));
        break;
      default:
        break;
    }

    setValidationErrors({
      ...validationErrors,
      [e.target.name]: valid,
    });
  };

  const allFieldsAreValid = () => {
    const NUMBER_OF_FIELDS = mode === "edit" ? 1 : 4;
    if (Object.values(validationErrors).length < NUMBER_OF_FIELDS) return false;

    return Object.values(validationErrors).every((v) => v);
  };

  const handleRestart = () => {
    setId("");
    setName("");
    setValidationErrors({});
    setDescription("");
    setLogo("");
    setReleaseDate(transformDate(new Date()));
  };

  const saveProducts = async () => {
    try {
      const response = await fetchSaveProducts(
        id,
        name,
        description,
        logo,
        releaseDate,
        reviewDate
      );

      if (response.status === 400) {
        setId("");
        setInvalidId(true);
        setValidationErrors({
          ...validationErrors,
          id: false,
        });
        return;
      }

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async () => {
    try {
      const response = await fetchUpdateProduct(
        id,
        name,
        description,
        logo,
        releaseDate,
        reviewDate
      );

      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validateId = async (id) => {
    if (id.length < 3) return;

    try {
      const response = await fetchValidateId(id);
      const validation = await response.text();

      if (validation === "true") {
        setInvalidId(true);
        setValidationErrors({
          ...validationErrors,
          id: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "new") saveProducts();
    else updateProduct();
  };

  useEffect(() => {
    if (params.id) {
      setMode("edit");

      if (location.state) {
        setId(params.id);
        setName(location.state.name);
        setDescription(location.state.description);
        setLogo(location.state.logo);
        setReleaseDate(transformDate(new Date(location.state.releaseDate)));
        setReviewDate(transformDate(new Date(location.state.reviewDate)));
      }
    }
  }, [params.id, location.state]);

  return {
    values: {
      invalidId,
      id,
      name,
      description,
      logo,
      releaseDate,
      reviewDate,
      validForm: allFieldsAreValid(),
      mode,
      disabledId: mode === "edit",
      navigate,
      location,
      params,
    },
    functions: {
      handleChange,
      handleRestart,
      handleSubmit,
      saveProducts,
      validateId,
    },
  };
};
