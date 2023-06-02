import axios from "axios";

const deleteHobby = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      hobbyId: id,
    },
  };

  try {
    await axios.delete(`https://localhost:44343/api/hobbies`, config);
  } catch (error) {
    console.error("Error deleting hobby:", error);
  }
};

export default deleteHobby;
