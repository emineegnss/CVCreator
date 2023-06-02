import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

export default function LanguageSkillDialog({
  open,
  handleCloseDialog,
  editingIndex,
  languageSkillData,
  handleChange,
  handleSaveLanguageSkill,
}) {
  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
  return (
    <>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Yabancı Dil Ekle / Düzenle</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Yabancı Diller</InputLabel>
            <Select
              value={languageSkillData.foreignLanguage}
              onChange={handleChange}
              label="Yabancı Diller"
              name="foreignLanguage"
            >
              <MenuItem value="İngilizce">İngilizce</MenuItem>
              <MenuItem value="Almanca">Almanca</MenuItem>
              <MenuItem value="İspanyolca">İspanyolca</MenuItem>
              <MenuItem value="İtalyanca">İtalyanca</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Konuşma</InputLabel>
            <Select
              name="speakingLevel"
              value={languageSkillData.speakingLevel}
              onChange={handleChange}
            >
              {levels.map((level, index) => (
                <MenuItem key={index} value={level}>
                  {level}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Dinleme</InputLabel>
            <Select
              name="listeningLevel"
              value={languageSkillData.listeningLevel}
              onChange={handleChange}
            >
              {levels.map((level, index) => (
                <MenuItem key={index} value={level}>
                  {level}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Okuma</InputLabel>
            <Select
              name="readingLevel"
              value={languageSkillData.readingLevel}
              onChange={handleChange}
            >
              {levels.map((level, index) => (
                <MenuItem key={index} value={level}>
                  {level}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Yazma</InputLabel>
            <Select
              name="writingLevel"
              value={languageSkillData.writingLevel}
              onChange={handleChange}
            >
              {levels.map((level, index) => (
                <MenuItem key={index} value={level}>
                  {level}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Geri Dön
          </Button>
          <Button onClick={handleSaveLanguageSkill} color="primary">
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
