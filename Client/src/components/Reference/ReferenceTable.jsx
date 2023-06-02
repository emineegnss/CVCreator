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

const ReferenceTable = ({
  references,
  handleDeleteReference,
  handleEditReference,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ad</TableCell>
            <TableCell>Soyad</TableCell>
            <TableCell>Görevi</TableCell>
            <TableCell>Telefon</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>İşlem</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {references.map((reference, index) => (
            <TableRow key={index}>
              <TableCell>{reference.name}</TableCell>
              <TableCell>{reference.surname}</TableCell>
              <TableCell>{reference.title}</TableCell>
              <TableCell>{reference.phone}</TableCell>
              <TableCell>{reference.email}</TableCell>
              <TableCell>
                <Button onClick={() => handleDeleteReference(reference.id)}>
                  Sil
                </Button>
                <Button onClick={() => handleEditReference(reference)}>
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

export default ReferenceTable;
