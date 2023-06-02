import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import PersonalInfo from "../PersonalInfo/PersonalInfo";
import Education from "../Education/Education";
import LanguageSkill from "../LanguageSkill/LanguageSkill";
import Work from "../Work/Work";
import DigitalSkills from "../DigitalSkill/DigitalSkills";
import Intern from "../Intern/Intern";
import Conference from "../Conference/Conference";
import Certificate from "../Certificate/Certificate";
import Hobby from "../Hobby/Hobby";
import Reference from "../Reference/Reference";
import SocialMedia from "../Social/SocialMedia";
import { useLocation } from "react-router-dom";
import logout from "../../APIs/Home/logout";
import fetchPersonFirstName from "../../APIs/Home/fetchPersonFirstName";
import HomeNavbar from "./HomeNavbar";
import fetchpersonPhoto from "../../APIs/Home/fetchpersonPhoto";
import fetchPersonName from "../../APIs/Home/fetchPersonName";
function Home() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentPage, setCurrentPage] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();
  const [userAvatar, setUserAvatar] = useState(
    localStorage.getItem("userAvatar")
  );

  const location = useLocation();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      const currentPage = location.pathname.substring(1).replace("-", " ");
      setCurrentPage(currentPage);
    }
    fetchPersonFirstName();
  }, [navigate]);

  const fetchPersonFirstName = async () => {
    const personFirstName = await fetchPersonFirstName(userId, token);
    setName(personFirstName);
    setFile(personName);
  };

  const fetchPersonName = async () => {
    const personName = await fetchPersonName(userId, token);
    setFile(personName);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async () => {
    setAnchorEl(null);

    await logout(token, navigate);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    navigate(`/${page.toLowerCase().replace(" ", "-")}`);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "personalInfo":
        return <PersonalInfo />;
      case "education":
        return <Education />;
      case "work":
        return <Work />;
      case "digitalskills":
        return <DigitalSkills />;
      case "languageskills":
        return <LanguageSkill />;
      case "intern":
        return <Intern />;
      case "conference":
        return <Conference />;
      case "certificate":
        return <Certificate />;
      case "hobby":
        return <Hobby />;
      case "social":
        return <SocialMedia />;
      case "reference":
        return <Reference />;
      default:
        return <PersonalInfo />;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <HomeNavbar
        name={name}
        handleMenu={handleMenu}
        handleClose={handleClose}
        anchorEl={anchorEl}
        file={file}
      />
      <Box sx={{ display: "flex", mt: 1, mr: 20 }}>
        <Box sx={{ width: "14%", padding: "20px", mr: 3 }}>
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
            variant={currentPage === "digitalskills" ? "contained" : "text"}
            onClick={() => handlePageChange("digitalskills")}
          >
            Dijital Beceriler
          </Button>
          <Button
            fullWidth
            variant={currentPage === "languageskills" ? "contained" : "text"}
            onClick={() => handlePageChange("languageskills")}
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
        </Box>

        <Box sx={{ flexGrow: 1, padding: "16px" }}>{renderPage()}</Box>
      </Box>
    </Box>
  );
}

export default Home;
