/* eslint-disable react/jsx-key */
import { Box, Grid, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import AuctionCard from "../../../components/bidder/Auction/AuctionCards";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import AuctionNavbar from "./navBar";
import Navbar from "../../../components/Nav/Navbar";
import axiosWithApiServer from "../../../apiServices/Utils/hooks/axiosHelpers/axiosWithApiServer";
import { useEffect } from "react";

import {GET_AUCTIONS_AUCTION_DASHBOARD} from "../../../apiServices/URI/index";
const AuctionFloor = () => {
  const { auctionId } = useParams();
  const [auctionIds, setAuctionId] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  useEffect(() => {
    axiosWithApiServer({ url:GET_AUCTIONS_AUCTION_DASHBOARD.url, method: GET_AUCTIONS_AUCTION_DASHBOARD.reqType })
      .then((successResponse) => {
        setRegisteredEvents(successResponse.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const SetAuctionIds = (id) =>
    useCallback(() => {
      if (auctionIds.includes(id)) {
        const AuctionIds = [...auctionIds];
        const auctionIdIndex = AuctionIds.indexOf(id);
        AuctionIds.splice(auctionIdIndex, 1);
        setAuctionId([...AuctionIds]);
      } else {
        setAuctionId([...auctionIds, id]);
      }
    }, [auctionIds]);

  console.log(auctionIds);
  return (
    <>
      <Navbar />
      <AuctionNavbar auctionIds={auctionIds} />

      <Container maxWidth="xl">
        <Paper sx={{ p: 5, my: 2, border: "2px solid #00286B" }} elevation={2}>
          <Box>
            <Typography sx={{ my: 2 }} variant="h5" component="h3">
              Current Auctions
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {registeredEvents.map((obj, index) => (
              <Grid key={index} item xs={12} sm={4} md={3}>
                <AuctionCard
                  id={obj?.id}
                  auctionIds={auctionIds}
                  SetAuctionIds={SetAuctionIds}
                  data={obj}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </>
  );
};
export default AuctionFloor;
