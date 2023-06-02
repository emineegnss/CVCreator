import React, { useState } from "react";
import { TextField, Button, Typography, Box, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { handleSubmit } from "../../APIs/Register/handleSubmit";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await handleSubmit(
      name,
      surname,
      email,
      password,
      confirmPassword,
      navigate
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Kayıt Ol
      </Typography>
      <Box component="form" onSubmit={handleFormSubmit} sx={{ mt: 2 }}>
        <TextField
          id="first-name"
          label="Adınız"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          margin="normal"
          required
          fullWidth
        />
        <TextField
          id="last-name"
          label="Soyad"
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          variant="outlined"
          margin="normal"
          required
          fullWidth
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          margin="normal"
          required
          fullWidth
        />
        <TextField
          id="password"
          label="Şifre"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          margin="normal"
          required
          fullWidth
        />
        <TextField
          id="confirm-password"
          label="Şifre Tekrar"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          variant="outlined"
          margin="normal"
          required
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
          style={{ textTransform: "none" }}
        >
          Kayıt Ol
        </Button>
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate("/login")}
        >
          Giriş Yap
        </Link>
      </Box>
    </Box>
  );
}

export default Register;
