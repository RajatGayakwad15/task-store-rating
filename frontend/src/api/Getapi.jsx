import Cookies from "js-cookie";
export const getAllStores = async () => {


  const requestOptions = {
    method: "GET",
     headers: {
      authToken: Cookies.get("authToken"),
    },
  };

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}all-stores`,
    requestOptions
  );
  const res = await response.json();
  return res;
};

export const getAllUsers = async (values) => {
  const requestOptions = {
    method: "GET",
    headers: {
      authToken: Cookies.get("authToken"),
    },
  };

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}all-users`,
    requestOptions
  );
  const res = await response.json();
  return res;
};

export const getratingstore = async (values) => {
  const requestOptions = {
    method: "GET",
    headers: {
      authToken: Cookies.get("authToken"),
    },
  };
  const store_id = Cookies.get("user_id");
  const response = await fetch(
    // `http://localhost:5000/api/all-users`,
    `${import.meta.env.VITE_API_URL}ratings/store/${store_id}`,
    // `${import.meta.env.VITE_API_URL}ratings/store/2`,

    requestOptions
  );
  const res = await response.json();
  return res;
};

export const getratingstoreaverage = async (values) => {
  const requestOptions = {
    method: "GET",
    headers: {
      authToken: Cookies.get("authToken"),
    },
  };
  const store_id = Cookies.get("user_id");
  const response = await fetch(
    // `http://localhost:5000/api/all-users`,
    // `${import.meta.env.VITE_API_URL}ratings/store/${store_id}`,
    `${import.meta.env.VITE_API_URL}ratings/average/${store_id}`,
    // `${import.meta.env.VITE_API_URL}ratings/average/2`,

    requestOptions
  );
  const res = await response.json();
  return res;
};
