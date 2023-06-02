import axios from "axios";

const deleteReference = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      referenceId: id,
    },
  };

  try {
    await axios.delete(`https://localhost:44343/api/references`, config);
  } catch (error) {
    console.error("Referans silinirken hata oluştu:", error);
  }
};

export default deleteReference;
