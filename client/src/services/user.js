import axios from "../utils/apiClient";
const baseUrl = "/users";

const login = async (username, password, access_token_expire_minutes = 60) => {
  const response = await axios.post(
    `${baseUrl}/token?access_token_expire_minutes=${access_token_expire_minutes}`,
    new URLSearchParams({
      username,
      password,
    })
  );
  return response.data;
};

const createUser = async (username, password, fullName, email) => {
  const response = await axios.post(baseUrl, {
    username,
    password,
    fullName,
    email
  });
  return response.data;
};

const exportedObject = {
  login,
  createUser
};

export default exportedObject;
