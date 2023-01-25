import {
  Button,
  ButtonBase,
  CssBaseline,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import CreateAuction from "../../../components/admin/CreateAuction/CreateAuction";
import Navbar from "../../../components/Nav/Navbar";
import BasicTable from "../../../ui/Table/Table";

const AdminDashboard = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ my: 2, border: "2px solid #00286B", py: 6, borderRadius: "6px" }}>
        <Box p={1}>
          <Typography sx={{ my: 2 }} variant="h3" component="h3">
            Dashboard
          </Typography>
        </Box>

        <Paper sx={{my: 1}}>
          <Box sx={{px:1.5,py:4,color:"Text.main" }} >
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid item md={12} lg={6}>
                <Typography
                  sx={{ my: 1, color: "black", ml: 1 }}
                  variant="h5"
                  component="h2"
                >
                  Auctions
                </Typography>
              </Grid>
              <Grid item lg={2} justifyContent="flex-end">
                <CreateAuction backgroundColor="primary.main" />
              </Grid>
            </Grid>
          </Box>

          <BasicTable redirectUrl="auctionDetails" height="800" />
        </Paper>
      </Container>
    </>
  );
};

export default AdminDashboard;
