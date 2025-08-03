import axios from "axios"

export const customApiCall = axios.create({
    baseURL: location.hostname == "localhost" ? "http://localhost:8080/api" : "/api",
    withCredentials: true
})