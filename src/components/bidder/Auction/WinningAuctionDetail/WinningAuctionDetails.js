import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosWithApiServer from "../../../../apiServices/Utils/hooks/axiosHelpers/axiosWithApiServer";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { borderColor, Container } from "@mui/system";
import Navbar from "../../../Nav/Navbar";
import BasicModal from "../../../../ui/model";
import BasicButton from "../../../../ui/Button/Button";
import PaymentModel from "../../PaymentModel/PaymentModel";
import BasicTextFields from "../../../../ui/input/Input";
import AllPlotsMap from "../../../common/AuctionDetails/AllPlotsMap";
import TermCondition from "../../../common/AuctionDetails/TermCondition";

const WinningAuctionDetails = () => {
  const navigate = useNavigate();
  const { auctionId } = useParams();
  const [bottomNaviagtion, setBottomNavigation] = useState(0);
  const [ProfileData, setProfileData] = useState({});
  const [auctionDetails, setAuctionDetails] = useState({});
  const [mapCoords, setMapCoords] = useState([]);

  useEffect(() => {
    GetWinningAuctionDetailsData();
  }, []);

  const GetWinningAuctionDetailsData = async () => {
    const url = `/bidder/bid?bidID=${auctionId}`;
    const bidData = await axiosWithApiServer({ url, method: "get" });
    const url2 = `/auction?auctionID=${bidData?.data?.data.auctionID}`;
    axiosWithApiServer({ url: url2, method: "get" }).then((res) => {
      setAuctionDetails(res.data.data);
      setProfileData(bidData?.data?.data);
      let mapCoord = [];
      res.data.data.plots.forEach((obj) => {
        mapCoord.push(obj.mapCoordinates);
      });
      setMapCoords(mapCoord);
    });
  };

  const AcceptCounterOffer = () => {
    const url = "/bidder/bid/counter";
    const body = {
      bidID: ProfileData.id,
      response: "accepted",
    };
    axiosWithApiServer({
      url,
      method: "post",
      body: JSON.stringify(body),
    }).then((res) => {
      setProfileData(res.data.data);
    });
  };

  const RejectCounterOffer = () => {
    const url = "/bidder/bid/counter";
    const body = {
      bidID: ProfileData.id,
      response: "rejected",
    };
    axiosWithApiServer({
      url,
      method: "post",
      body: JSON.stringify(body),
    }).then((res) => {
      setProfileData(res.data.data);
    });
  };
  const ShowPaymentbutton = (status) => {};

  function AddBottomNavigationValue(type) {
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
  }

  const ShowNavigationCards = () => {
    switch (bottomNaviagtion) {
    case 1:
      return (
        <></>
        // <>
        //   {" "}
        //   <Grid container spacing={3}>
        //     <Grid item md={3}>
        //       <Box>
        //         <Typography sx={{ my: 1 }} variant="h4" component="h2">
        //             Counter Offer :{ProfileData?.counterOffer}
        //         </Typography>
        //       </Box>
        //     </Grid>
        //     <Grid item md={2}>
        //       <BasicButton
        //         fullWidth
        //         onClick={AcceptCounterOffer}
        //         disabled={
        //           ProfileData.counterOfferStatus == "created" ? false : true
        //         }
        //         name="Accept"
        //         style={{
        //           py: 1,
        //           px: 2,
        //           color: "#fff",
        //           backgroundColor: "primary.success",
        //           "&:hover": {
        //             boxShadow: "none",
        //             backgroundColor: "#fff",
        //             color: "primary.success",
        //             border: "1px solid",
        //             borderColor: "primary.success",
        //           },
        //         }}
        //       />
        //     </Grid>
        //     <Grid item md={2}>
        //       <BasicButton
        //         onClick={RejectCounterOffer}
        //         disabled={
        //           ProfileData.counterOfferStatus == "created" ? false : true
        //         }
        //         fullWidth
        //         name="Reject"
        //         style={{
        //           py: 1,
        //           px: 2,
        //           color: "#fff",
        //           backgroundColor: "primary.danger",
        //           "&:hover": {
        //             backgroundColor: "#fff",
        //             color: "primary.danger",
        //             border: "1px solid",
        //             boxShadow: "none",
        //             borderColor: "primary.danger",
        //           },
        //         }}
        //       />
        //     </Grid>
        //   </Grid>
        // </>
      );
      break;
    case 2:
      // return (

      //   <Grid container spacing={2}>
      //     <Grid item xs={12} sm={6} md={3}>
      //       <BasicTextFields
      //         disabled
      //         value={auctionDetails?.emdAmount}
      //         label="EMD Amount"
      //       />
      //     </Grid>
      //     {ProfileData.counterOfferStatus === "accepted" ? (
      //       <>
      //         <Grid item xs={12} sm={6} md={3}>
      //           <BasicTextFields
      //             disabled
      //             value={ProfileData?.counterOffer}
      //             label="Counter Offer"
      //           />
      //         </Grid>
      //       </>
      //     ) : (
      //       <>
      //         <Grid item xs={12} sm={6} md={3}>
      //           <BasicTextFields
      //             disabled
      //             value={ProfileData?.amount}
      //             label="Winning Bid"
      //           />
      //         </Grid>
      //       </>
      //     )}
      //     {ProfileData.counterOfferStatus === "accepted" ? (
      //       <>
      //         <Grid item xs={12} sm={6} md={3}>
      //           <BasicTextFields
      //             disabled
      //             value={
      //               ProfileData.counterOffer / 10 - ProfileData.emdAmount
      //             }
      //             label="	Amount To Pay"
      //           />
      //         </Grid>
      //       </>
      //     ) : (
      //       <>
      //         <Grid item xs={12} sm={6} md={3}>
      //           <BasicTextFields
      //             disabled
      //             value={ProfileData.amount / 10 - ProfileData.emdAmount}
      //             label="	Amount To Pay"
      //           />
      //         </Grid>
      //       </>
      //     )}

      //     <Grid item xs={12} sm={6} md={3}>
      //       {ProfileData.counterOfferStatus !== "rejected" ? (
      //         <>
      //           <BasicModal
      //             sx={{
      //               width: "100%",
      //               py: 2,
      //               px: 4,
      //               color: "#fff",
      //               border: "none",
      //               backgroundColor: "primary.success",
      //               "&:hover": {
      //                 color: "primary.success",
      //                 backgroundColor: "#fff",
      //                 borderColor: "primary.success",
      //               },
      //             }}
      //             title=" H1 Pay "
      //           >
      //             {ProfileData.counterOfferStatus == "accepted" ? (
      //               <>
      //                 <PaymentModel
      //                   plotsRegistered
      //                   H1Payment={true}
      //                   amount={
      //                     ProfileData.counterOffer / 10 -
      //                         ProfileData.emdAmount
      //                   }
      //                   emdID={ProfileData?.auctionID}
      //                   BidID={ProfileData?.id}
      //                 />
      //               </>
      //             ) : (
      //               <>
      //                 <PaymentModel
      //                   H1Payment={true}
      //                   amount={
      //                     ProfileData.amount / 10 - ProfileData.emdAmount
      //                   }
      //                   BidID={ProfileData?.id}
      //                   emdID={ProfileData?.auctionID}
      //                 />
      //               </>
      //             )}
      //           </BasicModal>
      //         </>
      //       ) : (
      //         <>
      //           <Typography variant="h5" sx={{ color: "primary.danger" }}>
      //                 You had reject the counter Offer
      //           </Typography>
      //         </>
      //       )}
      //     </Grid>
      //   </Grid>

      // );

      break;
    default:
      return (
        <>
          {" "}
          <Grid container spacing={2} sx={{ padding: "20px 0px" }}>
            <Grid item sx={12} sm={6} md={3}>
              <Typography sx={{ my: 1 }} variant="h5" component="h2">
                  Round Number
              </Typography>
              <Typography variant="p" component="p">
                {ProfileData?.roundNumber}
              </Typography>
            </Grid>
            <Grid item sx={12} sm={6} md={3}>
              <Typography sx={{ my: 1 }} variant="h5" component="h2">
                  Bid Status
              </Typography>
              <Typography variant="p" component="p">
                {ProfileData?.bidStatus}
              </Typography>
            </Grid>
            <Grid item sx={12} sm={6} md={3}>
              <Typography sx={{ my: 1 }} variant="h5" component="h2">
                  Counter Status
              </Typography>
              <Typography variant="p" component="p">
                {ProfileData?.counterOfferStatus}
              </Typography>
            </Grid>
            <Grid item sx={12} sm={6} md={3}>
              <Typography sx={{ my: 1 }} variant="h5" component="h2">
                  Bid Amount
              </Typography>
              <Typography variant="p" component="p">
                {ProfileData?.amount}
              </Typography>
            </Grid>
            <Grid item sx={12} sm={6} md={3}>
              <Typography sx={{ my: 1 }} variant="h5" component="h2">
                  Round Reserve Price
              </Typography>
              <Typography variant="p" component="p">
                {ProfileData?.roundReservePrice}
              </Typography>
            </Grid>
            <Grid item sx={12} sm={6} md={3}>
              <Typography sx={{ my: 1 }} variant="h5" component="h2">
                  Payment Status
              </Typography>
              <Typography variant="p" component="p">
                {ProfileData?.paymentStatus}
              </Typography>
            </Grid>
          </Grid>
        </>
      );
    }
  };

 

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
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
            <BasicModal title="View map">
              <Container sx={{ marginTop: "3rem" }} maxWidth="lg">
                {mapCoords.length > 0 && <AllPlotsMap mapCoords={mapCoords} />}
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
          </Grid>
        </Paper>

        <Box sx={{ m: 2, p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={8} sm={3} md={4}>
              <Typography
                variant="h4"
                component="h5"
                sx={
                  bottomNaviagtion == 0
                    ? {
                      maxWidth: "50%",
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
                      maxWidth: "50%",

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
                BID DETAILS
              </Typography>
            </Grid>
            <Grid item xs={8} sm={3} md={4}>
              <Typography
                variant="h4"
                component="h5"
                sx={
                  bottomNaviagtion == 1
                    ? {
                      maxWidth: "50%",
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
                      maxWidth: "50%",

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
                COUNTER OFFER
              </Typography>
            </Grid>{" "}
            <Grid item xs={8} sm={3} md={4}>
              <Typography
                variant="h4"
                component="h5"
                sx={
                  bottomNaviagtion == 2
                    ? {
                      maxWidth: "50%",
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
                      maxWidth: "50%",

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
                H1 PAYMENT
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* <Paper sx={{ m: 2, p: 4, border: "1px solid #00286B" }}>
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
        </Paper> */}
      </Container>
    </>
  );
};

export default WinningAuctionDetails;
