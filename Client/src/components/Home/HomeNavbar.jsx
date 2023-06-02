import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

export default function HomeNavbar({
  name,
  handleMenu,
  handleClose,
  anchorEl,
  file,
}) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          LOGO
        </Typography>
        <div>
          <Button color="inherit">{name}</Button>
          <IconButton
            onClick={handleMenu}
            size="large"
            edge="end"
            color="inherit"
          >
            <AccountCircle>{file}</AccountCircle>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleClose}>Ayarlar</MenuItem>
            <MenuItem onClick={handleClose}>Çıkış Yap</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}
