import localStorage from "redux-persist/es/storage";
import axios from "axios";
export let server_url = process.env.REACT_APP_SERVER_URL;
console.log(server_url);
const createAxios = async () => {
  let tokenStr = "";
  tokenStr = JSON.parse(await localStorage.getItem("persist:root")).token;
  // console.log({ token: JSON.parse(await localStorage.getItem("accesstoken")) });
  const accesstoken = tokenStr.replace(/^"(.*)"$/, "$1");
  console.log({ accesstoken });
  return axios.create({
    baseURL: server_url,
    timeout: 15000,
    headers: {
      authorization: `Bearer ${accesstoken}`,
    },
  });
};
export default createAxios;
