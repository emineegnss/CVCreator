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

export default function EducationTable({
  educations,
  handleEditEducation,
  handleDeleteEducation,
}) {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Eğitim Seviyesi</TableCell>
              <TableCell>Okul Adı</TableCell>
              <TableCell>Bölüm Adı</TableCell>
              <TableCell>Başlangıç Tarihi</TableCell>
              <TableCell>Devam Ediyor Mu?</TableCell>
              <TableCell>Bitiş Tarihi</TableCell>
              <TableCell>Not Sistemi</TableCell>
              <TableCell>Not Ortalaması</TableCell>
              <TableCell>Eğitim Dili</TableCell>
              <TableCell>Açıklama</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {educations.map((edu, index) => (
              <TableRow key={index}>
                <TableCell>{edu.educationDegree}</TableCell>
                <TableCell>{edu.schoolName}</TableCell>
                <TableCell>{edu.department}</TableCell>
                <TableCell>{edu.startDate}</TableCell>
                <TableCell>{edu.isContinuing ? "Evet" : "Hayır"}</TableCell>
                <TableCell>{edu.finishDate}</TableCell>
                <TableCell>{edu.gradingSystem}</TableCell>
                <TableCell>{edu.grade}</TableCell>
                <TableCell>{edu.educationLanguage}</TableCell>
                <TableCell>{edu.description}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDeleteEducation(edu.id)}>
                    Sil
                  </Button>
                  <Button onClick={() => handleEditEducation(edu)}>
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
