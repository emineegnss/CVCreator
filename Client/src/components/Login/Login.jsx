import React, { useState } from "react";
import { Typography, Box, TextField, Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { handleSubmit } from "../../APIs/Login/handleSubmit";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await handleSubmit(email, password, navigate);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          mt: 4,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Giriş
        </Typography>
        <Box component="form" onSubmit={handleFormSubmit} sx={{ mt: 2 }}>
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
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            style={{ textTransform: "none" }}
          >
            Giriş Yap
          </Button>
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate("/register")}
          >
            Kayıt Ol
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default Login;
