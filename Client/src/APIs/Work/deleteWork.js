import axios from "axios";

const deleteWork = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      workId: id,
    },
  };

  try {
    await axios.delete(`https://localhost:44343/api/works`, config);
  } catch (error) {
    console.error("Error deleting work:", error);
  }
};

export default deleteWork;
