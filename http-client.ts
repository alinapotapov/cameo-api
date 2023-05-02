import axios from "axios";
const coreApi = axios.create({
  baseURL: import.meta.env.VITE_URL
});


export { coreApi };