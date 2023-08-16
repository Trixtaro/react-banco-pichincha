import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AUTHOR_ID, BACKEND_URL } from "../../../../infrastructure/constants";

export const transformDate = (date) => {
  return `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
};

export const useForm = () => {
  const navigate = useNavigate();

  const [invalidId, setInvalidId] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");
  const [releaseDate, setReleaseDate] = useState(transformDate(new Date()));

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
        break;
      case "nombre":
        setName(e.target.value);
        break;
      case "descripcion":
        setDescription(e.target.value);
        break;
      case "logo":
        console.log(e.target.value);
        setLogo(e.target.value);
        break;
      case "fecha_liberacion":
        setReleaseDate(e.target.value);

        const newDate = new Date(
          `${e.target.value}T${
            new Date().getHours() < 10
              ? `0${new Date().getHours()}`
              : new Date().getHours()
          }:00:00.000Z`
        );
        newDate.setFullYear(newDate.getFullYear() + 1);

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
    const NUMBER_OF_FIELDS = 4;
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
      const response = await fetch(`${BACKEND_URL}/bp/products`, {
        method: "POST",
        headers: {
          authorId: AUTHOR_ID,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          description,
          logo,
          date_release: releaseDate,
          date_revision: reviewDate,
        }),
      });

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

  const handleSubmit = (e) => {
    e.preventDefault();

    saveProducts();
  };

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
    },
    functions: {
      handleChange,
      handleRestart,
      handleSubmit,
      saveProducts,
    },
  };
};
