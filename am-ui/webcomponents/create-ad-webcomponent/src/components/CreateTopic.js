import ApiClient from "../api/src/ApiClient";
import axios from 'axios'

export default class CreateTopic {

  constructor(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;
  }

  topicsPost(files, topics) {
    console.log(topics);
    console.log("fiiiiiiiiiiilesssssssss", files);

    const formData = new FormData();
    formData.append("files", this.files);
   // formData.append("topics", this.topics);
    const token = this.apiClient.authentications['bearerAuth'].accessToken

    axios.post("/topics", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Accept": "multipart/form-data",
        "Authorization": "Bearer " + token
      },

    })
      .then(function (result) {
        console.log(result)
      }, function (error) {
        console.log(error);
      })

  }
}
