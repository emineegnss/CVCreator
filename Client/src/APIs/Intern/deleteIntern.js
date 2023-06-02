import axios from "axios";

const deleteIntern = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      internshipId: id,
    },
  };
  try {
    await axios.delete(`https://localhost:44343/api/internships`, config);
  } catch (error) {
    console.error("Error deleting internship:", error);
  }
};

export default deleteIntern;
