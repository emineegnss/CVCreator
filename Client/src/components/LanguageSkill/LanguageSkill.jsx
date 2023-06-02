import React, { useState, useEffect } from "react";
import { Button, Box, Typography } from "@mui/material";
import LanguageSkillTable from "./LanguageSkillTable";
import LanguageSkillDialog from "./LanguageSkillDialog";
import fetchLanguageSkill from "../../APIs/LanguageSkill/fetchLanguageSkills";
import saveLanguageSkill from "../../APIs/LanguageSkill/saveLanguageSkill";
import deleteLanguageSkill from "../../APIs/LanguageSkill/deleteLanguageSkill";
import { useNavigate } from "react-router-dom";

const LanguageSkill = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [languageSkills, setLanguageSkills] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const [languageSkillData, setLanguageSkillData] = useState({
    id: "",
    foreignLanguage: "",
    speakingLevel: "",
    listeningLevel: "",
    readingLevel: "",
    writingLevel: "",
  });

  useEffect(() => {
    fetchLanguageSkillData();
  }, []);

  const fetchLanguageSkillData = async () => {
    const languageSkills = await fetchLanguageSkill(userId, token);
    setLanguageSkills(languageSkills);
  };

  const handleSaveLanguageSkill = async () => {
    await saveLanguageSkill(editingIndex, languageSkillData, userId, token);
    handleCloseDialog();
    fetchLanguageSkillData();
  };

  const handleDeleteLanguageSkill = async (id) => {
    await deleteLanguageSkill(id, token);
    fetchLanguageSkillData();
  };

  const handleOpenDialog = async () => {
    setOpen(true);
    await fetchLanguageSkill();
    setEditingIndex(null);
    setLanguageSkillData({
      foreignLanguage: "",
      speakingLevel: "",
      listeningLevel: "",
      readingLevel: "",
      writingLevel: "",
    });
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setLanguageSkillData({
      foreignLanguage: "",
      speakingLevel: "",
      listeningLevel: "",
      readingLevel: "",
      writingLevel: "",
    });
  };

  const handleChange = (event) => {
    setLanguageSkillData({
      ...languageSkillData,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditLanguageSkill = (skill) => {
    setLanguageSkillData({
      id: skill.id,
      foreignLanguage: skill.foreignLanguage,
      speakingLevel: skill.speakingLevel,
      listeningLevel: skill.listeningLevel,
      readingLevel: skill.readingLevel,
      writingLevel: skill.writingLevel,
    });
    setEditingIndex(skill.id);
    setOpen(true);
  };

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Dil Becerileri
      </Typography>

      <hr />
      {languageSkills.length === 0 ? (
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
          Yabancı Dil Ekle
        </Button>
      ) : (
        <>
          <LanguageSkillTable
            languageSkills={languageSkills}
            handleDeleteLanguageSkill={handleDeleteLanguageSkill}
            handleEditLanguageSkill={handleEditLanguageSkill}
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
            Başka Bir Yabancı Dil Ekle
          </Button>
        </>
      )}

      <LanguageSkillDialog
        open={open}
        handleCloseDialog={handleCloseDialog}
        editingIndex={editingIndex}
        languageSkillData={languageSkillData}
        handleChange={handleChange}
        handleSaveLanguageSkill={handleSaveLanguageSkill}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="outlined" onClick={() => navigate("/digitalskills")}>
          Geri Dön
        </Button>
        <Button variant="contained" onClick={() => navigate("/intern")}>
          İleri
        </Button>
      </Box>
    </div>
  );
};

export default LanguageSkill;
