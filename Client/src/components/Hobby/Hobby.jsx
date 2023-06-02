import React, { useState, useEffect } from "react";
import { Button, Typography, Box } from "@mui/material";
import HobbyTable from "./HobbyTable";
import HobbyDialog from "./HobbyDialog";
import fetchHobbies from "../../APIs/Hobby/fetchHobbies";
import saveHobby from "../../APIs/Hobby/saveHobby";
import deleteHobby from "../../APIs/Hobby/deleteHobby";
import { useNavigate } from "react-router-dom";

export default function Hobby() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [interestsAndHobbies, setInterestsAndHobbies] = useState([]);
  const [interestsAndHobbiesData, setInterestsAndHobbiesData] = useState({
    id: "",
    name: "",
    description: "",
  });

  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchHobbyData();
  }, []);

  const fetchHobbyData = async () => {
    const hobbies = await fetchHobbies(userId, token);
    setInterestsAndHobbies(hobbies);
  };

  const handleSaveHobby = async () => {
    await saveHobby(editingIndex, interestsAndHobbiesData, userId, token);
    handleCloseDialog();
    fetchHobbyData();
  };

  const handleDeleteHobby = async (userId) => {
    await deleteHobby(userId, token);
    fetchHobbyData();
  };

  const handleOpenDialog = () => {
    setOpen(true);
    setEditingIndex(null);
    setInterestsAndHobbiesData({ name: "", description: "" });
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setInterestsAndHobbiesData({ name: "", description: "" });
  };

  const handleEditHobby = (hobby) => {
    setInterestsAndHobbiesData({
      id: hobby.id,
      name: hobby.name,
      description: hobby.description,
    });
    setEditingIndex(hobby.id);
    setOpen(true);
  };

  const handleChange = (event) => {
    setInterestsAndHobbiesData({
      ...interestsAndHobbiesData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <Typography variant="h4">İlgi Alanları ve Hobiler</Typography>
      <hr />
      {interestsAndHobbies.length === 0 ? (
        <Button variant="outlined" onClick={handleOpenDialog}>
          + İlgi Alanı veya Hobi Ekle
        </Button>
      ) : (
        <>
          <HobbyTable
            interestsAndHobbies={interestsAndHobbies}
            handleDeleteHobby={handleDeleteHobby}
            handleEditHobby={handleEditHobby}
          />
          <Button
            variant="outlined"
            onClick={handleOpenDialog}
            style={{ marginTop: "8px" }}
          >
            Farklı İlgi Alanı ve Hobi Oluştur
          </Button>
        </>
      )}
      <HobbyDialog
        open={open}
        editingIndex={editingIndex}
        interestsAndHobbiesData={interestsAndHobbiesData}
        handleCloseDialog={handleCloseDialog}
        handleChange={handleChange}
        handleSaveHobby={handleSaveHobby}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="outlined" onClick={() => navigate("/certificate")}>
          Geri Dön
        </Button>
        <Button variant="contained" onClick={() => navigate("/social")}>
          İleri
        </Button>
      </Box>
    </div>
  );
}
