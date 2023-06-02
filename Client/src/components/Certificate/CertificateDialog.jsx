import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

const CertificateDialog = ({
  open,
  handleCloseDialog,
  handleSaveCertificate,
  certificatesData,
  handleChange,
}) => {
  return (
    <Dialog open={open} onClose={handleCloseDialog}>
      <DialogTitle>Sertifika Ekle / Düzenle</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Sertifika Adı"
          type="text"
          fullWidth
          value={certificatesData.name}
          onChange={handleChange}
          required
        />
        <TextField
          margin="dense"
          name="organization"
          label="Sertifikayı Veren Kuruluş"
          type="text"
          fullWidth
          value={certificatesData.organization}
          onChange={handleChange}
          required
        />
        <TextField
          margin="dense"
          name="date"
          label="Alınan Tarih"
          type="date"
          fullWidth
          value={certificatesData.date}
          onChange={handleChange}
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          margin="dense"
          name="description"
          label="Açıklama"
          type="text"
          fullWidth
          value={certificatesData.description}
          onChange={handleChange}
        />
        {certificatesData.fileData ? (
          <div>
            <div>
              <a
                href={certificatesData.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                PDF
              </a>
            </div>
          </div>
        ) : (
          <TextField
            margin="dense"
            name="file"
            type="file"
            fullWidth
            onChange={handleChange}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Geri Dön</Button>
        <Button onClick={handleSaveCertificate}>Kaydet</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CertificateDialog;
