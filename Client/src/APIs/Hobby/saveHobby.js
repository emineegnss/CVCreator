import axios from "axios";

const saveHobby = async (
  editingIndex,
  interestsAndHobbiesData,
  userId,
  token
) => {
  if (editingIndex !== null) {
    const editedHobby = interestsAndHobbiesData;

    const data = {
      name: editedHobby.name,
      description: editedHobby.description,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        hobbyId: editedHobby.id,
      },
    };

    try {
      await axios.put(`https://localhost:44343/api/hobbies`, data, config);
    } catch (error) {
      console.error(error);
    }
  } else {
    const newHobby = {
      name: interestsAndHobbiesData.name,
      description: interestsAndHobbiesData.description,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        userId: userId,
      },
    };

    try {
      await axios.post("https://localhost:44343/api/hobbies", newHobby, config);
    } catch (error) {
      console.error(error);
    }
  }
};

export default saveHobby;
