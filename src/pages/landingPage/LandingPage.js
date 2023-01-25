import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {GET_NOTIFICATION} from "../../apiServices/URI/index";
import axiosWithApiServer from "../../apiServices/Utils/hooks/axiosHelpers/axiosWithApiServer";
import Auction from "../../components/LandingPage/Auction/Auction";
import NavBar from "../../components/LandingPage/NavBar/NavBar";
import BasicButton from "../../ui/Button/Button";
import NotificationsIcon from "@mui/icons-material/Notifications";

const LandingPage = () => {
  const navigate = useNavigate();
  const [notificationData, setNotificationData] = useState([]);
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  useEffect(() => {
    if (getCookie("sIRTFrontend") != "remove") {
      navigate("/bidder");
    } else {

      axiosWithApiServer({ url:GET_NOTIFICATION.url, method:GET_NOTIFICATION.reqType })
        .then((successResponse) => {
          setNotificationData(successResponse.data.data);
        })
        .catch((e) => console.log(e));
    }
  }, []);

  const showNotifications = () => {
    return notificationData.map((item, index) => {
      return (
        <Box
          key={index}
          sx={{ display: "flex", alignItems: "flex-start", gap: "10px" }}
        >
          {" "}
          <span>
            <NotificationsIcon sx={{ color: "red", fontSize: "16px" }} />
          </span>{" "}
          <Typography variant="h6">{item.Message}</Typography>{" "}
        </Box>
      );
    });
  };

  return (
    <>
      <NavBar />
      <Container
        maxWidth="lg"
        sx={{
          my: 10,
          backgroundColor: "rgba(25,79,125,.9)",
          py: 6,
          borderRadius: "6px",
        }}
      >
        <Grid
          container
          spacing={2}
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Grid xs={12}  item md={2}>
            <Typography
              sx={{ my: 1, color: "#fff", ml: 1 }}
              variant="h3"
              component="h2"
            >
              Login
            </Typography>
            <Paper sx={{ p: 2 }}>
              <BasicButton
                fullWidth
                style={{ py: 1, px: 2, textAlign: "center" }}
                onClick={() => {
                  navigate("/bidder");
                }}
                name="Go to Login"
              />
            </Paper>
          </Grid>

          <Grid item  xs={12}  md={7}>
            <Typography
              sx={{ my: 1, color: "#fff", ml: 1 }}
              variant="h3"
              component="h2"
            >
              Auctions
            </Typography>

            <Paper sx={{ p: 2 }}>
              <Auction />
            </Paper>
          </Grid>

          <Grid item  xs={12} md={3}>
            <Typography
              sx={{ my: 1, color: "#fff", ml: 1 }}
              variant="h3"
              component="h2"
            >
              E-Auction Notices
            </Typography>

            <Paper sx={{ p: 2 }}>
              <Box
                sx={{ minHeight: "520px", height: "100%", overflow: "auto" }}
              >
                {showNotifications()}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default LandingPage;
