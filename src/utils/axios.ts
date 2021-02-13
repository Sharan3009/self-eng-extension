
import axios, { AxiosResponse } from 'axios';
import { getAuthHeader, setTokenInStorage } from './helperFunctions';
const baseUrl:string = process.env.REACT_APP_DOMAIN as string;
const apiVersion:string = process.env.REACT_APP_API_VERSION as string;

// Add a request interceptor
axios.interceptors.request.use( async (config) => {
    config.baseURL = `${baseUrl}${apiVersion}`;
    // Do something before request is sent
    config.headers = {
      ...await getAuthHeader()
    };
    return config;
  }, (error) => {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use((response:AxiosResponse) => {
    // Do something with response data
    setTokenInStorage(response.headers);
    return response.data;
  }, (error) => {
    // Do something with response error
    let err:string = "Something went wrong";
    try{
      const { response : {status,data,headers} } = error;
      if(data){
        err = data;
      }
      if(headers){
        setTokenInStorage(headers);
      }
    } catch(e:any){}

    return Promise.reject(err);
  });

export default axios;