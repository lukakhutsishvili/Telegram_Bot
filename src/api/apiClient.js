import axios from "axios";

const BASE_URL = import.meta.env.BASE_URL;
const BOT_TOKEN = import.meta.env.BOT_TOKEN;
const USERNAME = import.meta.env.API_USERNAME;
const PASSWORD = import.meta.env.API_PASSWORD;

const apiClient = axios.create({
  baseURL: `bot${BOT_TOKEN} + ${BASE_URL}`,
  auth: {
    username: USERNAME,
    password: PASSWORD,
  },
});

export const getRequest = async (url, params) => {
  try {
    const response = await apiClient.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("GET Request failed:", error);
    throw error;
  }
};

export const postRequest = async (url, data) => {
  try {
    const response = await apiClient.post(url, data);
    return response.data;
  } catch (error) {
    console.error("POST Request failed:", error);
    throw error;
  }
};
