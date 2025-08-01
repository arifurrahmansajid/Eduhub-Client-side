import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://b10-a12-server-main.vercel.app",
  // baseURL: "http://localhost:5050",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
