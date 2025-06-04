import Cookies from "js-cookie";
// export const Register = async (values) => {
// console.log("Register",values)

//   const requestOptions = {
//     method: "POST",
//     body: JSON.stringify(values),
//   };

//   const response = await fetch(
//     `http://localhost:5000/api/auth/user/signup`,
//     requestOptions
//   );
//   const res = await response.json();
//   return res;
// };

export const Register = async (values) => {
  console.log("Register", values);

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  };

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}user/signup`,
    requestOptions
  );

  const res = await response.json();
  return res;
};

export const Loging = async (values) => {
  console.log("Loging", values);
  // const formData = new FormData();
  // formData.append("name", values.username);
  // formData.append("email", values.email);
  //   formData.append("address", values.address);
  // formData.append("password", values.password);

  // const requestOptions = {
  //   method: "POST",
  //   body: formData,
  // };
 
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  };

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}user/login`,
    requestOptions
  );
  const res = await response.json();
  return res;
};

export const AddUser = async (values) => {
  console.log("AddUser", values);
  // const formData = new FormData();
  // formData.append("user_name", values.username);
  // formData.append("email", values.email);
  // formData.append("address", values.address);
  // formData.append("password", values.password);

  // const requestOptions = {
  //   method: "POST",
  //   body: formData,
  // };
   const requestOptions = {
    method: "POST",
    headers: {
      authToken: Cookies.get("authToken"),
      "Content-Type": "application/json",
    },
    
    body: JSON.stringify(values),
  };

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}create-user/signup`,
    requestOptions
  );
  const res = await response.json();
  return res;
};

export const AddStore = async (values) => {
  // console.log("AddStore", values);
  // const formData = new FormData();
  // formData.append("name", values.name);
  // formData.append("email", values.email);
  // formData.append("address", values.address);
  // formData.append("password", values.password);

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  };

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}store-owner/signup`,
    requestOptions
  );
  const res = await response.json();
  return res;
};

export const AddSRating = async (values) => {
  console.log("AddSRating", values);
  // const formData = new FormData();
  // formData.append("name", values.name);
  // formData.append("email", values.email);
  // formData.append("address", values.address);
  // formData.append("password", values.password);
 const userid = Cookies?.get("user_id") 
 const store_id = values?.store_id;
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  };

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}ratings/${userid}/${store_id}`,
    requestOptions
  );
  const res = await response.json();
  return res;
};

export const DeleteStore = async (values) => {
  console.log("DeleteStore", values);
  // const formData = new FormData();
  // formData.append("name", values.name);
  // formData.append("email", values.email);
  // formData.append("address", values.address);
  // formData.append("password", values.password);
const userid= Cookies.get("user_id")
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  };

  const response = await fetch(
    // `${import.meta.env.VITE_API_URL}ratings/${userid}/${values?.id}`,
    `${import.meta.env.VITE_API_URL}store-owners/${values?.id}`,

    requestOptions
  );
  const res = await response.json();
  return res;
};

export const DeleteUser = async (values) => {
  console.log("DeleteUser", values);
  // const formData = new FormData();
  // formData.append("name", values.name);
  // formData.append("email", values.email);
  // formData.append("address", values.address);
  // formData.append("password", values.password);

  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  };

  const response = await fetch(
    // `${import.meta.env.VITE_API_URL}ratings/${userid}/${values?.id}`,
    `${import.meta.env.VITE_API_URL}admins/${values.id}`,

    requestOptions
  );
  const res = await response.json();
  return res;
};

