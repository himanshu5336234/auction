/* eslint-disable react/jsx-key */
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BasicButton from "../../../ui/Button/Button";
import BasicModal from "../../../ui/model/index";
import TermCondition from "./TermCondition";
import Navbar from "../../Nav/Navbar";
import axiosWithApiServer from "../../../apiServices/Utils/hooks/axiosHelpers/axiosWithApiServer";
import BasicTextFields from "../../../ui/input/Input";
import SelectInput from "../../../ui/Dropdown/select";
import PaymentModel from "../../bidder/PaymentModel/PaymentModel";
import AllPlotsMap from "./AllPlotsMap";
import SingleProjectMap from "../../../ui/Table/SingleMap";

const AuctionDetails = () => {
  const navigate = useNavigate();
  const { auctionId } = useParams();
  const [bottomNaviagtion, setBottomNavigation] = useState(0);
  const [ProfileData, setProfileData] = useState({});
  const [EmdFormData, setEmdFormData] = useState({});
  const [auctionDetails, setAuctionDetails] = useState({});
  const [mapCoords, setMapCoords] = useState([]);

  useEffect(() => {
    const AUCTIONID = auctionId ?? false;
    if (AUCTIONID) {
      // const url = "/profile";
      const url2 = `/bidder/auction?auctionID=${auctionId}`;

      axiosWithApiServer({ url: url2, method: "get" })
        .then((res) => {
          setAuctionDetails(res.data.data);
          setEmdFormData({
            totalProperty: 1,
            processingFees: res.data.data.processingFees,
            emdAmount: res.data.data.emdAmount + res.data.data.processingFees,
          });
          let mapCoord = [];
          res.data.data.plots.forEach((obj) => {
            mapCoord.push(obj.mapCoordinates);
          });
          setMapCoords(mapCoord);
        })
        .catch((e) => {
          console.log(e);
        });
      // axiosWithApiServer({ url, method: "get" })
      //   .then((successResponse) => {
      //     setProfileData(successResponse.data.data);
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });
    } else {
      navigate("/bidder");
    }
  }, []);

  const showAuctionDetailsPlots = (length) => {
    var arr = new Array();
    for (i = 1; i <= length; i++) {
      let obj = { name: i.toString(), value: i.toString() };
      arr.push(obj);
    }
    return arr;
  };

  const AddBottomNavigationValue = (type) => {
    switch (type) {
    case "ADD":
      if (bottomNaviagtion < 2) {
        setBottomNavigation(bottomNaviagtion + 1);
      }
      break;
    case "SUBTRACT":
      if (bottomNaviagtion > 0) {
        setBottomNavigation(bottomNaviagtion - 1);
      }
      break;
    default:
    }
  };

  const ShowNavigationCards = () => {
    switch (bottomNaviagtion) {
    case 1:
      return (
        <>
          {" "}
          <Box>
            {/* <Paper sx={{ p: 2, my: 2 }}> */}
            <Box sx={{ borderBottom: "1px solid #00286B", py: 1 }}>
              <Typography sx={{ my: 1 }} variant="h3" component="h2">
                  Primary account details
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ my: 1 }} variant="h5" component="h2">
                {" "}
                  Beneficiary Name :{" "}
                {ProfileData?.userBankAccount?.accountHoldersName ??
                    "himanshu"}
              </Typography>
              <Typography sx={{ my: 1 }} variant="h5" component="h2">
                {" "}
                  Account Number : {ProfileData?.userBankAccount?.accountNumber}
              </Typography>
              <Typography sx={{ my: 1 }} variant="h5" component="h2">
                  IFSC : {ProfileData?.userBankAccount?.ifsc}
              </Typography>
            </Box>
            {/* </Paper> */}
          </Box>
        </>
      );
      break;
    case 2:
      return (
        <>
          <Box>
            {/* <Paper sx={{ p: 2, my: 2 }}> */}
            <Box sx={{ borderBottom: "1px solid #00286B", py: 1 }}>
              <Typography sx={{ my: 1 }} variant="h3" component="h2">
                  Select Total Property
              </Typography>
            </Box>

            <Grid container spacing={3} sx={{ my: 4 }}>
              <Grid item sx={12} sm={12} md={2}>
                <BasicTextFields
                  disabled
                  value={auctionDetails?.emdAmount}
                  label="EMD Amount"
                />
              </Grid>

              <Grid item sx={12} sm={12} md={2}>
                <SelectInput
                  value={EmdFormData?.totalProperty}
                  onChange={(e) => {
                    setEmdFormData({
                      ...EmdFormData,
                      totalProperty: parseInt(e.target.value),
                      emdAmount:
                          auctionDetails?.emdAmount * parseInt(e.target.value) +
                          EmdFormData.processingFees,
                    });
                  }}
                  label="Select Total Property"
                  limit={auctionDetails?.plots.length}
                  option={showAuctionDetailsPlots(
                    auctionDetails?.plots.length
                  )}
                />
              </Grid>
              <Grid item sx={12} sm={12} md={2}>
                <BasicTextFields
                  disabled
                  value={EmdFormData?.processingFees}
                  label="Processing fees"
                />
              </Grid>

              <Grid item sx={12} sm={12} md={2}>
                <BasicTextFields
                  disabled
                  value={EmdFormData.emdAmount}
                  label="Total EMD Amount"
                />
              </Grid>
              <Grid item sx={12} sm={12} md={2}>
                <Button fullWidth sx={{ border: "1px solid" }}>
                  <BasicModal
                    sx={{
                      border: "none",
                      "&:hover": {
                        backgroundColor: "rgb(255 255 255 / 4%)",
                        border: "none",
                      },
                    }}
                    title="Pay EMD"
                  >
                    <PaymentModel
                      amount={EmdFormData.emdAmount}
                      plotsRegistered={EmdFormData.totalProperty}
                      emdID={auctionDetails?.id}
                    />
                  </BasicModal>
                </Button>
              </Grid>
            </Grid>

            {/* </Paper> */}
          </Box>
        </>
      );

      break;
    default:
      return (
        <>
          {" "}
          <Box>
            <Box sx={{ borderBottom: "1px solid #00286B", py: 2 }}>
              <Typography sx={{ my: 1 }} variant="h3" component="h2">
                  Instructions
              </Typography>
            </Box>
            <p>
                To register for auction, select the number of properties to
                register for and pay EMD.
            </p>
            {/* </Paper> */}
          </Box>
        </>
      );
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="xl">
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
            <Grid item sx={12} sm={6} md={3}>
              <Typography sx={{ my: 1 }} variant="h5" component="h2">
                Auction Start Date
              </Typography>
              <Typography variant="p" component="p">
                {new Date(auctionDetails?.startDate).toLocaleDateString(
                  "en-US"
                )}
              </Typography>
            </Grid>
            <Grid item sx={12} sm={6} md={3}>
              <Typography sx={{ my: 1 }} variant="h5" component="h2">
                Auction End Date
              </Typography>
              <Typography variant="p" component="p">
                {new Date(auctionDetails?.endDate).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item sx={12} sm={6} md={3}>
              <Typography sx={{ my: 1 }} variant="h5" component="h2">
                Registration Start Date
              </Typography>
              <Typography variant="p" component="p">
                {new Date(auctionDetails?.regStartDate).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item sx={12} sm={6} md={3}>
              <Typography sx={{ my: 1 }} variant="h5" component="h2">
                Registration End Date
              </Typography>
              <Typography variant="p" component="p">
                {new Date(auctionDetails?.regEndDate).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item sx={12} sm={6} md={3}>
              <Typography sx={{ my: 1 }} variant="h5" component="h2">
                Auction Name
              </Typography>
              <Typography variant="p" component="p">
                {auctionDetails?.name}
              </Typography>
            </Grid>
            <Grid item sx={12} sm={6} md={3}>
              <Typography sx={{ my: 1 }} variant="h5" component="h2">
                EMD Amount
              </Typography>
              <Typography variant="p" component="p">
                {auctionDetails?.emdAmount}
              </Typography>
            </Grid>
            <Grid item sx={12} sm={6} md={3}>
              <Typography sx={{ my: 1 }} variant="h5" component="h2">
                H1 payment %
              </Typography>
              <Typography variant="p" component="p">
                {auctionDetails?.h1PaymentPercentage} %
              </Typography>
            </Grid>
            <Grid item sx={12} sm={6} md={3}>
              <Typography sx={{ my: 1 }} variant="h5" component="h2">
                H1 payment endDate
              </Typography>
              <Typography variant="p" component="p">
                {new Date(
                  auctionDetails?.h1PaymentEndDate
                ).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item sx={12} sm={6} md={3}>
              <Typography sx={{ my: 1 }} variant="h5" component="h2">
                Processing fees
              </Typography>
              <Typography variant="p" component="p">
                {auctionDetails?.processingFees}
              </Typography>
            </Grid>
            <Grid item sx={12} sm={6} md={3}>
              <Typography sx={{ my: 1 }} variant="h5" component="h2">
                Auction status
              </Typography>
              <Typography variant="p" component="p">
                {auctionDetails?.status}
              </Typography>
            </Grid>
            {auctionDetails?.status == "ongoing" && (
              <Grid item sx={{ my: 2 }}>
                <BasicModal title="Go to auction">
                  <TermCondition />
                </BasicModal>
              </Grid>
            )}
          </Grid>
        </Paper>

        <Box sx={{ m: 2, p: 2 }}>
          <Grid container spacing={2}>
            <Grid item md={3}>
              <Typography
                variant="h4"
                component="h5"
                sx={
                  bottomNaviagtion == 0
                    ? {
                      maxWidth: "55%",
                      cursor: "pointer",
                      borderBottom: "3px solid rgb(42, 87, 148)",
                      padding: " 10px 0px",
                      background: "#fff",
                      borderRadius: "0px",
                      boxShadow: " none",
                      color: "#00286B",
                      "&:hover": {
                        backgroundColor: "#fff",
                        boxShadow: "none",
                      },
                    }
                    : {
                      maxWidth: "55%",

                      cursor: "pointer",
                      borderRadius: "0px",
                      padding: "10px 0px",
                      borderBottom: "3px solid #fff",
                      background: "#fff",
                      color: "#00286B",
                      "&:hover": {
                        backgroundColor: "#fff",
                        boxShadow: "none",
                      },
                      boxShadow: " none",
                    }
                }
                onClick={() => setBottomNavigation(0)}
              >
                INSTRUCTIONS
              </Typography>
            </Grid>
            <Grid item md={4}>
              <Typography
                variant="h4"
                component="h5"
                sx={
                  bottomNaviagtion == 1
                    ? {
                      maxWidth: "75%",
                      cursor: "pointer",
                      borderBottom: "3px solid rgb(42, 87, 148)",
                      padding: " 10px 0px",
                      background: "#fff",
                      borderRadius: "0px",
                      boxShadow: " none",
                      color: "#00286B",
                      "&:hover": {
                        backgroundColor: "#fff",
                        boxShadow: "none",
                      },
                    }
                    : {
                      maxWidth: "75%",

                      cursor: "pointer",
                      borderRadius: "0px",
                      padding: "10px 0px",
                      borderBottom: "3px solid #fff",
                      background: "#fff",
                      color: "#00286B",
                      "&:hover": {
                        backgroundColor: "#fff",
                        boxShadow: "none",
                      },
                      boxShadow: " none",
                    }
                }
                onClick={() => setBottomNavigation(1)}
              >
                REFUND ACCOUNT DETAILS
              </Typography>
            </Grid>{" "}
            <Grid item md={3}>
              <Typography
                variant="h4"
                component="h5"
                sx={
                  bottomNaviagtion == 2
                    ? {
                      maxWidth: "35%",
                      cursor: "pointer",
                      borderBottom: "3px solid rgb(42, 87, 148)",
                      padding: " 10px 0px",
                      background: "#fff",
                      borderRadius: "0px",
                      boxShadow: " none",
                      color: "#00286B",
                      "&:hover": {
                        backgroundColor: "#fff",
                        boxShadow: "none",
                      },
                    }
                    : {
                      maxWidth: "35%",

                      cursor: "pointer",
                      borderRadius: "0px",
                      padding: "10px 0px",
                      borderBottom: "3px solid #fff",
                      background: "#fff",
                      color: "#00286B",
                      "&:hover": {
                        backgroundColor: "#fff",
                        boxShadow: "none",
                      },
                      boxShadow: " none",
                    }
                }
                onClick={() => setBottomNavigation(2)}
              >
                PAY EMD
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Paper sx={{ m: 3, p: 4, border: "1px solid #00286B" }}>
          <Box sx={{ my: 1, p: 1 }}>{ShowNavigationCards()}</Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {bottomNaviagtion > 0 && (
              <BasicButton
                style={{ py: 1, px: 3 }}
                name="Prev"
                onClick={() => AddBottomNavigationValue("SUBTRACT")}
              />
            )}
            {bottomNaviagtion < 2 && (
              <BasicButton
                style={{ py: 1, px: 3 }}
                name="Next"
                onClick={() => AddBottomNavigationValue("ADD")}
              />
            )}
          </Box>
        </Paper>
      </Container>
    </>
  );
};
export default AuctionDetails;
