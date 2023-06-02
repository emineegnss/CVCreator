import axios from "axios";

const fetchEducations = async (userId, token) => {
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
      "https://localhost:44343/api/educations",
      config
    );
    const educations = response.data;
    return educations;
  } catch (error) {
    console.error("Error fetching educations:", error);
  }
};

export default fetchEducations;
