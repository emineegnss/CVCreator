import React, { useState } from "react";
import axios from "axios";
import { Typography, Box, TextField, Button } from "@mui/material";

function ResetPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await axios.post(
      "https://localhost:44343/api/users/PasswordReset?email=" + email
    );
    console.log(result.data);
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
        Şifremi Unuttum
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
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
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
        >
          Şifreyi Sıfırla
        </Button>
      </Box>
    </Box>
  );
}

export default ResetPassword;
