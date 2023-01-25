import { Grid, Paper, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import axiosWithApiServer from "../../../apiServices/Utils/hooks/axiosHelpers/axiosWithApiServer";
import BasicButton from "../../../ui/Button/Button";
import BasicTextFields from "../../../ui/input/Input";

const PaymentModel = (props) => {
  const { amount, emdID, plotsRegistered, H1Payment, BidID,status } = props;

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    const url = "/fiat/deposit";

    axiosWithApiServer({
      url,
      method: "post",
      isMultiPartData: true,
      body: { remarks: `emd_${emdID}`, amount: amount },
    })
      .then((successResponse) => {
        if (successResponse.data.data.status === "success") {
          registerTransaction(successResponse.data.data.id);
        } else {
          alert("payment not successfully done");
        }
      })
      .catch((err) => alert(err.response.data.detail));
  };
  function registerTransaction(transactionId) {
    const url = "bidder/auction/register";
    axiosWithApiServer({
      url,
      method: "post",
      isMultiPartData: true,
      body: {
        auctionID: emdID,
        fiatDepositTxID: transactionId,
        plotsRegistered: plotsRegistered,
      },
    })
      .then((successResponse) => {
        if (successResponse.data.message === "ok") {
          alert(" Auction register successfully done");
          if(status!=="upcoming"){
            navigate("AuctionFloor");
          }
        } else {
          console.log(successResponse);
          alert(" Auction not register successfully");
        }
      })
      .catch((err) => alert(err.response.data.detail));
  }

  const handleSubmit2 = () => {
    const url = "/fiat/deposit";
    axiosWithApiServer({
      url,
      method: "post",
      isMultiPartData: true,
      body: { remarks: `H1_${emdID}`, amount: amount },
    })
      .then((successResponse) => {
        if (successResponse.data.data.status === "success") {
          registerTransaction2(successResponse.data.data.id);
        } else {
          alert("payment not successfully done");
        }
      })
      .catch((err) => alert(err.response.data.detail));
  };

  const registerTransaction2 = (transactionId) => {
    const url = "/bidder/bid/pay";

    axiosWithApiServer({
      url,
      method: "post",
      isMultiPartData: true,
      body: {
        bidID: BidID,
        fiatDepositTxID: transactionId,
      },
    })
      .then((successResponse) => {
        console.log(successResponse.data.data.paymentStatus);
        if(successResponse.data.data.paymentStatus==="success"){

          alert(" payment successfully done");
        }
        else{
          alert(" payment not successfully done");
        }
      
      })
      .catch((err) => alert(err.response.data.detail));
  };

  return (
    <>
      <Container maxWidth="sm">
        <Paper sx={{ p: 2, marginTop: "3rem" }}>
          <Box sx={{ borderBottom: "1px solid #00286B", py: 2, m: 1 }}>
            <Typography variant="h5" component="h2">
              Make payment
            </Typography>
          </Box>
          {H1Payment ? (
            <>
              <Grid sx={{ py: 2, m: 1 }} container>
                <Grid item md={8}>
                  <BasicTextFields
                    label=" Total Payment"
                    value={amount}
                    type="number"
                    name="amount"
                    disabled
                  />
                </Grid>

                <Grid item md={8}>
                  <BasicButton
                    style={{ py: 1, px: 3 }}
                    name="Submit"
                    onClick={handleSubmit2}
                  />
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <Grid sx={{ py: 2, m: 1 }} container>
                <Grid item md={8}>
                  <BasicTextFields
                    label=" Total Payment"
                    value={amount}
                    type="number"
                    name="amount"
                    disabled
                  />
                </Grid>

                <Grid item md={8}>
                  <BasicButton
                    style={{ py: 1, px: 3 }}
                    name="Submit"
                    onClick={handleSubmit}
                  />
                </Grid>
              </Grid>
            </>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default memo(PaymentModel);
