import axios from "axios";

export const fetchDigitalSkill = async (userId, token) => {
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
      "https://localhost:44343/api/digitalskills",
      config
    );
    const skills = response.data;
    return skills;
  } catch (error) {
    console.error("Error fetching skills:", error);
  }
};
