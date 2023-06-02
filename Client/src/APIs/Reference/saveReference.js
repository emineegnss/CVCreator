import axios from "axios";

const saveReference = async (editingIndex, referenceData, userId, token) => {
  if (editingIndex !== null) {
    const editedReference = referenceData;

    const data = {
      name: editedReference.name,
      surname: editedReference.surname,
      title: editedReference.title,
      phone: editedReference.phone,
      email: editedReference.email,
      description: editedReference.description,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        referenceId: editedReference.id,
      },
    };

    try {
      await axios.put(`https://localhost:44343/api/references`, data, config);
    } catch (error) {
      console.error(error);
    }
  } else {
    const newReference = {
      name: referenceData.name,
      surname: referenceData.surname,
      title: referenceData.title,
      phone: referenceData.phone,
      email: referenceData.email,
      description: referenceData.description,
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
      await axios.post(
        "https://localhost:44343/api/references",
        newReference,
        config
      );
    } catch (error) {
      console.error(error);
    }
  }
};

export default saveReference;
