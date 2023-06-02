import {
  Button,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";

export default function InternTable({
  internships,
  handleEditInternship,
  handleDeleteIntern,
}) {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Şirket Adı</TableCell>
              <TableCell>Bölüm</TableCell>
              <TableCell>Pozisyon</TableCell>
              <TableCell>Staj Başlangıç Tarihi</TableCell>
              <TableCell>Devam Ediyor mu?</TableCell>
              <TableCell>Staj Bitiş Tarihi</TableCell>
              <TableCell>Proje Başlığı</TableCell>
              <TableCell>Diller</TableCell>
              <TableCell>Proje Detayları</TableCell>
              <TableCell>Ülke</TableCell>
              <TableCell>Şehir</TableCell>
              <TableCell>Şirket Adresi</TableCell>
              <TableCell>Şirket Telefon Numarası</TableCell>
              <TableCell>Açıklama</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {internships.map((intern, index) => (
              <TableRow key={index}>
                <TableCell>{intern.companyName}</TableCell>
                <TableCell>{intern.department}</TableCell>
                <TableCell>{intern.position}</TableCell>
                <TableCell>{intern.startDate}</TableCell>
                <TableCell>{intern.isContinuing ? "Evet" : "Hayır"}</TableCell>
                <TableCell>{intern.endDate}</TableCell>
                <TableCell>{intern.projects}</TableCell>
                <TableCell>{intern.languages}</TableCell>
                <TableCell>{intern.projectDetails}</TableCell>
                <TableCell>{intern.country}</TableCell>
                <TableCell>{intern.city}</TableCell>
                <TableCell>{intern.companyAddress}</TableCell>
                <TableCell>{intern.companyPhoneNumber}</TableCell>
                <TableCell>{intern.description}</TableCell>
                <TableCell>
                  <Button
                    color="secondary"
                    onClick={() => handleDeleteIntern(intern.id)}
                  >
                    Sil
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => handleEditInternship(intern)}
                  >
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
