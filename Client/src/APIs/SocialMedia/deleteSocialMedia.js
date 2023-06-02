import axios from "axios";

const deleteSocialMedia = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      socialMediaId: id,
    },
  };

  try {
    await axios.delete(`https://localhost:44343/api/socialmedia`, config);
  } catch (error) {
    console.error("Error deleting socialMedia:", error);
  }
};

export default deleteSocialMedia;
