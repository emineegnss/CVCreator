import axios from "axios";

const fetchReferences = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      userId: userId,
    },
  };
  try {
    const response = await axios.get(
      "https://localhost:44343/api/references",
      config
    );
    const references = response.data;
    return references;
  } catch (error) {
    console.error("Error fetching references:", error);
  }
};

export default fetchReferences;
