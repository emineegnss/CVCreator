import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

export default function HobbyDialog({
  open,
  handleCloseDialog,
  editingIndex,
  interestsAndHobbiesData,
  handleChange,
  handleSaveHobby,
}) {
  return (
    <>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Hobi veya İlgi Alanı Ekle / Düzenle</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Başlık"
            type="text"
            fullWidth
            value={interestsAndHobbiesData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Açıklama"
            type="text"
            fullWidth
            value={interestsAndHobbiesData.description}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Geri Dön</Button>
          <Button onClick={handleSaveHobby}>Kaydet</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
