import axios from "axios";

const fetchHobbies = async (userId, token) => {
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
      "https://localhost:44343/api/hobbies",
      config
    );
    const hobbies = response.data;
    return hobbies;
  } catch (error) {
    console.error("Error fetching hobbies:", error);
    return [];
  }
};

export default fetchHobbies;
