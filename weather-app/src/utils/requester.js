import axios from 'axios';

const Requester = (url, method, body, headers) => {
    const request = axios.request({
      method,
      url,
      headers,
      timeout: 30000,
      data: body
    });
    return request
        .then((response) => response.data)
        .catch((e) => {
          throw e;
        })
  };

  export default Requester;