import axios from "axios";

const deleteConference = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      conferenceId: id,
    },
  };

  try {
    await axios.delete(`https://localhost:44343/api/conferences`, config);
  } catch (error) {
    console.error("Error deleting conferences:", error);
  }
};

export default deleteConference;
