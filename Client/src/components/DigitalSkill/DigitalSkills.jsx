import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField, Chip } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { fetchDigitalSkill } from "../../APIs/DigitalSkill/fetchDigitalSkill";
import { saveDigitalSkill } from "../../APIs/DigitalSkill/saveDigitalSkill";
import { fetchProgrammingLanguages } from "../../APIs/DigitalSkill/fetchProgrammingLanguages";
import { useNavigate } from "react-router-dom";

function DigitalSkills() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedProgrammingLanguage, setSelectedProgrammingLanguage] =
    useState([]);
  const [programmingLanguages, setProgrammingLanguages] = useState([]);
  const [skillsData, setSkillsData] = useState({
    id: "",
    programmingLanguages: [],
  });

  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchDigitalSkillData();
    fetchProgrammingLanguageData();
  }, []);

  const fetchDigitalSkillData = async () => {
    const digitalSkills = await fetchDigitalSkill(userId, token);
    const selectedLanguages = digitalSkills.map((skill) => ({
      id: skill.id,
      name: skill.name,
    }));
    setSelectedProgrammingLanguage(selectedLanguages);
  };

  const handleLanguageChange = (event, value) => {
    const selectedLanguages = value.map((language) => ({
      id: language.id,
      name: language.name,
    }));
    setSelectedProgrammingLanguage(selectedLanguages);
  };

  const handleSaveSkills = async () => {
    await saveDigitalSkill(
      editingIndex,
      skillsData,
      selectedProgrammingLanguage,
      token,
      userId
    );
    setOpen(false);
    fetchDigitalSkillData();
  };

  const fetchProgrammingLanguageData = async () => {
    const programmingLanguagesData = await fetchProgrammingLanguages(token);
    const formattedLanguages = programmingLanguagesData.map((language) => ({
      id: language.id,
      name: language.name,
    }));
    setProgrammingLanguages(formattedLanguages);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Dijital Beceriler
      </Typography>

      <hr />

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={programmingLanguages.filter((language) => {
              return !selectedProgrammingLanguage.some(
                (selectedLanguage) =>
                  selectedLanguage.id === language.id &&
                  selectedLanguage.name === language.name
              );
            })}
            getOptionLabel={(option) => option.name}
            value={selectedProgrammingLanguage}
            filterSelectedOptions
            onChange={handleLanguageChange}
            renderInput={(params) => (
              <TextField {...params} label="Dil seçiniz." />
            )}
            isOptionEqualToValue={(option, value) =>
              option.id === value.id && option.name === value.name
            }
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="outlined" onClick={() => navigate("/work")}>
          Geri Dön
        </Button>
        <Button variant="contained" onClick={handleSaveSkills}>
          Kaydet
        </Button>
        <Button variant="contained" onClick={() => navigate("/languageskills")}>
          İleri
        </Button>
      </Box>
    </Box>
  );
}

export default DigitalSkills;
