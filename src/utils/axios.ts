
import axios, { AxiosResponse } from 'axios';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log(config);
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use((response:AxiosResponse) => {
    // Do something with response data
    return response.data;
  }, function (error) {
    // Do something with response error
    let err:string = "Something went wrong";
    const { response : {status,data} } = error;
    if(data){
      err = data;
    }
    return Promise.reject(err);
  });

export default axios;