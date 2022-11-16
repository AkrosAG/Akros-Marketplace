import axios from 'axios';
import ApiClient from "../api/src/ApiClient";

export default class CreateTopic {

  constructor(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;
  }

  topicsPost(files, topics, thumbnail) {
    let formData = new FormData();
    formData.append("topics", JSON.stringify(topics));

    for (let i = 0; i < thumbnail.length; i++) {
      formData.append("thumbnail", thumbnail[i]);
    }

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    const token = this.apiClient.authentications['bearerAuth'].accessToken
    return axios.post("/topics", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Accept": "application/json , text/plain, */*",
          "Authorization": "Bearer " + token
        },
      }).then(res=>{
        console.log(res);
      },err=> console.error(err));

  }

}
