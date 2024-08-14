import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Укажите базовый урл бака чтобы всегда его не прописывать. Можно из env взять
  withCredentials: true, // Это добавь
});

export default api;
