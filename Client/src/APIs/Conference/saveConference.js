import axios from "axios";

const saveConference = async (
  editingIndex,
  conferencesAndSeminarsData,
  userId,
  token
) => {
  if (editingIndex !== null) {
    const editedConference = conferencesAndSeminarsData;

    const data = {
      name: editedConference.name,
      date: editedConference.date,
      location: editedConference.location,
      description: editedConference.description,
      file: editedConference.file,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        conferenceId: editedConference.id,
      },
    };

    await axios
      .put(`https://localhost:44343/api/conferences`, data, config)
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  } else {
    const newConference = {
      name: conferencesAndSeminarsData.name,
      date: conferencesAndSeminarsData.date,
      location: conferencesAndSeminarsData.location,
      description: conferencesAndSeminarsData.description,
      file: conferencesAndSeminarsData.file,
    };

    const formData = new FormData();
    formData.append("name", newConference.name);
    formData.append("date", newConference.date);
    formData.append("location", newConference.location);
    formData.append("description", newConference.description);
    formData.append("file", newConference.file);

    console.log(formData);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      params: {
        userId: userId,
      },
    };

    console.log(newConference);

    await axios
      .post("https://localhost:44343/api/conferences", formData, config)
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  }
};

export default saveConference;
