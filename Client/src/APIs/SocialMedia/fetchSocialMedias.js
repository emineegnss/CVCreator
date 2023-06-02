import axios from "axios";

const fetchSocialMedias = async (userId, token) => {
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
      "https://localhost:44343/api/socialmedia",
      config
    );

    const socialMedias = response.data;
    return socialMedias;
  } catch (error) {
    console.error("Error fetching socialMedia:", error);
  }
};

export default fetchSocialMedias;
