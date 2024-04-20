import axios from "axios";
import { urls } from "../config/urls";
import store from "../redux/store";

export const request = axios.create({
  baseURL: urls.apiBaseUrl + "/api/v1",
  headers: {
    // Authorization: "token faa48f949b6d4ff3dab6c3303a9832a8527a6c94",
    "Accept": "application/json",
    "Content-Type":"application/json" ,
 },

});

export const multipartRequest = axios.create({
  baseURL: urls.apiBaseUrl + "/api/v1",
  headers: {
    "Accept": "application/json",
    "Content-Type":"multipart/form-data"
  }
});

request.interceptors.request.use(
  function (config) {
    const user = store.getState().userState
    if (user?.token) {
      config.headers.Authorization = `token ${user?.token}`
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Interceptor for axiosInstance
request.interceptors.response.use(
  (response) => {
    // TODO: Something if needed
    return Promise.resolve(response);
  },
  async (error) => {
    return Promise.reject(error);
  }
);

multipartRequest.interceptors.request.use(
  function (config) {
    const user = store.getState().userState
    if (user?.token) {
      config.headers.Authorization = `token ${user?.token}`
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Interceptor for axiosInstance
multipartRequest.interceptors.response.use(
  (response) => {
    // TODO: Something if needed
    return Promise.resolve(response);
  },
  async (error) => {
    return Promise.reject(error);
  }
);




// multipartRequest.interceptors.response.use(

//   (response) => response,
//   async(error) => {

//     if (error.response && error.response.status === 401) {
    
//       await localStorage.clear();
//       window.location.href = '/login';

//       console.log("....................401....Found")
     
     
//     }

//     return Promise.reject('error on multipartRequest.interceptors.................',error);
//   }
// );


multipartRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {

      if (error.response.status === 401) {
        await localStorage.clear();
        window.location.href = '/login';
        console.log('401 Found');
      } 
      else if (error.response.status === 400) {
        const errorMessage = error.response.data.message;
        console.log('400 Bad Request:', errorMessage);
      }
      
    }
    return Promise.reject(error);
  }
);


// request.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response && error.response.status === 401) {

//       await localStorage.clear();
//       window.location.href = '/login';

//       console.log('401 Found ......................................')
//     }
//     // return Promise.reject('error on request.interceptors.................',error);
//   }
// );



request.interceptors.response.use(
  (response) => response,
  async (error) => {
        if (error.response) {

      if (error.response.status === 401) {
                await localStorage.clear();
        window.location.href = '/login';
        console.log('401 Found');
      } 
      else if (error.response.status === 400) {
        const errorMessage = error.response.data.message;
        console.log('400 Bad Request:', errorMessage);
      }

    }
    return Promise.reject(error);
  }
);

// 201
// 200
// 406

