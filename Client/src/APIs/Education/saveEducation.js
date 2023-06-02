import axios from "axios";

const saveEducation = async (educationData, token, userId, editingIndex) => {
  if (editingIndex !== null) {
    const editedEducation = educationData;

    const data = {
      educationDegree: editedEducation.educationDegree,
      schoolName: editedEducation.schoolName,
      department: editedEducation.department,
      startDate: editedEducation.startDate,
      finishDate: editedEducation.finishDate,
      isContinuing: editedEducation.isContinuing,
      gradingSystem: editedEducation.gradingSystem,
      grade: editedEducation.grade,
      educationLanguage: editedEducation.educationLanguage,
      description: editedEducation.description,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        educationId: editedEducation.id,
      },
    };

    await axios
      .put(`https://localhost:44343/api/educations`, data, config)
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  } else {
    const newEducation = {
      educationDegree: educationData.educationDegree,
      schoolName: educationData.schoolName,
      department: educationData.department,
      startDate: educationData.startDate,
      finishDate: educationData.finishDate,
      isContinuing: educationData.isContinuing,
      gradingSystem: educationData.gradingSystem,
      grade: educationData.grade,
      educationLanguage: educationData.educationLanguage,
      description: educationData.description,
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
      .post("https://localhost:44343/api/educations", newEducation, config)
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  }
};

export default saveEducation;
