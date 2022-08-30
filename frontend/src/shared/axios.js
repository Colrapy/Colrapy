import axios from "axios";
const API_URL = process.env.REACT_APP_URL;

// Token이 필요하지 않은 axios instance
export const api = axios.create({
  baseURL: API_URL,
  // baseURL: 'http://127.0.0.1:8000/',
  // withCredentials: false,
  responseType: "json",
  headers: {
      "Content-Type": "application/json"
  }
});

// Token이 필요한 axios instance
export const authApi = axios.create({
  baseURL: API_URL,
  // baseURL: 'http://127.0.0.1:8000/',
  // withCredentials: false,
  headers: {
      "Content-Type": "application/json",
      "Authorization": "Token " + localStorage.getItem("token")
    }
});