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

export const getOrder = async () => {
  try {
    const response = await apiClient.get("/bot/getorder");
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};

// export const registerNumber = async (phone) => {
//   const authData = {
//     telegram_id: "6087086146",
//     phone_number: phone,
//     type: "1",
//   };

//   try {
//     const response = await apiClient.post("/bot/register_bot", authData);
//     if (response.status === 200) {
//       return response.data;
//     } else {
//       console.error("Error: Received unexpected status code", response.status);
//       throw new Error("Unexpected response from the server.");
//     }
//   } catch (error) {
//     console.error(
//       "Error registering phone number:",
//       error.response?.data || error.message
//     );
//     throw error;
//   }
// };
