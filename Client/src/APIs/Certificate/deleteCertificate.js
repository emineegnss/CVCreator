import axios from "axios";

const deleteCertificate = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      certificateId: id,
    },
  };

  try {
    await axios.delete(`https://localhost:44343/api/certificates`, config);
  } catch (error) {
    console.error("Error deleting certificates:", error);
  }
};

export default deleteCertificate;
