import React, { useState } from "react";
import {
  Box,
  Container,
  CssBaseline,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import BasicTable from "../../../ui/Table/Table";
import Navbar from "../../Nav/Navbar";
import axiosWithApiServer from "../../../apiServices/Utils/hooks/axiosHelpers/axiosWithApiServer";
import WinningAuction from "../Auction/WinningAuction";

const Home = () => {
  const [rows, setRows] = useState([]);
  // const [rowsUpcoming, setRowsUpcoming] = useState([]);
  const [rowsPayment, setRowsPayment] = useState([]);

  const headers = [
    { id: "name", label: "Name", minWidth: 170 },

    {
      id: "regStartDate",
      label: "Registration Start Date",
      minWidth: 180,
    },
    {
      id: "regEndDate",
      label: "Registration End Date",
      minWidth: 170,
    },
  ];

  const auctionheaders = [
    { id: "name", label: "Name", minWidth: 170 },

    {
      id: "startDate",
      label: "Auction Start Date",
      minWidth: 180,
    },
    {
      id: "endDate",
      label: "Auction End Date",
      minWidth: 170,
    },
  ];

  const PaymentHeaders = [
    { id: "auctionName", label: "Name", minWidth: 170 },
    { id: "auctionStatus", label: "Auction Status", minWidth: 170 },

    { id: "paymentType", label: "Payment Type", minWidth: 170 },
    { id: "paymentStatus", label: "Payment Status", minWidth: 170 },

    {
      id: "updated",
      label: "Updated",
      minWidth: 120,
    },
    {
      id: "amount",
      label: "Amount",
      minWidth: 170,
    },
  ];

  React.useEffect(() => {
    const url = "/auctions";
    axiosWithApiServer({ url, method: "get" })
      .then((successResponse) => {
        setRows(successResponse.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const rowsUpcoming = () => {
    return rows.filter((obj) => obj.status === "upcoming");
  };

  const rowOngoing = () => rows.filter((obj) => obj.status === "ongoing");

  React.useEffect(() => {
    const url = "/bidder/auctions/transactions";
    axiosWithApiServer({ url, method: "get" })
      .then((successResponse) => {
        console.log(successResponse.data.data, "paymentHistory");
        setRowsPayment(successResponse.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  React.useEffect(() => {
    const url = "/profile";
    axiosWithApiServer({ url, method: "get" })
      .then((successResponse) => {
        // console.log(successResponse);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={{ my: 2 }}>
        <Box>
          <Typography
            sx={{ my: 1, color: "primary.main" }}
            variant="h2"
            component="h2"
          >
            Dashboard
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Paper sx={{ border: "1px solid #00286B", my: 2 }}>
              <Box
                sx={{
                  px: 1.5,
                  py: 1,
                  color: "primary.main",
                }}
              >
                <Typography sx={{ my: 1 }} variant="h4" component="h3">
                  Current Events
                </Typography>
              </Box>

              <BasicTable
                event="Current Events Auction"
                headers={auctionheaders}
                rows={rowOngoing()}
                redirectUrl="auctionDetails"
              />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Paper sx={{ border: "1px solid #00286B", my: 2 }}>
              <Box
                sx={{
                  px: 1.5,
                  py: 1,
                  color: "primary.main",
                }}
              >
                <Typography sx={{ my: 1 }} variant="h4" component="h3">
                  Payment Status
                </Typography>
              </Box>

              <BasicTable
                event="Payment Status"
                headers={PaymentHeaders}
                rows={rowsPayment}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Paper sx={{ border: "1px solid #00286B", my: 2 }}>
              <Box
                sx={{
                  px: 1.5,
                  py: 1,
                  color: "primary.main",
                }}
              >
                <Typography sx={{ my: 1 }} variant="h4" component="h3">
                  Upcoming events
                </Typography>
              </Box>

              <BasicTable
                event="Upcoming Auction"
                headers={headers}
                rows={rowsUpcoming()}
                redirectUrl="auctionDetails"
              />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Paper sx={{ border: "1px solid #00286B", my: 2 }}>
              <Box
                sx={{
                  px: 1.5,
                  py: 1,
                  color: "primary.main",
                }}
              >
                <Typography sx={{ my: 1 }} variant="h4" component="h3">
                  Winning Auction
                </Typography>
              </Box>
              <WinningAuction />
              {/* <BasicTable
                headers={headers}
                rows={rows}
                redirectUrl="auctionDetails"
              /> */}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
