import React, { useState, useEffect } from "react";
import { Button, Typography, Box } from "@mui/material";
import ConferenceTable from "./ConferenceTable";
import ConferenceDialog from "./ConferenceDialog";
import fetchConferences from "../../APIs/Conference/fetchConferences";
import saveConference from "../../APIs/Conference/saveConference";
import deleteConference from "../../APIs/Conference/deleteConference";
import { useNavigate } from "react-router-dom";

function Conference() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [conferencesAndSeminars, setConferencesAndSeminars] = useState([]);
  const [conferencesAndSeminarsData, setConferencesAndSeminarsData] = useState({
    name: "",
    date: "",
    location: "",
    description: "",
    file: null,
    fileData: null,
    fileUrl: "",
  });

  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchConferencesData();
  }, []);

  const fetchConferencesData = async () => {
    const conferences = await fetchConferences(userId, token);
    setConferencesAndSeminars(conferences);
  };

  const handleSaveConference = async () => {
    await saveConference(
      editingIndex,
      conferencesAndSeminarsData,
      userId,
      token
    );
    handleCloseDialog();
    fetchConferencesData();
  };

  const handleDeleteConference = async (id) => {
    await deleteConference(id, token);
    fetchConferencesData();
  };

  const handleOpenDialog = () => {
    setOpen(true);
    setEditingIndex(null);
    setConferencesAndSeminarsData({
      name: "",
      date: "",
      location: "",
      description: "",
      file: [""],
      fileData: "",
    });
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setConferencesAndSeminarsData({
      name: "",
      date: "",
      location: "",
      description: "",
      file: null,
      fileData: "",
    });
  };

  const handleEditConference = (conference) => {
    setConferencesAndSeminarsData({
      id: conference.id,
      name: conference.name,
      date: conference.date,
      location: conference.location,
      description: conference.description,
      file: conference.file,
      fileData: conference.fileData,
      fileUrl: conference.fileUrl,
    });
    setEditingIndex(conference.id);
    setOpen(true);
  };

  const handleChange = (event) => {
    if (event.target.name === "file") {
      setConferencesAndSeminarsData({
        ...conferencesAndSeminarsData,
        file: event.target.files[0],
      });
    } else {
      setConferencesAndSeminarsData({
        ...conferencesAndSeminarsData,
        [event.target.name]: event.target.value,
      });
    }
  };

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Konferanslar veya Seminerler
      </Typography>
      <hr />
      {conferencesAndSeminars.length === 0 ? (
        <Button
          variant="outlined"
          onClick={handleOpenDialog}
          className="button-container"
        >
          + Konferans veya Seminer Ekle
        </Button>
      ) : (
        <>
          <ConferenceTable
            conferencesAndSeminars={conferencesAndSeminars}
            handleDeleteConference={handleDeleteConference}
            handleEditConference={handleEditConference}
          />

          <Button
            variant="outlined"
            onClick={handleOpenDialog}
            style={{ marginTop: "8px" }}
            className="button-container"
          >
            Farklı Konferans veya Seminer Ekle
          </Button>
        </>
      )}
      <ConferenceDialog
        open={open}
        handleCloseDialog={handleCloseDialog}
        editingIndex={editingIndex}
        conferencesAndSeminarsData={conferencesAndSeminarsData}
        handleChange={handleChange}
        handleSaveConference={handleSaveConference}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="outlined" onClick={() => navigate("/intern")}>
          Geri Dön
        </Button>
        <Button variant="contained" onClick={() => navigate("/certificate")}>
          İleri
        </Button>
      </Box>
    </div>
  );
}

export default Conference;
