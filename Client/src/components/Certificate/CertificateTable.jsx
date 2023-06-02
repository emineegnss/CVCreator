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

const CertificateTable = ({
  certificates,
  handleDeleteCertificate,
  handleEditCertificate,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Sertifika Adı</TableCell>
            <TableCell>Veren Kuruluş</TableCell>
            <TableCell>Alınan Tarih</TableCell>
            <TableCell>Dosya</TableCell>
            <TableCell>Açıklama</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {certificates.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.organization}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>
                <a
                  href={item.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  PDF
                </a>
              </TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>
                <Button onClick={() => handleDeleteCertificate(item.id)}>
                  Sil
                </Button>
                <Button onClick={() => handleEditCertificate(item)}>
                  Düzenle
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CertificateTable;
