import { Grid, Paper, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { memo } from "react";
import BasicModal from "../../../../ui/model";
import SingleProjectMap from "../../../../ui/Table/SingleMap";
import TermCondition from "./TermCondition";

const AuctionDetail = (props) => {
  const { auctionDetails, mapCoords } = props;
  return (
    <>
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Typography
          sx={{ p: 2, ml: 2, backgroundColor: "white" }}
          variant="h3"
          component="h4"
        >
          Auction Details - Auction Id 200
        </Typography>
        <Box sx={{ marginRight: "1.5rem" }}>
          <BasicModal title="View Plots">
            <Container
              sx={{ marginTop: "3rem", background: "white" }}
              maxWidth="md"
            >
              <Box p={3}>
                <Typography variant="h3">Plots</Typography>
              </Box>
              <Box p={3}>
                {auctionDetails?.plots?.map((obj, index) => (
                  <Box my={2} sx={{ display: "flex" }} key={index}>
                    <Typography
                      variant="h6"
                      sx={{
                        marginRight: "20px",
                        fontSize: "22px",
                        marginTop: "5px",
                      }}
                    >
                      {index + 1}. {obj.name}
                    </Typography>
                    <BasicModal title="View">
                      <Container>
                        <SingleProjectMap prefill={obj.mapCoordinates} />
                      </Container>
                    </BasicModal>
                  </Box>
                ))}
              </Box>
            </Container>
          </BasicModal>
        </Box>
      </Box>

      <Paper sx={{ m: 3, p: 4, border: "1px solid #00286B" }}>
        <Grid container spacing={2} px={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography sx={{ my: 1 }} variant="h5" component="h2">
              Auction Start Date
            </Typography>
            <Typography variant="p" component="p">
              {new Date(auctionDetails?.startDate).toLocaleDateString("en-US")}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography sx={{ my: 1 }} variant="h5" component="h2">
              Auction End Date
            </Typography>
            <Typography variant="p" component="p">
              {new Date(auctionDetails?.endDate).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography sx={{ my: 1 }} variant="h5" component="h2">
              Registration Start Date
            </Typography>
            <Typography variant="p" component="p">
              {new Date(auctionDetails?.regStartDate).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography sx={{ my: 1 }} variant="h5" component="h2">
              Registration End Date
            </Typography>
            <Typography variant="p" component="p">
              {new Date(auctionDetails?.regEndDate).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography sx={{ my: 1 }} variant="h5" component="h2">
              Auction Name
            </Typography>
            <Typography variant="p" component="p">
              {auctionDetails?.name}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography sx={{ my: 1 }} variant="h5" component="h2">
              EMD Amount
            </Typography>
            <Typography variant="p" component="p">
              {auctionDetails?.emdAmount}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography sx={{ my: 1 }} variant="h5" component="h2">
              H1 payment %
            </Typography>
            <Typography variant="p" component="p">
              {auctionDetails?.h1PaymentPercentage} %
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography sx={{ my: 1 }} variant="h5" component="h2">
              H1 payment endDate
            </Typography>
            <Typography variant="p" component="p">
              {new Date(auctionDetails?.h1PaymentEndDate).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography sx={{ my: 1 }} variant="h5" component="h2">
              Processing fees
            </Typography>
            <Typography variant="p" component="p">
              {auctionDetails?.processingFees}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography sx={{ my: 1 }} variant="h5" component="h2">
              Auction status
            </Typography>
            <Typography variant="p" component="p">
              {auctionDetails?.status}
            </Typography>
          </Grid>
          {auctionDetails?.status == "ongoing" && auctionDetails?.userRegistered ===true && (
            <Grid item xs={{ my: 2 }}>
              <BasicModal title="Go to auction">
                <TermCondition />
              </BasicModal>
            </Grid>
          )}
        </Grid>
      </Paper>
    </>
  );
};

export default memo(AuctionDetail);
