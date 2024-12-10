import axios from "axios";

const BASE_URL = process.env.BASE_URL || "https://bo.delivo.ge/delivo_test/hs";
const BOT_TOKEN =
  process.env.BOT_TOKEN || "7528000704:AAEEgfjfvAhF4dFQcDK5-98wEEb9q9SRFEQ";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `${BOT_TOKEN}`,
  },
});

export const authenticateBot = async (username, password) => {
  try {
    const response = await apiClient.get({ BASE_URL } + "/bot/auth", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error authenticating bot:", error);
    throw error;
  }
};

export const registerBot = async (phone) => {
  try {
    const response = await apiClient.post("/bot/register_bot", { phone });
    return response.data;
  } catch (error) {
    console.error("Error registering bot:", error);
    throw error;
  }
};
