import axios from "axios";

const deleteLanguageSkill = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      languageSkillId: id,
    },
  };
  try {
    await axios.delete("https://localhost:44343/api/languageskills", config);
  } catch (error) {
    console.error("Error deleting languageSkill:", error);
  }
};

export default deleteLanguageSkill;
