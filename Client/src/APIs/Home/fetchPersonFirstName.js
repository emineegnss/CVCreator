import axios from "axios";

const fetchPersonFirstName = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      id: id,
    },
  };
  try {
    const response = await axios.get(
      "https://localhost:44343/api/person/getFirstName",
      config
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default fetchPersonFirstName;
