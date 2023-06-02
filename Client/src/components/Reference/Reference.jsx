import React, { useEffect, useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import ReferenceTable from "./ReferenceTable";
import fetchReferences from "../../APIs/Reference/fetchReferences";
import saveReference from "../../APIs/Reference/saveReference";
import deleteReference from "../../APIs/Reference/deleteReference";
import ReferenceDialog from "./ReferenceDialog";

const Reference = () => {
  const [references, setReferences] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const [referenceData, setReferenceData] = useState({
    id: "",
    name: "",
    surname: "",
    title: "",
    phone: "",
    email: "",
    description: "",
  });

  useEffect(() => {
    fetchReferenceData();
  }, []);

  const fetchReferenceData = async () => {
    const references = await fetchReferences(userId, token);
    setReferences(references);
  };

  const handleSaveReference = async () => {
    await saveReference(editingIndex, referenceData, userId, token);
    handleCloseDialog();
    fetchReferenceData();
  };

  const handleDeleteReference = async (id) => {
    await deleteReference(id, token);
    fetchReferenceData();
  };

  const handleOpenDialog = () => {
    setOpen(true);
    setEditingIndex(null);
    setReferenceData({
      id: "",
      name: "",
      surname: "",
      title: "",
      phone: "",
      email: "",
      description: "",
    });
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setReferenceData({
      id: "",
      name: "",
      surname: "",
      title: "",
      phone: "",
      email: "",
      description: "",
    });
  };

  const handleChange = (event) => {
    setReferenceData({
      ...referenceData,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditReference = (reference) => {
    setReferenceData({
      id: reference.id,
      name: reference.name,
      surname: reference.surname,
      title: reference.title,
      phone: reference.phone,
      email: reference.email,
      description: reference.description,
    });
    setEditingIndex(reference.id);
    setOpen(true);
  };

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Referans
      </Typography>
      <hr />
      {references.length === 0 && (
        <Button
          variant="outlined"
          className="button-container"
          onClick={handleOpenDialog}
        >
          Referans Ekle
        </Button>
      )}
      {references.length > 0 && (
        <>
          <ReferenceTable
            references={references}
            handleDeleteReference={handleDeleteReference}
            handleEditReference={handleEditReference}
          />
          {references.length < 3 && (
            <Button
              variant="outlined"
              onClick={handleOpenDialog}
              style={{ marginTop: "8px" }}
              className="button-container"
            >
              Başka Referans Ekle
            </Button>
          )}
        </>
      )}
      <ReferenceDialog
        open={open}
        handleClose={handleCloseDialog}
        referenceData={referenceData}
        handleChange={handleChange}
        handleSaveReference={handleSaveReference}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="outlined" onClick={() => window.history.back()}>
          Geri Dön
        </Button>
        <Button variant="contained">Tamamla</Button>
      </Box>
    </div>
  );
};

export default Reference;
