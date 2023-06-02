import React, { useState, useEffect } from "react";
import { Button, Typography, Box } from "@mui/material";
import axios from "axios";
import EducationTable from "./EducationTable";
import EducationDialog from "./EducationDialog";
import deleteEducation from "../../APIs/Education/deleteEducation";
import fetchEducations from "../../APIs/Education/fetchEducations";
import saveEducation from "../../APIs/Education/saveEducation";
import { useNavigate } from "react-router-dom";

export default function Hobby() {
  const navigate = useNavigate();

  const [educations, setEducations] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [schoolNames, setSchoolNames] = useState([]);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");

  const [educationData, setEducationData] = useState({
    id: "",
    educationDegree: "",
    schoolName: "",
    department: "",
    startDate: "",
    finishDate: "",
    isContinuing: false,
    gradingSystem: "",
    grade: "",
    educationLanguage: "",
    description: "",
  });

  useEffect(() => {
    fetchEducationData();
  }, []);

  const fetchEducationData = async () => {
    const educations = await fetchEducations(userId, token);
    setEducations(educations);
  };

  const handleSaveEducation = async () => {
    await saveEducation(educationData, token, userId, editingIndex);
    handleCloseDialog();
    fetchEducationData();
  };

  const handleEditEducation = (edu) => {
    setEducationData({
      id: edu.id,
      educationDegree: edu.educationDegree,
      schoolName: edu.schoolName,
      department: edu.department,
      startDate: edu.startDate,
      finishDate: edu.finishDate,
      isContinuing: edu.isContinuing,
      gradingSystem: edu.gradingSystem,
      grade: edu.grade,
      educationLanguage: edu.educationLanguage,
      description: edu.description,
    });
    setEditingIndex(edu.id);
    fetchSchoolNames();
    setOpen(true);
  };

  const handleDeleteEducation = async (id) => {
    await deleteEducation(id, token);
    fetchEducationData();
  };

  const handleOpenDialog = () => {
    setOpen(true);
    fetchSchoolNames();
    setEditingIndex(null);
    setEducationData({
      educationDegree: "",
      schoolName: "",
      department: "",
      startDate: "",
      finishDate: "",
      isContinuing: false,
      gradingSystem: "",
      grade: "",
      educationLanguage: "",
      description: "",
    });
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setEducationData({
      educationDegree: "",
      schoolName: "",
      department: "",
      startDate: "",
      finishDate: "",
      isContinuing: false,
      gradingSystem: "",
      grade: "",
      educationLanguage: "",
      description: "",
    });
  };

  const handleChange = (event) => {
    setEducationData({
      ...educationData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSwitchChange = (event) => {
    setEducationData({
      ...educationData,
      [event.target.name]: event.target.checked,
    });
  };

  const fetchSchoolNames = async () => {
    try {
      const response = await axios.get("https://localhost:44343/api/schools");
      const schools = response.data;
      setSchoolNames(schools);
    } catch (error) {
      console.error("Error fetching school names:", error);
    }
  };

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Öğrenim Bilgileri
      </Typography>

      <hr />

      {educations.length === 0 ? (
        <Button variant="outlined" onClick={handleOpenDialog}>
          + Öğrenim Ekle
        </Button>
      ) : (
        <>
          <EducationTable
            educations={educations}
            handleDeleteEducation={handleDeleteEducation}
            handleEditEducation={handleEditEducation}
          />

          <Button variant="outlined" color="primary" onClick={handleOpenDialog}>
            + Başka Öğrenim Ekle
          </Button>
        </>
      )}

      <EducationDialog
        open={open}
        handleCloseDialog={handleCloseDialog}
        educationData={educationData}
        handleChange={handleChange}
        schoolNames={schoolNames}
        handleSwitchChange={handleSwitchChange}
        handleSaveEducation={handleSaveEducation}
        fetchSchoolNames={fetchSchoolNames}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="outlined" onClick={() => navigate("/personalInfo")}>
          Geri Dön
        </Button>
        <Button variant="contained" onClick={() => navigate("/work")}>
          İleri
        </Button>
      </Box>
    </div>
  );
}
