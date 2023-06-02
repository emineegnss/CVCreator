import axios from "axios";

const saveWork = async (editingIndex, workExperiencesData, token, userId) => {
  if (editingIndex !== null) {
    const editedWork = workExperiencesData;

    const data = {
      companyName: editedWork.companyName,
      position: editedWork.position,
      department: editedWork.department,
      isContinuing: editedWork.isContinuing,
      startDate: editedWork.startDate,
      endDate: editedWork.endDate,
      projects: editedWork.projects,
      projectsDetails: editedWork.projectsDetails,
      companyAddress: editedWork.companyAddress,
      companyPhoneNumber: editedWork.companyPhoneNumber,
      description: editedWork.description,
      programmingLanguages: editedWork.programmingLanguages,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        workId: editedWork.id,
      },
    };

    try {
      await axios.put(`https://localhost:44343/api/works`, data, config);
    } catch (error) {
      console.error(error);
    }
  } else {
    const newWork = {
      companyName: workExperiencesData.companyName,
      position: workExperiencesData.position,
      department: workExperiencesData.department,
      isContinuing: workExperiencesData.isContinuing,
      startDate: workExperiencesData.startDate,
      endDate: workExperiencesData.endDate,
      projects: workExperiencesData.projects,
      projectsDetails: workExperiencesData.projectsDetails,
      companyAddress: workExperiencesData.companyAddress,
      companyPhoneNumber: workExperiencesData.companyPhoneNumber,
      description: workExperiencesData.description,
      programmingLanguages: workExperiencesData.programmingLanguages,
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
      await axios.post("https://localhost:44343/api/works", newWork, config);
    } catch (error) {
      console.error(error);
    }
  }
};

export default saveWork;
