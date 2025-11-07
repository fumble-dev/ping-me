import axios from "axios";
import { HOST } from "./constants.js";

const apiClient = axios.create({
    baseURL:HOST,
    withCredentials:true
})

export default apiClient