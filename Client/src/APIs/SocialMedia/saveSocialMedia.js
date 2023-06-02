import axios from "axios";

const saveSocialMedia = async (
  editingIndex,
  socialMediaData,
  userId,
  token
) => {
  if (editingIndex !== null) {
    const editedSocialMedia = socialMediaData;
    const data = {
      socialMediaToolName: editedSocialMedia.socialMediaToolName,
      url: editedSocialMedia.url,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        socialMediaId: editedSocialMedia.id,
      },
    };

    await axios
      .put(`https://localhost:44343/api/socialmedia`, data, config)
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  } else {
    const newSocialMedia = {
      socialMediaToolName: socialMediaData.socialMediaToolName,
      url: socialMediaData.url,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        userId: userId,
      },
    };

    await axios
      .post(`https://localhost:44343/api/socialmedia`, newSocialMedia, config)
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  }
};

export default saveSocialMedia;
