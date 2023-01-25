/* eslint-disable react/jsx-key */
import { Grid, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import BasicTable from "../../../ui/Table/Table";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useLocation } from "react-router-dom";
import axiosWithApiServer from "../../../apiServices/Utils/hooks/axiosHelpers/axiosWithApiServer";
import Navbar from "../../../components/Nav/Navbar";
import {GET_BIDDER_BID} from "../../../apiServices/URI/index";
const headers = [
  { id: "name", label: "Name", minWidth: 80 },
  { id: "currentRoundNumber", label: "Current Round", minWidth: 80 },
  { id: "reservePrice", label: "Reserve Price", minWidth: 80 }
  // { id: "userLastBid", label: "Last Bid", minWidth: 80 },
];

const Bidheaders = [
  { id: "auctionName", label: "Name", minWidth: 80 },
  { id: "roundNumber", label: "Current Round", minWidth: 80 },
  { id: "counterOfferStatus", label: "Counter Offer status", minWidth: 80 },
  { id: "counterOffer", label: "Counter Offer Status", minWidth: 80 },
  { id: "bidStatus", label: "BID Status", minWidth: 80 },
  { id: "updated", label: "Updated", minWidth: 80 },
];

const AuctionFloorDashboard = () => {
  const [value, setValue] = React.useState(0);
  const location = useLocation();
  const data = location.state?.data;
  const [auctionFloorTableData, setAuctionFloorTableData] = useState([]);
  const [notificationsData, setNotificationsData] = useState([]);
  const [bidBook, setBidBook] = useState([]);
  const [auctionName, setAuctionName] = useState("");

  useEffect(() => {
    if (data.length > 0) {
      const url = "/bidder/auctions/floor";
      const formBody = JSON.stringify({
        auctions: data,
      });
      axiosWithApiServer({ url, method: "post", body: formBody })
        .then((successReponse) => {
          
          let data = [];
          successReponse.data.data.forEach((obj) => {
            const obj1 = { ...obj.auction, ...obj.currentRound };
            data.push(obj1);
          });
          setAuctionFloorTableData(data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    if (data.length > 0) {
      const url = `/bidder/auction/notifications?auctionID=${data[0]}`;
      const url2 = `/bidder/auction?auctionID=${data[0]}`;
      axiosWithApiServer({ url: url2, method: "get" })
        .then((successReponse) => {
          setAuctionName(successReponse.data.data.name);
        })
        .catch((e) => {
          console.log(e);
        });
      axiosWithApiServer({ url, method: "get" })
        .then((successReponse) => {
          setNotificationsData(successReponse.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [data]);
  useEffect(() => {
    console.log(auctionFloorTableData);
  }, [auctionFloorTableData]);

  useEffect(() => {


    //  setInterval(() => {
    axiosWithApiServer({ url:GET_BIDDER_BID.url, method: GET_BIDDER_BID.reqType })
      .then((successResponse) => {
        setBidBook(successResponse.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
    // }, 5000);
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="xl">
        <Box
          sx={{
            m: 3,
            p: 1.5,
            color: "primary.main",
          }}
        >
          <Typography sx={{ my: 1 }} variant="h5" component="h3">
            Auction Table
          </Typography>
        </Box>
        <Paper sx={{ m: 3, p: 2, border: "2px solid #00286B" }}>
          <Grid container spacing={2} px={1}>
            <Grid item xs={12} md={9}>
              <Box>
                <BottomNavigation
                  sx={{ justifyContent: "flex-start", height: "30px" }}
                  showLabels
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                >
                  <BottomNavigationAction
                    sx={{
                      "& .Mui-selected": {
                        "& .MuiBottomNavigationAction": {
                          transition: "none",
                          fontWeight: "bold",
                          lineHeight: "20px",
                        },
                        "& .MuiSvgIcon-root, & .MuiBottomNavigationAction-label": {
                          color: (theme) => theme.palette.secondary.main,
                        },
                      },
                    }}
                    icon={<div>AUCTION LIST</div>}
                  />
                  <BottomNavigationAction icon={<div>BID BOOK</div>} />
                </BottomNavigation>
              </Box>
              <Paper sx={{ my: 2, border: "1px solid #00286B" }}>
                {value === 0 && (
                  <BasicTable
                    headers={headers}
                    rows={auctionFloorTableData}
                    isAuctionFloor={true}
                  />
                )}
                {value === 1 && (
                  <BasicTable headers={Bidheaders} rows={bidBook} />
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box
                sx={{
                  borderRadius: "6px",
                  p: 1,
                  my: 0.5,
                  backgroundColor: "primary.main",
                }}
              >
                <Typography sx={{ color: "Text.main" }}>
                  Auction Details
                </Typography>
              </Box>
              <Paper sx={{ border: "1px solid #00286B", height: "87%" }}>
                <Box p={2}>
                  <Box p={1}>
                    <Typography
                      sx={{ textAlign: "center", py: 2, fontWeight: "bold" }}
                      variant="p"
                    >
                      Auction Name:
                    </Typography>
                    <br />
                    <Typography sx={{ textAlign: "center" }} variant="p">
                      {auctionFloorTableData[0]?.name}
                    </Typography>
                  </Box>
                  <Box p={1}>
                    <Typography
                      sx={{ textAlign: "center", fontWeight: "bold" }}
                      variant="p"
                    >
                      Start:
                    </Typography>
                    <br />
                    <Typography>
                      {new Date(
                        auctionFloorTableData[0]?.startDate
                      )?.toString()}
                    </Typography>
                  </Box>
                  <Box p={1}>
                    <Typography
                      sx={{ textAlign: "center", fontWeight: "bold" }}
                      variant="p"
                    >
                      End:
                    </Typography>
                    <br />
                    <Typography>
                      {new Date(auctionFloorTableData[0]?.endDate)?.toString()}
                    </Typography>
                  </Box>
                  <Box p={1}>
                    <Typography
                      sx={{ textAlign: "center", fontWeight: "bold" }}
                      variant="p"
                    >
                      Increment Value:
                    </Typography>
                    <br />
                    <Typography>500</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} sx={{ marginBottom: "20px" }}>
              <Box
                sx={{
                  borderRadius: "6px",
                  p: 1,
                  my: 0.5,
                  backgroundColor: "primary.main",
                }}
              >
                <Typography sx={{ color: "Text.main" }}>
                  Auction Notifications
                </Typography>
              </Box>
              <Paper sx={{ border: "1px solid #00286B", height: "87%" }}>
                <Box p={2}>
                  <Box>
                    <Box>
                      <Typography variant="h5">{auctionName}</Typography>
                    </Box>
                    {notificationsData?.map((obj, index) => (
                      <Box key={index}>
                        <Typography variant="h6">{obj.Message}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default AuctionFloorDashboard;
