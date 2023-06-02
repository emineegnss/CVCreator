import axios from "axios";

const saveIntern = async (internshipData, token, userId, editingIndex) => {
  if (editingIndex !== null) {
    const editedInternship = internshipData;
    const data = {
      companyName: editedInternship.companyName,
      department: editedInternship.department,
      position: editedInternship.position,
      startDate: editedInternship.startDate,
      isContinuing: editedInternship.isContinuing,
      endDate: editedInternship.endDate,
      projects: editedInternship.projects,
      languages: editedInternship.languages,
      projectDetails: editedInternship.projectDetails,
      country: editedInternship.country,
      city: editedInternship.city,
      companyAddress: editedInternship.companyAddress,
      companyPhoneNumber: editedInternship.companyPhoneNumber,
      description: editedInternship.description,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        internshipId: editedInternship.id,
      },
    };
    await axios
      .put(`https://localhost:44343/api/internships`, data, config)
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  } else {
    const newInternship = {
      companyName: internshipData.companyName,
      department: internshipData.department,
      position: internshipData.position,
      startDate: internshipData.startDate,
      isContinuing: internshipData.isContinuing,
      endDate: internshipData.endDate,
      projects: internshipData.projects,
      languages: internshipData.languages,
      projectDetails: internshipData.projectDetails,
      country: internshipData.country,
      city: internshipData.city,
      companyAddress: internshipData.companyAddress,
      companyPhoneNumber: internshipData.companyPhoneNumber,
      description: internshipData.description,
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
      .post("https://localhost:44343/api/internships", newInternship, config)
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  }
};

export default saveIntern;
