import axios from "axios";

const fetchLanguageSkills = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      userId: userId,
    },
  };
  try {
    const response = await axios.get(
      "https://localhost:44343/api/languageskills",

      config
    );
    const languages = response.data;
    return languages;
  } catch (error) {
    console.error("Error fetching LaguageSkill:", error);
  }
};

export default fetchLanguageSkills;
