import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import icons_home from "../../../assets/images/icons_home.jpg";
const NavBar = () => {
  return (
    <>
      <AppBar>
        <Toolbar
          sx={{
            backgroundColor: "#FFF",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "#00286B" }}
          >
            <img 
              src={icons_home}
              alt="logo"
              style={{ maxWidth: "400px", marginTop: "5px", width: "100%" }}
            />
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
