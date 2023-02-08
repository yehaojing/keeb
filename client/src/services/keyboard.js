import axios from '../utils/apiClient'

const getAll = () => {
  const request = axios.get("/");
  return request.then((response) => response.data);
};

const postNewKeyboard = (newKeyboard) => {
  const request = axios.post("/", newKeyboard);
  return request.then((response) => response.data);
};

const deleteKeyboard = (id) => {
  const deleteRequest = axios.delete(`/${id}`);

  return deleteRequest.then((response) => response.data);
};

const exportedObject = {
  getAll,
  postNewKeyboard,
  deleteKeyboard,
};

export default exportedObject;
