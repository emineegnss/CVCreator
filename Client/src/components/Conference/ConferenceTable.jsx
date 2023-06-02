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

export default function ConferenceTable({
  conferencesAndSeminars,
  handleDeleteConference,
  handleEditConference,
}) {
  return (
    <>
      <TableContainer style={{ marginTop: "20px" }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Adı</TableCell>
              <TableCell>Başlangıç Tarihi</TableCell>
              <TableCell>Konum</TableCell>
              <TableCell>Dosya</TableCell>
              <TableCell>Açıklama</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {conferencesAndSeminars.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.location}</TableCell>
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
                  <Button onClick={() => handleDeleteConference(item.id)}>
                    Sil
                  </Button>
                  <Button onClick={() => handleEditConference(item)}>
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
