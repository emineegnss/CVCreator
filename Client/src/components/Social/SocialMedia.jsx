import React, { useState, useEffect } from "react";
import { Button, Box } from "@mui/material";
import fetchSocialMedias from "../../APIs/SocialMedia/fetchSocialMedias";
import deleteSocialMedia from "../../APIs/SocialMedia/deleteSocialMedia";
import SocialMediaTable from "./SocialMediaTable";
import SocialMediaDialog from "./SocialMediaDialog";
import saveSocialMedia from "../../APIs/SocialMedia/saveSocialMedia";
import { useNavigate } from "react-router-dom";

const SocialMedia = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [socialMediaLinks, setSocialMediaLinks] = useState([]);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
  const [socialMediaData, setSocialMediaData] = useState({
    id: "",
    socialMediaToolName: "",
    url: "",
  });

  useEffect(() => {
    fetchSocialMediaData();
  }, []);

  const fetchSocialMediaData = async () => {
    const socialMedias = await fetchSocialMedias(userId, token);
    setSocialMediaLinks(socialMedias);
  };

  const handleOpenDialog = () => {
    setOpen(true);
    fetchSocialMediaData();
    setEditingIndex(null);
    setSocialMediaData({
      socialMediaToolName: "",
      url: "",
    });
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSocialMediaData({
      socialMediaToolName: "",
      url: "",
    });
  };

  const handleChange = (event) => {
    setSocialMediaData({
      ...socialMediaData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSaveSocialMediaLink = async () => {
    await saveSocialMedia(editingIndex, socialMediaData, userId, token);
    handleCloseDialog();
    fetchSocialMediaData();
  };

  const handleEditSocialMedia = (tool) => {
    setSocialMediaData({
      id: tool.id,
      socialMediaToolName: tool.socialMediaToolName,
      url: tool.url,
    });
    setEditingIndex(tool.id);
    setOpen(true);
  };
  const handleDeleteSocialDelete = async (id) => {
    await deleteSocialMedia(id, token);
    fetchSocialMediaData();
  };

  return (
    <div>
      {socialMediaLinks.length === 0 ? (
        <Button
          variant="outlined"
          style={{
            margin: "auto",
            display: "block",
            width: "100%",
            height: "40px",
            backgroundColor: "#f5f5f5",
            color: "rgba(0, 0, 0, 0.7)",
            borderColor: "rgba(0, 0, 0, 0.3)",
          }}
          onClick={handleOpenDialog}
        >
          Sosyal Medya Aracı Ekle
        </Button>
      ) : (
        <>
          <SocialMediaTable
            socialMediaLinks={socialMediaLinks}
            handleDeleteSocialMedia={handleDeleteSocialDelete}
            handleEditSocialMedia={handleEditSocialMedia}
          />

          <Button
            variant="outlined"
            style={{
              margin: "auto",
              display: "block",
              width: "100%",
              height: "40px",
              backgroundColor: "#f5f5f5",
              color: "rgba(0, 0, 0, 0.7)",
              borderColor: "rgba(0, 0, 0, 0.3)",
            }}
            onClick={handleOpenDialog}
          >
            Başka Sosyal Medya Aracı Ekle
          </Button>
        </>
      )}
      <SocialMediaDialog
        open={open}
        handleCloseDialog={handleCloseDialog}
        socialMediaData={socialMediaData}
        handleChange={handleChange}
        handleSaveSocialMediaLink={handleSaveSocialMediaLink}
        editingIndex={editingIndex}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="outlined" onClick={() => navigate("/hobby")}>
          Geri Dön
        </Button>

        <Button variant="contained" onClick={() => navigate("/reference")}>
          İleri
        </Button>
      </Box>
    </div>
  );
};

export default SocialMedia;
