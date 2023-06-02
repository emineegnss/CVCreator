import React from "react";
import { Button } from "@mui/material";

const HomeMenu = ({ currentPage, handlePageChange }) => {
  return (
    <div>
      <Button
        sx={{ mb: 1 }}
        fullWidth
        variant={currentPage === "personalInfo" ? "contained" : "text"}
        onClick={() => handlePageChange("personalInfo")}
      >
        Kişisel Bilgiler
      </Button>
      <Button
        sx={{ mb: 1 }}
        fullWidth
        variant={currentPage === "education" ? "contained" : "text"}
        onClick={() => handlePageChange("education")}
      >
        Eğitim Bilgileri
      </Button>
      <Button
        sx={{ mb: 1 }}
        fullWidth
        variant={currentPage === "work" ? "contained" : "text"}
        onClick={() => handlePageChange("work")}
      >
        İş Deneyimi
      </Button>
      <Button
        sx={{ mb: 1 }}
        fullWidth
        variant={currentPage === "digitalSkills" ? "contained" : "text"}
        onClick={() => handlePageChange("digitalSkills")}
      >
        Dijital Beceriler
      </Button>
      <Button
        fullWidth
        variant={currentPage === "languageSkills" ? "contained" : "text"}
        onClick={() => handlePageChange("languageSkills")}
      >
        Dil Becerileri
      </Button>
      <Button
        fullWidth
        variant={currentPage === "intern" ? "contained" : "text"}
        onClick={() => handlePageChange("intern")}
      >
        Staj Programı
      </Button>
      <Button
        fullWidth
        variant={currentPage === "conference" ? "contained" : "text"}
        onClick={() => handlePageChange("conference")}
      >
        Konferans ve Seminer
      </Button>
      <Button
        fullWidth
        variant={currentPage === "certificate" ? "contained" : "text"}
        onClick={() => handlePageChange("certificate")}
      >
        Sertifika ve Ödüller
      </Button>
      <Button
        fullWidth
        variant={currentPage === "hobby" ? "contained" : "text"}
        onClick={() => handlePageChange("hobby")}
      >
        İlgi Alanları ve Hobiler
      </Button>
      <Button
        fullWidth
        variant={currentPage === "social" ? "contained" : "text"}
        onClick={() => handlePageChange("social")}
      >
        Sosyal Medya
      </Button>
      <Button
        fullWidth
        variant={currentPage === "reference" ? "contained" : "text"}
        onClick={() => handlePageChange("reference")}
      >
        Referans
      </Button>
    </div>
  );
};

export default HomeMenu;
