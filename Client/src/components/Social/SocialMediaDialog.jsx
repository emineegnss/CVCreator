import {
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Dialog,
  DialogTitle,
  Button,
} from "@mui/material";
export default function SocialMediaDialog({
  handleCloseDialog,
  socialMediaData,
  editingIndex,
  open,
  handleChange,
  handleSaveSocialMediaLink,
}) {
  return (
    <>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>
          {editingIndex !== null
            ? "Sosyal Medya Düzenle"
            : "Sosyal Medya  Ekle"}
        </DialogTitle>

        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Sosyal Medya Araçları</InputLabel>

            <Select
              value={socialMediaData.socialMediaToolName}
              onChange={handleChange}
              label="Sosyal Medya Araçları"
              name="socialMediaToolName"
            >
              <MenuItem value="İnstagram">İnstagram</MenuItem>
              <MenuItem value="Github">Github</MenuItem>
              <MenuItem value="Linkedln">Linkedln</MenuItem>
            </Select>
          </FormControl>

          <TextField
            autoFocus
            margin="dense"
            name="url"
            label="Sosyal Medya Linki"
            type="text"
            fullWidth
            value={socialMediaData.url}
            onChange={handleChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Geri Dön
          </Button>

          <Button onClick={handleSaveSocialMediaLink} color="primary">
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
