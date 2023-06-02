import axios from "axios";

export const saveDigitalSkill = async (
  editingIndex,
  skillsData,
  selectedProgrammingLanguage,
  token,
  userId
) => {
  if (editingIndex !== null) {
    const editedSkills = skillsData;

    const data = {
      programmingLanguageIds: editedSkills.programmingLanguages.map(
        (language) => language.id
      ),
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        skillId: editedSkills.id,
      },
    };

    try {
      await axios.put(
        `https://localhost:44343/api/digitalskills`,
        data,
        config
      );
    } catch (error) {
      console.error(error);
    }
  } else {
    const newSkills = {
      programmingLanguageIds: selectedProgrammingLanguage.map(
        (language) => language.id
      ),
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        userId: userId,
      },
    };

    try {
      await axios.post(
        "https://localhost:44343/api/digitalskills",
        newSkills,
        config
      );
    } catch (error) {
      console.error(error);
    }
  }
};
