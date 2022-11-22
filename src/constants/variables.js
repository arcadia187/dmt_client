import localStorage from "redux-persist/es/storage";
import axios from "axios";
export let server_url = process.env.REACT_APP_SERVER_URL;
export const axiosInstance = axios.create({
  baseURL: server_url,
  timeout: 1000,
  headers: {
    token: "Bearer " + localStorage?.accesstoken,
  },
});
