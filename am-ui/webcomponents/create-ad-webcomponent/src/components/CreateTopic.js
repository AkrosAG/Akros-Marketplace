import ApiClient from "../api/src/ApiClient";
import axios from 'axios'

export default class CreateTopic {

  constructor(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;
  }

  topicsPost(files, topics, thumbnail) {
    const formData = new FormData();
    formData.append("topics", JSON.stringify(topics));
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }
    formData.append("thumbnail", thumbnail);
    const token = this.apiClient.authentications['bearerAuth'].accessToken
    axios.post("/topics", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Accept": "multipart/form-data",
        "Authorization": "Bearer " + token
      },
    })
  }
}
