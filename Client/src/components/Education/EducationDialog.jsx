import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Switch,
  FormControlLabel,
  Box,
} from "@mui/material";
import { useEffect } from "react";

export default function EducationDialog({
  open,
  handleCloseDialog,
  educationData,
  handleChange,
  schoolNames,
  handleSwitchChange,
  handleSaveEducation,
  fetchSchoolNames,
}) {
  useEffect(() => {
    fetchSchoolNames();
  });
  return (
    <>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Öğrenim Ekle / Düzenle</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Eğitim Seviyesi</InputLabel>
            <Select
              value={educationData.educationDegree}
              onChange={handleChange}
              label="Eğitim Seviyesi"
              name="educationDegree"
            >
              <MenuItem value="önlisans">Önlisans</MenuItem>
              <MenuItem value="lisans">Lisans</MenuItem>
              <MenuItem value="yükseklisans">Yükseklisans</MenuItem>
              <MenuItem value="doktora">Doktora</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Bölüm Adı</InputLabel>
            <Select
              value={educationData.department}
              onChange={handleChange}
              label="Bölüm Adı"
              name="department"
            >
              <MenuItem value="Bilgisayar Mühendisliği">
                Bilgisayar Mühendisliği
              </MenuItem>
              <MenuItem value="Makine Mühendisliği">
                Makine Mühendisliği
              </MenuItem>
              <MenuItem value="Elektrik ve Elektronik Mühendisliği">
                Elektrik ve Elektronik Mühendisliği
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Okul Adı</InputLabel>
            <Select
              value={educationData.schoolName}
              onChange={handleChange}
              label="Okul Adı"
              name="schoolName"
            >
              {schoolNames.map((school) => (
                <MenuItem key={school.id} value={school.name}>
                  {school.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="Başlangıç Tarihi"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            name="startDate"
            value={educationData.startDate}
            onChange={handleChange}
          />
          <Box sx={{ flexGrow: 1.1 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Devam Ediyor Mu?
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={educationData.isContinuing}
                  onChange={handleSwitchChange}
                  name="isContinuing"
                />
              }
              label={educationData.isContinuing ? "Evet" : "Hayır"}
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
            name="finishDate"
            value={educationData.finishDate}
            onChange={handleChange}
            disabled={educationData.isContinuing}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Not Sistemi</InputLabel>
            <Select
              value={educationData.gradingSystem}
              onChange={handleChange}
              label="Not Sistemi"
              name="gradingSystem"
            >
              <MenuItem value="100">100</MenuItem>
              <MenuItem value="4">4</MenuItem>
            </Select>
          </FormControl>
          {educationData.gradingSystem && (
            <TextField
              fullWidth
              margin="normal"
              label="Not Ortalaması"
              name="grade"
              value={educationData.grade}
              onChange={handleChange}
              required
              type="number"
              inputProps={{
                min: educationData.gradingSystem === "100" ? "0" : "0",
                max: educationData.gradingSystem,
              }}
            />
          )}
          <FormControl fullWidth margin="normal">
            <InputLabel>Eğitim Dili</InputLabel>
            <Select
              value={educationData.educationLanguage}
              onChange={handleChange}
              label="Eğitim Dili"
              name="educationLanguage"
            >
              <MenuItem value="almanca">Almanca</MenuItem>
              <MenuItem value="ingilizce">İngilizce</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="Açıklama"
            name="description"
            value={educationData.description}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Geri Dön
          </Button>
          <Button onClick={handleSaveEducation} color="primary">
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
