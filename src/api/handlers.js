import { getRequest } from "./apiClient";

export const handleSignIn = async (telegramID) => {
  try {
    console.log(telegramID);
    if (telegramID) {
      const response = await getRequest("/bot/auth", { telegramID });
      console.log(response);
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};
