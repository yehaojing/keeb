import axios from "../utils/apiClient";

const baseUrl = "/images";

const postImage = (images) => {
  const request = axios.post(baseUrl, { file: images }, {
    headers: {
      "accept": "application/json",
      "Accept-Language": "en-US,en;q=0.8",
      "Content-Type": `multipart/form-data; boundary=${images._boundary}`,
    }
  });
  return request.then((response) => response.data);
};

const exportedObject = {
  postImage
};

export default exportedObject;