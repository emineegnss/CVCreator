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
export default function SocialMediaTable({
  socialMediaLinks,
  handleDeleteSocialMedia,
  handleEditSocialMedia,
}) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Platform</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>İşlem</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {socialMediaLinks.map((tool, index) => (
              <TableRow key={index}>
                <TableCell>{tool.socialMediaToolName}</TableCell>

                <TableCell>{tool.url}</TableCell>

                <TableCell>
                  <Button onClick={() => handleDeleteSocialMedia(tool.id)}>
                    Sil
                  </Button>

                  <Button onClick={() => handleEditSocialMedia(tool)}>
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
