import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { memo, useState } from "react";
import BasicButton from "../../../../ui/Button/Button";
import BasicTextFields from "../../../../ui/input/Input";
import BasicModal from "../../../../ui/model";
import PaymentModel from "../../PaymentModel/PaymentModel";
import DoneAllIcon from "@mui/icons-material/DoneAll";
const bottomNavBarContainer = (props) => {
  const { ProfileData, SETPROFILEDATA, auctionDetails } = props;
  const [bottomNaviagtion, setBottomNavigation] = useState(0);

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
      SETPROFILEDATA(res.data.data);
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
      SETPROFILEDATA(res.data.data);
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
        <>
          {" "}
          <Grid container spacing={3}>
            <Grid item md={3}>
              <Box>
                <Typography sx={{ my: 1 }} variant="h4" component="h2">
                    Counter Offer :{ProfileData?.counterOffer}
                </Typography>
              </Box>
            </Grid>
            <Grid item md={2}>
              <BasicButton
                fullWidth
                onClick={AcceptCounterOffer}
                disabled={
                  ProfileData.counterOfferStatus == "created" ? false : true
                }
                name="Accept"
                style={{
                  py: 1,
                  px: 2,
                  color: "#fff",
                  backgroundColor: "primary.success",
                  "&:hover": {
                    boxShadow: "none",
                    backgroundColor: "#fff",
                    color: "primary.success",
                    border: "1px solid",
                    borderColor: "primary.success",
                  },
                }}
              />
            </Grid>
            <Grid item md={2}>
              <BasicButton
                onClick={RejectCounterOffer}
                disabled={
                  ProfileData.counterOfferStatus == "created" ? false : true
                }
                fullWidth
                name="Reject"
                style={{
                  py: 1,
                  px: 2,
                  color: "#fff",
                  backgroundColor: "primary.danger",
                  "&:hover": {
                    backgroundColor: "#fff",
                    color: "primary.danger",
                    border: "1px solid",
                    boxShadow: "none",
                    borderColor: "primary.danger",
                  },
                }}
              />
            </Grid>
          </Grid>
        </>
      );
      break;
    case 2:
      return (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <BasicTextFields
              disabled
              value={auctionDetails?.emdAmount}
              label="EMD Amount"
            />
          </Grid>
          {ProfileData.counterOfferStatus === "accepted" ? (
            <>
              <Grid item xs={12} sm={6} md={3}>
                <BasicTextFields
                  disabled
                  value={ProfileData?.counterOffer}
                  label="Counter Offer"
                />
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} sm={6} md={3}>
                <BasicTextFields
                  disabled
                  value={ProfileData?.amount}
                  label="Winning Bid"
                />
              </Grid>
            </>
          )}
          {ProfileData.counterOfferStatus === "accepted" ? (
            <>
              <Grid item xs={12} sm={6} md={3}>
                <BasicTextFields
                  disabled
                  value={
                    ProfileData.counterOffer / 10 - ProfileData.emdAmount
                  }
                  label="	Amount To Pay"
                />
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} sm={6} md={3}>
                <BasicTextFields
                  disabled
                  value={ProfileData.amount / 10 - ProfileData.emdAmount}
                  label="	Amount To Pay"
                />
              </Grid>
            </>
          )}

          <Grid item xs={12} sm={6} md={3}>
            {ProfileData.counterOfferStatus == "rejected" ? (
              <>
              
                <Typography variant="h5" sx={{ color: "primary.danger" }}>
                    You had reject the counter Offer
                </Typography>
              </>
            ) : (
           
              <>{ProfileData.paymentStatus!=="success"?<>
                <BasicModal
                  sx={{
                    width: "100%",
                    py: 2,
                    px: 4,
                    color: "#fff",
                    border: "none",
                    backgroundColor: "primary.success",
                    "&:hover": {
                      color: "primary.success",
                      backgroundColor: "#fff",
                      borderColor: "primary.success",
                    },
                  }}
                  title=" H1 Pay "
                >
                  {ProfileData.counterOfferStatus == "accepted" ? (
                    <>
                      <PaymentModel
                        plotsRegistered
                        H1Payment={true}
                        amount={
                          ProfileData.counterOffer / 10 -
                           ProfileData.emdAmount
                        }
                        emdID={ProfileData?.auctionID}
                        BidID={ProfileData?.id}
                      />
                    </>
                  ) : (
                    <>
                      <PaymentModel
                        H1Payment={true}
                        amount={
                          ProfileData.amount / 10 - ProfileData.emdAmount
                        }
                        BidID={ProfileData?.id}
                        emdID={ProfileData?.auctionID}
                      />
                    </>
                  )}
                </BasicModal>
              </>:  <>
                <Typography variant="h6">Payment Done</Typography>
                <DoneAllIcon
                  sx={{ color: "primary.success", fontSize: "40px" }}
                />
              </>}
             
              </>
            )}
          </Grid>
        </Grid>
      );

      break;
    default:
      return (
        <>
          {" "}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography sx={{ my: 1 }} variant="h5" component="h2">
                  Round Number
              </Typography>
              <Typography variant="p" component="p">
                {ProfileData?.roundNumber}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography sx={{ my: 1 }} variant="h5" component="h2">
                  Bid Status
              </Typography>
              <Typography variant="p" component="p">
                {ProfileData?.bidStatus}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography sx={{ my: 1 }} variant="h5" component="h2">
                  Counter Status
              </Typography>
              <Typography variant="p" component="p">
                {ProfileData?.counterOfferStatus}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography sx={{ my: 1 }} variant="h5" component="h2">
                  Bid Amount
              </Typography>
              <Typography variant="p" component="p">
                {ProfileData?.amount}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography sx={{ my: 1 }} variant="h5" component="h2">
                  Round Reserve Price
              </Typography>
              <Typography variant="p" component="p">
                {ProfileData?.roundReservePrice}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
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

      <Paper sx={{ m: 2, p: 2, border: "1px solid #00286B" }}>
        <div
          style={{ position: "relative", minHeight: "250px", overflow: "auto" }}
        >
          <Box sx={{ my: 2 }}>{ShowNavigationCards()}</Box>
        </div>
        <Box>
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
        </Box>
      </Paper>
    </>
  );
};

export default memo(bottomNavBarContainer);
