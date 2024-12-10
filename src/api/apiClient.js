import axios from "axios";

const BASE_URL = "https://bo.delivo.ge/delivo_test/hs";
const BOT_TOKEN = "7430139533:AAHuB49MAR9wGL0o3Zz9clbDIytpYEeP_H4";
const USERNAME = "telegram_bot";
const PASSWORD = "657152";
console.log(BOT_TOKEN);

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `${BOT_TOKEN}`,
    "Content-Type": "application/json",
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
