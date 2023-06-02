import React, { useState, useEffect } from "react";
import { Button, Typography, Box } from "@mui/material";
import CertificateTable from "./CertificateTable";
import CertificateDialog from "./CertificateDialog";
import fetchCertificates from "../../APIs/Certificate/fetchCertificates";
import saveCertificate from "../../APIs/Certificate/saveCertificate";
import deleteCertificate from "../../APIs/Certificate/deleteCertificate";
import { useNavigate } from "react-router-dom";

function Certificate() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [certificatesData, setCertificatesData] = useState({
    name: "",
    organization: "",
    date: "",
    description: "",
    file: null,
    fileData: null,
    fileUrl: "",
  });

  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCertificateData();
  }, []);

  const fetchCertificateData = async () => {
    const certificates = await fetchCertificates(userId, token);
    setCertificates(certificates);
  };

  const handleSaveCertificate = async () => {
    await saveCertificate(editingIndex, certificatesData, userId, token);
    handleCloseDialog();
    fetchCertificateData();
  };

  const handleDeleteCertificate = async (id) => {
    await deleteCertificate(id, token);
    fetchCertificateData();
  };

  const handleOpenDialog = () => {
    setOpen(true);
    setEditingIndex(null);
    setCertificatesData({
      name: "",
      organization: "",
      date: "",
      description: "",
    });
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setCertificatesData({
      name: "",
      organization: "",
      date: "",
      description: "",
    });
  };

  const handleEditCertificate = (certificate) => {
    console.log(certificate);
    setCertificatesData({
      id: certificate.id,
      name: certificate.name,
      date: certificate.date,
      organization: certificate.organization,
      description: certificate.description,
      file: certificate.file,
      fileData: certificate.fileData,
      fileUrl: certificate.fileUrl,
    });
    setEditingIndex(certificate.id);
    setOpen(true);
  };

  const handleChange = (event) => {
    if (event.target.name === "file") {
      setCertificatesData({
        ...certificatesData,
        file: event.target.files[0],
        fileName: event.target.files[0].name,
      });
    } else {
      setCertificatesData({
        ...certificatesData,
        [event.target.name]: event.target.value,
      });
    }
  };

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Sertifikalar
      </Typography>
      <hr />
      {certificates.length === 0 ? (
        <Button
          variant="outlined"
          onClick={handleOpenDialog}
          className="button-container"
        >
          + Sertifika Ekle
        </Button>
      ) : (
        <>
          <CertificateTable
            certificates={certificates}
            handleDeleteCertificate={handleDeleteCertificate}
            handleEditCertificate={handleEditCertificate}
          />
          <Button
            variant="outlined"
            style={{ marginTop: "10px" }}
            className="button-container"
            onClick={handleOpenDialog}
          >
            Farklı Sertifika Ekle
          </Button>
        </>
      )}
      <CertificateDialog
        open={open}
        handleCloseDialog={handleCloseDialog}
        handleSaveCertificate={handleSaveCertificate}
        certificatesData={certificatesData}
        handleChange={handleChange}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="outlined" onClick={() => navigate("/conference")}>
          Geri Dön
        </Button>
        <Button variant="contained" onClick={() => navigate("/hobby")}>
          İlerle
        </Button>
      </Box>
    </div>
  );
}

export default Certificate;
