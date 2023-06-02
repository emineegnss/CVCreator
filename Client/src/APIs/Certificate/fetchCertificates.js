import axios from "axios";

const byteArrayToBlob = (fileData) => {
  const byteCharacters = atob(fileData);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};

const fetchCertificates = async (userId, token) => {
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
      "https://localhost:44343/api/certificates",
      config
    );
    const certificates = response.data;

    const updatedCertificates = certificates.map((certificate) => {
      if (certificate.fileData) {
        const url = byteArrayToBlob(certificate.fileData);
        return {
          ...certificate,
          fileUrl: url,
        };
      }
      return certificate;
    });
    return updatedCertificates;
  } catch (error) {
    console.error("Error fetching certificates:", error);
  }
};

export default fetchCertificates;
