import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

export default function ConferenceDialog({
  open,
  handleCloseDialog,
  editingIndex,
  conferencesAndSeminarsData,
  handleChange,
  handleSaveConference,
}) {
  return (
    <>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Konferans veya Seminer Ekle / Düzenle</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Adı"
            type="text"
            fullWidth
            value={conferencesAndSeminarsData.name}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="date"
            label="Başlangıç Tarihi"
            type="date"
            fullWidth
            value={conferencesAndSeminarsData.date}
            onChange={handleChange}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            name="location"
            label="Konum"
            type="text"
            fullWidth
            value={conferencesAndSeminarsData.location}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Açıklama"
            type="text"
            fullWidth
            value={conferencesAndSeminarsData.description}
            onChange={handleChange}
          />
          {conferencesAndSeminarsData.fileData ? (
            <div>
              <div>
                <a
                  href={conferencesAndSeminarsData.fileUrl}
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
          <Button onClick={handleSaveConference}>Kaydet</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
