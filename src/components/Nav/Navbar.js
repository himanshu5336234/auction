import { AccountCircle } from "@mui/icons-material";
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "supertokens-auth-react/recipe/passwordless";
import { GetAppURL } from "../../apiServices/Base";
import axiosWithApiServer from "../../apiServices/Utils/hooks/axiosHelpers/axiosWithApiServer";
import icons_home from "../../assets/images/icons_home.jpg";

function Navbar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [profile, setProfile] = React.useState({});
  const navigate = useNavigate();
  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  async function onLogout() {
    await signOut();
    navigate("/");
  }
  React.useEffect(() => {
    const url = "/profile";
    axiosWithApiServer({ url, method: "get" })
      .then((successResponse) => {
        setProfile(successResponse.data.data);
      })
      .catch((e) => console.log(e));
  },[]);
  return (
    <AppBar
      position="static"
      component="nav"
      sx={{ background: "white", boxShadow: "none" }}
    >
      <Toolbar
        sx={{
          backgroundColor: "#f6f7f8",
          borderBottom: "0.75px solid #00286B",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: "#00286B" }}
          onClick={() => navigate("/")}
        >
          <img
            src={icons_home}
            alt="logo"
            style={{ maxWidth: "400px", marginTop: "5px", width: "100%" }}
          />
        </Typography>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
          >
            <AccountCircle sx={{ color: "primary.main", fontSize: "50px" }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>
              <Typography sx={{ textTransform: "capitalize" }}>
                {profile.firstName + " " + profile.lastName}
              </Typography>
            </MenuItem>

            <MenuItem
              onClick={() => {
                navigate("/bidder/wallet");
              }}
            >
              Wallet
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/bidder/notification");
              }}
            >
              Notification
            </MenuItem>
            <MenuItem onClick={onLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
