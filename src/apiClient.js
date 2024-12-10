import axios from "axios";

const BASE_URL = import.meta.env.BASE_URL;
const BOT_TOKEN = import.meta.env.BOT_TOKEN;
const USERNAME = import.meta.env.API_USERNAME;
const PASSWORD = import.meta.env.API_PASSWORD;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${BOT_TOKEN}`,
  },
});

export const authenticateBot = async () => {
  try {
    const response = await apiClient.get("/bot/auth", {
      USERNAME,
      PASSWORD,
    });
    return response.data;
  } catch (error) {
    console.error("Error authenticating bot:", error);
    throw error;
  }
};

export const registerBot = async (phone) => {
  try {
    const response = await apiClient.post("/bot/register_bot", {
      phone,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering bot:", error);
    throw error;
  }
};
