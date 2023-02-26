import axios from "../utils/apiClient";
const baseUrl = "/users/token";

const login = async (username, password) => {
  const response = await axios.post(
    baseUrl,
    new URLSearchParams({
      username,
      password,
    })
  );
  return response.data;
};

const exportedObject = {
  login,
};

export default exportedObject;
