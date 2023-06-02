import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import savePersonalInfo from "../../APIs/Person/savePersonalInfo";
import fetchPersonalInfos from "../../APIs/Person/fetchPersonalInfos";
import { AvatarInput } from "../Avatar/AvatarInput";
import ReactFileReader from "react-file-reader";
import { FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function PersonalInfo() {
  const navigate = useNavigate();

  const [about, setAbout] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [livingCountry, setLivingCountry] = useState("");
  const [livingCity, setLivingCity] = useState("");
  const [address, setAddress] = useState("");
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");

  useEffect(() => {
    fetchData();
  }, []);

  const handleFiles = (files) => {
    setFileUrl(files.base64);
    const selectedFile = files.fileList[0];
    setFile(selectedFile);
  };

  const fetchData = async () => {
    const personalInfoData = await fetchPersonalInfos(userId, token);
    if (personalInfoData) {
      setAbout(personalInfoData.about || "");
      setName(personalInfoData.name || "");
      setSurname(personalInfoData.surname || "");
      setPhoneNumber(personalInfoData.phoneNumber || "");
      setGender(personalInfoData.gender || "");
      setNationality(personalInfoData.nationality || "");
      setIdentityNumber(personalInfoData.identityNumber || "");
      setLivingCountry(personalInfoData.livingCountry || "");
      setLivingCity(personalInfoData.livingCity || "");
      setAddress(personalInfoData.address || "");
      setFileUrl(
        personalInfoData.fileUrl ||
          "https://fontawesomeicons.com/images/svg/person-circle-outline.svg"
      );
    }
  };
  const formatPhoneNumber = (phoneNumber) => {
    const cleanedNumber = phoneNumber.replace(/\D/g, ""); // Sadece sayıları tutmak için diğer karakterleri kaldırır
    const trimmedNumber = cleanedNumber.slice(0, 10); // En fazla 10 karakter uzunluğunda bir numara elde eder

    const match = trimmedNumber.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/); // Telefon numarasını istediğiniz formata böler

    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}-${match[4]}`; // Telefon numarasını istediğiniz formata dönüştürür
    }

    return phoneNumber; // Eğer 10 karakterli bir numara değilse veya formata uymayan bir numara varsa, orijinal numarayı döndürür
  };

  const handlePhoneNumberChange = (e) => {
    const inputPhoneNumber = e.target.value;
    const formattedPhoneNumber = formatPhoneNumber(inputPhoneNumber);
    setPhoneNumber(formattedPhoneNumber);
  };

  const handleSave = async () => {
    const data = {
      name,
      surname,
      phoneNumber,
      gender,
      nationality,
      about,
      identityNumber,
      livingCountry,
      livingCity,
      address,
      file,
    };
    await savePersonalInfo(token, userId, data)
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });
    fetchPersonalInfos(userId, token);
    navigate("/education");
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Kişisel Bilgiler
      </Typography>
      <hr />
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mr: 5,
          }}
        >
          <AvatarInput>
            <img src={fileUrl} alt="Avatar Placeholder" />
          </AvatarInput>
          <ReactFileReader
            fileTypes={[".png"]}
            base64={true}
            handleFiles={handleFiles}
            value={file}
          >
            <FiUpload
              style={{ width: 30, height: 30, cursor: "pointer" }}
              as={Button}
            />
          </ReactFileReader>
        </Box>
        <Box sx={{ flexGrow: 8 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Hakkımda
          </Typography>
          <TextField
            label="Hakkınızda"
            multiline
            rows={4}
            fullWidth
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            required
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Ad
          </Typography>
          <TextField
            label="Ad"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Soyad
          </Typography>
          <TextField
            label="Soyad"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            fullWidth
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Telefon Numarası
          </Typography>
          <TextField
            label="Telefon Numarası"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            fullWidth
          />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Cinsiyet
          </Typography>

          <FormControl fullWidth>
            <InputLabel id="gender-label">Cinsiyet</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              value={gender}
              label="Cinsiyet"
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value="male">Erkek</MenuItem>
              <MenuItem value="female">Kadın</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Uyruk
          </Typography>
          <TextField
            label="Uyruk"
            value={nationality}
            type="text"
            onChange={(e) => setNationality(e.target.value)}
            fullWidth
          />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Tc Kimlik No
          </Typography>
          <TextField
            type="number"
            label="TC Kimlik No"
            value={identityNumber}
            onChange={(e) => setIdentityNumber(e.target.value)}
            fullWidth
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Yaşadığı Ülke
          </Typography>
          <TextField
            label="Yaşadığı Ülke"
            value={livingCountry}
            onChange={(e) => setLivingCountry(e.target.value)}
            fullWidth
          />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Yaşadığı Şehir
          </Typography>
          <TextField
            label="Yaşadığı Şehir"
            value={livingCity}
            onChange={(e) => setLivingCity(e.target.value)}
            fullWidth
          />
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Adres
        </Typography>
        <TextField
          label="Adres"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          multiline
          rows={4}
          fullWidth
          sx={{ mb: 2 }}
        />
      </Box>

      <Button variant="contained" onClick={handleSave}>
        Kaydet
      </Button>
    </Box>
  );
}

export default PersonalInfo;
