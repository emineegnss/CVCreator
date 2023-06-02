import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

function WorkTable({ workExperiences, handleDeleteWork, handleEditWork }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Şirket Adı</TableCell>
            <TableCell>Departman</TableCell>
            <TableCell>Pozisyon</TableCell>
            <TableCell>Başlangıç Tarihi</TableCell>
            <TableCell>Devam Ediyor Mu?</TableCell>
            <TableCell>Bitiş Tarihi</TableCell>
            <TableCell>Projeler</TableCell>
            <TableCell>Kullandığı Diller</TableCell>
            <TableCell>Proje Detayları</TableCell>
            <TableCell>Şirket Adresi</TableCell>
            <TableCell>Şirket Telefon Numarası</TableCell>
            <TableCell>Açıklama</TableCell>
            <TableCell>İşlem</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workExperiences.map((work, index) => (
            <TableRow key={index}>
              <TableCell>{work.companyName}</TableCell>
              <TableCell>{work.department}</TableCell>
              <TableCell>{work.position}</TableCell>
              <TableCell>{work.startDate}</TableCell>
              <TableCell>{work.isContinuing ? "Evet" : "Hayır"}</TableCell>
              <TableCell>{work.endDate}</TableCell>
              <TableCell>{work.projects}</TableCell>
              <TableCell>{work.programmingLanguages}</TableCell>
              <TableCell>{work.projectsDetails}</TableCell>
              <TableCell>{work.companyAddress}</TableCell>
              <TableCell>{work.companyPhoneNumber}</TableCell>
              <TableCell>{work.description}</TableCell>
              <TableCell>
                <Button onClick={() => handleDeleteWork(work.id)}>Sil</Button>
                <Button onClick={() => handleEditWork(work)}>Düzenle</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default WorkTable;
