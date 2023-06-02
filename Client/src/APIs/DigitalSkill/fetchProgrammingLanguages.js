import axios from "axios";

export const fetchProgrammingLanguages = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      "https://localhost:44343/api/programminglanguages",
      config
    );
    const languages = response.data;
    return languages;
  } catch (error) {
    console.error("Error fetching languages:", error);
    return [];
  }
};
