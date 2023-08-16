import { AUTHOR_ID, BACKEND_URL } from "./constants";

export const fetchGetProducts = async () => {
  return fetch(`${BACKEND_URL}/bp/products`, {
    headers: {
      authorId: AUTHOR_ID,
    },
  });
};

export const fetchSaveProducts = async (
  id,
  name,
  description,
  logo,
  date_release,
  date_revision
) => {
  return fetch(`${BACKEND_URL}/bp/products`, {
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
      date_release,
      date_revision,
    }),
  });
};

export const fetchValidateId = (id) => {
  return fetch(`${BACKEND_URL}/bp/products/verification?id=${id}`, {
    method: "GET",
    headers: {
      authorId: AUTHOR_ID,
      "Content-Type": "application/json",
    },
  });
};

export const fetchUpdateProduct = (
  id,
  name,
  description,
  logo,
  date_release,
  date_revision
) => {
  return fetch(`${BACKEND_URL}/bp/products`, {
    method: "PUT",
    headers: {
      authorId: AUTHOR_ID,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      name,
      description,
      logo,
      date_release,
      date_revision,
    }),
  });
};

export const fetchDeleteProduct = async (id) => {
  return fetch(`${BACKEND_URL}/bp/products?id=${id}`, {
    method: "DELETE",
    headers: {
      authorId: AUTHOR_ID,
    },
  });
};
