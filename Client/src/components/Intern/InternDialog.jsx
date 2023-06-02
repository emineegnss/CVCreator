import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Switch,
  Typography,
  FormControlLabel,
} from "@mui/material";

export default function InternDialog({
  open,
  handleCloseDialog,
  internshipData,
  handleChange,
  handleSwitchChange,
  handleSaveIntern,
}) {
  return (
    <>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Staj Ekle / Düzenle</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              name="companyName"
              label="Şirket Adı"
              value={internshipData.companyName}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <TextField
              name="department"
              label="Bölüm"
              value={internshipData.department}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <TextField
              name="position"
              label="Pozisyon"
              value={internshipData.position}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Başlangıç Tarihi"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              name="startDate"
              value={internshipData.startDate}
              onChange={handleChange}
            />

            <Box sx={{ flexGrow: 1.1 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Devam Ediyor Mu?
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={internshipData.isContinuing}
                    onChange={handleSwitchChange}
                    name="isContinuing"
                  />
                }
                label={internshipData.isContinuing ? "Evet" : "Hayır"}
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
              value={internshipData.endDate}
              onChange={handleChange}
              disabled={internshipData.isContinuing}
            />

            <TextField
              name="projects"
              label="Proje Başlığı"
              value={internshipData.projects}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <TextField
              name="languages"
              label="Diller"
              value={internshipData.languages}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <TextField
              name="projectDetails"
              label="Proje Detayları"
              multiline
              rows={4}
              value={internshipData.projectDetails}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <TextField
              name="country"
              label="Ülke"
              value={internshipData.country}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <TextField
              name="city"
              label="Şehir"
              value={internshipData.city}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <TextField
              name="companyAddress"
              label="Şirket Adresi"
              value={internshipData.companyAddress}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <TextField
              name="companyPhoneNumber"
              label="Şirket Telefon Numarası"
              value={internshipData.companyPhoneNumber}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <TextField
              name="description"
              label="Açıklama"
              multiline
              rows={4}
              value={internshipData.description}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Geri Dön
          </Button>

          <Button onClick={handleSaveIntern} color="primary">
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
