import axios from "../utils/apiClient";
const baseUrl = "/posts";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getPost = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const postNewPost = (newPost) => {
  const request = axios.post(baseUrl, newPost);
  return request.then((response) => response.data);
};

const deletePost = (id) => {
  const deleteRequest = axios.delete(`${baseUrl}/${id}`);

  return deleteRequest.then((response) => response.data);
};

const exportedObject = {
  getAll,
  getPost,
  postNewPost,
  deletePost,
};

export default exportedObject;
