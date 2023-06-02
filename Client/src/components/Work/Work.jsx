import React, { useState, useEffect } from "react";
import { Button, Typography, Box } from "@mui/material";
import WorkDialog from "./WorkDialog";
import WorkTable from "./WorkTable";
import fetchWorks from "../../APIs/Work/fetchWorks";
import saveWork from "../../APIs/Work/saveWork";
import deleteWork from "../../APIs/Work/deleteWork";
import { useNavigate } from "react-router-dom";

function Work() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [workExperiences, setWorkExperiences] = useState([]);
  const [workExperiencesData, setWorkExperiencesData] = useState({
    id: "",
    companyName: "",
    position: "",
    department: "",
    isContinuing: false,
    startDate: "",
    endDate: "",
    projects: "",
    projectsDetails: "",
    companyAddress: "",
    companyPhoneNumber: "",
    description: "",
    programmingLanguages: "",
  });

  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchWorkData();
  }, []);

  const fetchWorkData = async () => {
    const works = await fetchWorks(userId, token);
    setWorkExperiences(works);
  };

  const handleSaveWork = async () => {
    await saveWork(editingIndex, workExperiencesData, token, userId);
    handleCloseDialog();
    fetchWorkData();
  };

  const handleDeleteWork = async (id) => {
    await deleteWork(id, token);
    fetchWorkData();
  };

  const handleOpenDialog = () => {
    setOpen(true);
    setEditingIndex(null);
    setWorkExperiencesData({
      id: "",
      companyName: "",
      position: "",
      department: "",
      isContinuing: false,
      startDate: "",
      endDate: "",
      projects: "",
      projectsDetails: "",
      companyAddress: "",
      companyPhoneNumber: "",
      description: "",
      programmingLanguages: "",
    });
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setWorkExperiencesData({
      id: "",
      companyName: "",
      position: "",
      department: "",
      isContinuing: false,
      startDate: "",
      endDate: "",
      projects: "",
      projectsDetails: "",
      companyAddress: "",
      companyPhoneNumber: "",
      description: "",
      programmingLanguages: "",
    });
  };

  const handleChange = (event) => {
    setWorkExperiencesData({
      ...workExperiencesData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSwitchChange = (event) => {
    setWorkExperiencesData({
      ...workExperiencesData,
      [event.target.name]: event.target.checked,
    });
  };

  const handleEditWork = (work) => {
    setWorkExperiencesData({
      id: work.id,
      companyName: work.companyName,
      position: work.position,
      department: work.department,
      isContinuing: work.isContinuing,
      startDate: work.startDate,
      endDate: work.endDate,
      projects: work.projects,
      projectsDetails: work.projectsDetails,
      companyAddress: work.companyAddress,
      companyPhoneNumber: work.companyPhoneNumber,
      description: work.description,
      programmingLanguages: work.programmingLanguages,
    });
    setEditingIndex(work.id);
    setOpen(true);
  };

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 2 }}>
        İş Deneyimleri
      </Typography>
      <hr />
      {workExperiences.length === 0 ? (
        <Button
          variant="outlined"
          onClick={handleOpenDialog}
          className="button-container"
        >
          + İş Deneyimi Ekle
        </Button>
      ) : (
        <>
          <WorkTable
            workExperiences={workExperiences}
            handleDeleteWork={handleDeleteWork}
            handleEditWork={handleEditWork}
          />
          <Button
            variant="outlined"
            style={{ marginTop: "8px" }}
            onClick={handleOpenDialog}
            className="button-container"
          >
            + Başka İş Deneyimi Ekle
          </Button>
        </>
      )}
      <WorkDialog
        open={open}
        handleCloseDialog={handleCloseDialog}
        editingIndex={editingIndex}
        workExperiencesData={workExperiencesData}
        handleChange={handleChange}
        handleSaveWork={handleSaveWork}
        handleSwitchChange={handleSwitchChange}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="outlined" onClick={() => navigate("/education")}>
          Geri Dön
        </Button>
        <Button variant="contained" onClick={() => navigate("/digitalskills")}>
          İlerle
        </Button>
      </Box>
    </div>
  );
}

export default Work;
