
import axios, { AxiosResponse } from 'axios';
import Auth from '../Class/Auth';

// Add a request interceptor
axios.interceptors.request.use( async (config) => {
    // Do something before request is sent
    config.headers = {
      token : await Auth.getToken()
    }
    return config;
  }, (error) => {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use((response:AxiosResponse) => {
    // Do something with response data
    return response.data;
  }, (error) => {
    // Do something with response error
    let err:string = "Something went wrong";
    const { response : {status,data} } = error;
    if(data){
      err = data;
    }
    return Promise.reject(err);
  });

export default axios;