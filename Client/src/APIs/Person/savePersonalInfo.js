import axios from "axios";

const savePersonalInfo = async (token, userId, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };
  const newPerson = {
    name: data.name,
    surname: data.surname,
    phoneNumber: data.phoneNumber,
    gender: data.gender,
    nationality: data.nationality,
    about: data.about,
    identityNumber: data.identityNumber,
    livingCountry: data.livingCountry,
    livingCity: data.livingCity,
    address: data.address,
    file: data.file,
  };

  const formData = new FormData();
  formData.append("name", newPerson.name);
  formData.append("surname", newPerson.surname);
  formData.append("phoneNumber", newPerson.phoneNumber);
  formData.append("gender", newPerson.gender);
  formData.append("nationality", newPerson.nationality);
  formData.append("about", newPerson.about);
  formData.append("identityNumber", newPerson.identityNumber);
  formData.append("livingCountry", newPerson.livingCountry);
  formData.append("livingCity", newPerson.livingCity);
  formData.append("address", newPerson.address);
  formData.append("file", newPerson.file);

  return await axios.post(
    `https://localhost:44343/api/person?id=${userId}`,
    formData,
    config
  );
};

export default savePersonalInfo;
