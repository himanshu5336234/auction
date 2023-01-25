import Session from "supertokens-auth-react/recipe/session";
import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: "https://auction-api-dev.pahal.cloud",
});

axiosInstance.defaults.headers.common.accept = "*/*";
axios.defaults.headers.common["Access-Control-Allow-Origin"] =
	"http://localhost:3000";
axiosInstance.defaults.headers.common.rid = "anti-csrf";

// wrap the axios instance around Session component for session handling
Session.addAxiosInterceptors(axiosInstance);

const axiosWithApiServer = ({
  url,
  method,
  body = null,
  headers = null,

  isMultiPartData = false,
}) => {
	
  const requestBody = isMultiPartData === true ? body : JSON.parse(body);
  return axiosInstance[method](url, requestBody,headers);
};

export default axiosWithApiServer;

