import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  FormControlLabel,
  Switch,
} from "@mui/material";

const WorkDialog = ({
  open,
  handleCloseDialog,
  editingIndex,
  workExperiencesData,
  handleChange,
  handleSaveWork,
  handleSwitchChange,
}) => {
  return (
    <Dialog open={open} onClose={handleCloseDialog}>
      <DialogTitle>İş Deneyimi Ekle / Düzenle</DialogTitle>
      <DialogContent>
        <Typography variant="h6" sx={{ mb: 0.5 }}>
          Şirket Adı
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          name="companyName"
          label="Şirket Adı"
          type="text"
          value={workExperiencesData.companyName}
          fullWidth
          required
          onChange={handleChange}
        />
        <Typography variant="h6" sx={{ mb: 0.5 }}>
          Departman
        </Typography>
        <TextField
          margin="dense"
          name="department"
          label="Departman"
          type="text"
          value={workExperiencesData.department}
          fullWidth
          required
          onChange={handleChange}
        />
        <Typography variant="h6" sx={{ mb: 0.5 }}>
          Pozisyon
        </Typography>
        <TextField
          margin="dense"
          name="position"
          label="Pozisyon"
          type="text"
          value={workExperiencesData.position}
          fullWidth
          required
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="startDate"
          label="Başlangıç Tarihi"
          type="date"
          value={workExperiencesData.startDate}
          fullWidth
          required
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Box sx={{ flexGrow: 1.1 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Devam Ediyor Mu?
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={workExperiencesData.isContinuing}
                onChange={handleSwitchChange}
                name="isContinuing"
                value={workExperiencesData.isContinuing}
              />
            }
            label={workExperiencesData.isContinuing ? "Evet" : "Hayır"}
          />
        </Box>
        <TextField
          fullWidth
          margin="normal"
          label="Bitiş Tarihi"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          name="endDate"
          value={workExperiencesData.endDate}
          onChange={handleChange}
          disabled={workExperiencesData.isContinuing}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Projeler
          </Typography>
          <TextField
            margin="dense"
            name="projects"
            label="Projeler"
            type="text"
            value={workExperiencesData.projects}
            fullWidth
            onChange={handleChange}
          />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Kullandığı Diller
          </Typography>
          <TextField
            margin="dense"
            name="programmingLanguages"
            label="Kullandığı Diller"
            type="text"
            value={workExperiencesData.programmingLanguages}
            fullWidth
            onChange={handleChange}
          />
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Proje Detayları
          </Typography>
        </Box>
        <TextField
          margin="dense"
          name="projectsDetails"
          label="Proje Detayları"
          type="text"
          value={workExperiencesData.projectsDetails}
          fullWidth
          onChange={handleChange}
        />
        <Typography variant="h6" sx={{ mb: 0.5 }}>
          Şirket Adresi
        </Typography>
        <TextField
          margin="dense"
          name="companyAddress"
          label="Şirket Adresi"
          type="text"
          value={workExperiencesData.companyAddress}
          fullWidth
          onChange={handleChange}
        />
        <Typography variant="h6" sx={{ mb: 0.5 }}>
          Şirket Telefon Numarası
        </Typography>
        <TextField
          margin="dense"
          name="companyPhoneNumber"
          label="Şirket Telefon Numarası"
          type="tel"
          value={workExperiencesData.companyPhoneNumber}
          fullWidth
          onChange={handleChange}
        />
        <Typography variant="h6" sx={{ mb: 0.5 }}>
          Açıklama
        </Typography>
        <TextField
          margin="dense"
          name="description"
          label="Açıklama"
          type="text"
          value={workExperiencesData.description}
          fullWidth
          multiline
          rows={4}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Geri Dön
        </Button>
        <Button onClick={handleSaveWork} color="primary">
          Kaydet
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WorkDialog;
