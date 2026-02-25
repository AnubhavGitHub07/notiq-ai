//axios for connection between backend and frontend...

import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/api` : "https://notiq-ai-backend.onrender.com/api",
});

// attach token automatically for protected routes!!

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");

    if (token) {
        req.headers.Authorization = `Bearer ${token}`
    }

    return req;
});

export default API;