import axios from "axios";

const saveCertificate = async (
  editingIndex,
  certificatesData,
  userId,
  token
) => {
  if (editingIndex !== null) {
    const editedCertificate = certificatesData;

    const data = {
      name: editedCertificate.name,
      organization: editedCertificate.organization,
      date: editedCertificate.date,
      description: editedCertificate.description,
      file: editedCertificate.file,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        certificateId: editedCertificate.id,
      },
    };

    await axios
      .put(`https://localhost:44343/api/certificates`, data, config)
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  } else {
    const newCertificates = {
      name: certificatesData.name,
      organization: certificatesData.organization,
      date: certificatesData.date,
      description: certificatesData.description,
      file: certificatesData.file,
    };

    const formData = new FormData();
    formData.append("name", newCertificates.name);
    formData.append("date", newCertificates.date);
    formData.append("organization", newCertificates.organization);
    formData.append("description", newCertificates.description);
    formData.append("file", newCertificates.file);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      params: {
        userId: userId,
      },
    };

    await axios
      .post("https://localhost:44343/api/certificates", formData, config)
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  }
};

export default saveCertificate;
