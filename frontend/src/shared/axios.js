import axios from "axios";

// Token이 필요하지 않은 axios instance
export const api = axios.create({
  // baseURL: process.env.REACT_APP_API,
  baseURL: 'http://127.0.0.1:8000/',
  // withCredentials: false,
  responseType: "json",
  headers: {
      "Content-Type": "application/json"
  }
});

// Token이 필요한 axios instance
export const authApi = axios.create({
  // baseURL: process.env.REACT_APP_API,
  baseURL: 'http://127.0.0.1:8000/',
  // withCredentials: false,
  headers: {
      "Content-Type": "application/json",
      "Authorization": "Token " + localStorage.getItem("token")
    }
});