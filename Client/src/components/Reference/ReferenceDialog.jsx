import React from "react";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const ReferenceDialog = ({
  open,
  handleClose,
  referenceData,
  handleChange,
  handleSaveReference,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Referans Ekle / Düzenle</DialogTitle>
      <DialogContent>
        <TextField
          required
          autoFocus
          margin="dense"
          name="name"
          label="Ad"
          type="text"
          fullWidth
          value={referenceData.name}
          onChange={handleChange}
        />
        <TextField
          required
          margin="dense"
          name="surname"
          label="Soyad"
          type="text"
          fullWidth
          value={referenceData.surname}
          onChange={handleChange}
        />
        <TextField
          required
          margin="dense"
          name="title"
          label="Görevi"
          type="text"
          fullWidth
          value={referenceData.title}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="phone"
          label="Telefon"
          type="tel"
          fullWidth
          value={referenceData.phone}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          fullWidth
          value={referenceData.email}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="Açıklama"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={referenceData.description}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Geri Dön
        </Button>
        <Button onClick={handleSaveReference} color="primary">
          Kaydet
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReferenceDialog;
