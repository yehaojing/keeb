import axios from "../utils/apiClient";
const baseUrl = "/posts";

const postNewComment = (postId, newComment) => {
  const request = axios.post(`${baseUrl}/${postId}/comments`, newComment);
  return request.then((response) => response.data);
};

const exportedObject = {
  postNewComment
};

export default exportedObject;
