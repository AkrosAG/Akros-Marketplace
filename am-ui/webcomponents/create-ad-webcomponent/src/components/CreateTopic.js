import ApiClient from "../api/src/ApiClient";
import axios from 'axios';

export default class CreateTopic {

  constructor(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;
  }

  topicsPost(files, topics, thumbnail) {
    let formData = new FormData();
    formData.append("topics", JSON.stringify(topics));

    formData.append("thumbnail", thumbnail);

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }


    const token = this.apiClient.authentications['bearerAuth'].accessToken
    axios.post("/topics", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Accept": "multipart/form-data",
          "Authorization": "Bearer " + token
        },
      }).then(res=>{
        console.warn(res);
      },err=> console.error(err));

  }

}
