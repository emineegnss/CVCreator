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

const fetchConferences = async (userId, token) => {
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
      "https://localhost:44343/api/conferences",
      config
    );
    const conferences = response.data;

    const updatedConferences = conferences.map((conference) => {
      if (conference.fileData) {
        const url = byteArrayToBlob(conference.fileData);
        return {
          ...conference,
          fileUrl: url,
        };
      }
      return conference;
    });

    return updatedConferences;
  } catch (error) {
    console.error("Error fetching conferences:", error);
  }
};

export default fetchConferences;
