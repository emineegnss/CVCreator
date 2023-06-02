import axios from "axios";

const fetchWorks = async (userId, token) => {
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
      "https://localhost:44343/api/works",
      config
    );
    const works = response.data;
    return works;
  } catch (error) {
    console.error("Error fetching works:", error);
  }
};

export default fetchWorks;
