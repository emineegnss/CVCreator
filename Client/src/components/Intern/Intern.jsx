import React, { useEffect, useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import fetchInterns from "../../APIs/Intern/fetchInterns";
import saveIntern from "../../APIs/Intern/saveIntern";
import deleteIntern from "../../APIs/Intern/deleteIntern";
import InternTable from "./InternTable";
import InternDialog from "./InternDialog";
import { useNavigate } from "react-router-dom";

export default function Intern() {
  const navigate = useNavigate();

  const [internships, setInternships] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
  const [internshipData, setInternshipData] = useState({
    id: "",
    companyName: "",
    department: "",
    position: "",
    startDate: "",
    isContinuing: false,
    endDate: "",
    projects: "",
    languages: "",
    projectDetails: "",
    country: "",
    city: "",
    companyAddress: "",
    companyPhoneNumber: "",
    description: "",
  });

  useEffect(() => {
    fetchInternData();
  }, []);

  const fetchInternData = async () => {
    const interns = await fetchInterns(userId, token);
    setInternships(interns);
  };

  const handleSaveIntern = async () => {
    await saveIntern(internshipData, token, userId, editingIndex);
    handleCloseDialog();
    fetchInternData();
  };
  const handleEditInternship = (intern) => {
    setInternshipData({
      id: intern.id,
      companyName: intern.companyName,
      department: intern.department,
      position: intern.position,
      startDate: intern.startDate,
      isContinuing: intern.isContinuing,
      endDate: intern.endDate,
      projects: intern.projects,
      languages: intern.languages,
      projectDetails: intern.projectDetails,
      country: intern.country,
      city: intern.city,
      companyAddress: intern.companyAddress,
      companyPhoneNumber: intern.companyPhoneNumber,
      description: intern.description,
    });
    setEditingIndex(intern.id);
    setOpen(true);
  };

  const handleDeleteIntern = async (id) => {
    await deleteIntern(id, token);
    fetchInternData();
  };

  const handleOpenDialog = () => {
    setOpen(true);
    setEditingIndex(null);
    setInternshipData({
      companyName: "",
      department: "",
      position: "",
      startDate: "",
      isContinuing: false,
      endDate: "",
      projects: "",
      languages: "",
      projectDetails: "",
      country: "",
      city: "",
      companyAddress: "",
      companyPhoneNumber: "",
      description: "",
    });
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setInternshipData({
      companyName: "",
      department: "",
      position: "",
      startDate: "",
      isContinuing: false,
      endDate: "",
      projects: "",
      languages: "",
      projectDetails: "",
      country: "",
      city: "",
      companyAddress: "",
      companyPhoneNumber: "",
      description: "",
    });
  };

  const handleChange = (event) => {
    setInternshipData({
      ...internshipData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSwitchChange = (event) => {
    setInternshipData({
      ...internshipData,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Staj Bilgileri
      </Typography>
      <hr />
      {internships.length === 0 ? (
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
          + Staj Ekle
        </Button>
      ) : (
        <>
          <InternTable
            internships={internships}
            handleDeleteIntern={handleDeleteIntern}
            handleEditInternship={handleEditInternship}
          />
          <Button variant="outlined" color="primary" onClick={handleOpenDialog}>
            + Başka Staj Programı Ekle
          </Button>
        </>
      )}
      <InternDialog
        open={open}
        handleCloseDialog={handleCloseDialog}
        internshipData={internshipData}
        handleChange={handleChange}
        handleSwitchChange={handleSwitchChange}
        handleSaveIntern={handleSaveIntern}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Button variant="outlined" onClick={() => navigate("/languageskills")}>
          Geri Dön
        </Button>
        <Button variant="contained" onClick={() => navigate("/conference")}>
          İleri
        </Button>
      </Box>
    </div>
  );
}
