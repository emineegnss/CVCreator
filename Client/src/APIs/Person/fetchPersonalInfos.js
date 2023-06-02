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

  const blob = new Blob(byteArrays, { type: "image/png" });
  const url = URL.createObjectURL(blob);
  return url;
};

const fetchPersonalInfos = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      id: userId,
    },
  };
  try {
    const response = await axios.get(
      "https://localhost:44343/api/person",
      config
    );
    const personalInfo = response.data;

    if (personalInfo.imageFile) {
      const url = byteArrayToBlob(personalInfo.imageFile);
      return {
        ...personalInfo,
        fileUrl: url,
      };
    }
    return personalInfo;
  } catch (error) {
    console.error("Kişisel bilgiler getirilirken hata oluştu:", error);
    return null;
  }
};

export default fetchPersonalInfos;
