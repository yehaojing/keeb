import axios from "../utils/apiClient";
const baseUrl = "/users/token";

const login = async (username, password, access_token_expire_minutes=60) => {
  const response = await axios.post(
    `${baseUrl}?access_token_expire_minutes=${access_token_expire_minutes}`,
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
