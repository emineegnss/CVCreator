import {
  Button,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";

export default function LanguageSkillTable({
  languageSkills,
  handleDeleteLanguageSkill,
  handleEditLanguageSkill,
}) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Dil</TableCell>
              <TableCell>Konuşma</TableCell>
              <TableCell>Dinleme</TableCell>
              <TableCell>Okuma</TableCell>
              <TableCell>Yazma</TableCell>
              <TableCell>İşlem</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {languageSkills.map((skill, index) => (
              <TableRow key={index}>
                <TableCell>{skill.foreignLanguage}</TableCell>
                <TableCell>{skill.speakingLevel}</TableCell>
                <TableCell>{skill.listeningLevel}</TableCell>
                <TableCell>{skill.readingLevel}</TableCell>
                <TableCell>{skill.writingLevel}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDeleteLanguageSkill(skill.id)}>
                    Sil
                  </Button>
                  <Button onClick={() => handleEditLanguageSkill(skill)}>
                    Düzenle
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
