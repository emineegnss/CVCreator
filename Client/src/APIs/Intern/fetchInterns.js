import axios from "axios";

const fetchInterns = async (userId, token) => {
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
      "https://localhost:44343/api/internships",
      config
    );
    const interns = response.data;
    return interns;
  } catch (error) {
    console.error("Error fetching internships:", error);
  }
};

export default fetchInterns;
