import axios from "axios";

const deleteEducation = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      educationId: id,
    },
  };

  try {
    await axios.delete(`https://localhost:44343/api/educations`, config);
  } catch (error) {
    console.error("Error deleting education:", error);
  }
};

export default deleteEducation;
