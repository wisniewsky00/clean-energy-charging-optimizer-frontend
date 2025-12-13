import axios from "axios";

export const energyMixApi = axios.create({
  baseURL: 'http://localhost:8080/api'
})