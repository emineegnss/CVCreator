import axios from "axios";

const saveLanguageSkill = async (
  editingIndex,
  languageSkillData,
  userId,
  token
) => {
  if (editingIndex !== null) {
    const editedLanguageSkill = languageSkillData;
    const data = {
      foreignLanguage: editedLanguageSkill.foreignLanguage,
      speakingLevel: editedLanguageSkill.speakingLevel,
      listeningLevel: editedLanguageSkill.listeningLevel,
      readingLevel: editedLanguageSkill.readingLevel,
      writingLevel: editedLanguageSkill.writingLevel,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        languageSkillId: editedLanguageSkill.id,
      },
    };
    await axios
      .put("https://localhost:44343/api/languageskills", data, config)
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  } else {
    const newLanguageSkill = {
      foreignLanguage: languageSkillData.foreignLanguage,
      speakingLevel: languageSkillData.speakingLevel,
      listeningLevel: languageSkillData.listeningLevel,
      readingLevel: languageSkillData.readingLevel,
      writingLevel: languageSkillData.writingLevel,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        userId: userId,
      },
    };

    await axios
      .post(
        "https://localhost:44343/api/languageskills",
        newLanguageSkill,
        config
      )
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  }
};

export default saveLanguageSkill;
