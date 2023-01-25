import { Button, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { memo, useState } from "react";
import BasicButton from "../../../../ui/Button/Button";
import SelectInput from "../../../../ui/Dropdown/select";
import BasicTextFields from "../../../../ui/input/Input";
import BasicModal from "../../../../ui/model";
import PaymentModel from "../../PaymentModel/PaymentModel";
import DoneAllIcon from "@mui/icons-material/DoneAll";
const BottomNavContainer = (props) => {
  const {
    mapCoords,
    ProfileData,
    EmdFormData,
    setEmdFormData,
    auctionDetails,
  } = props;

  const [bottomNaviagtion, setBottomNavigation] = useState(0);

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
              <Grid item xs={12} sm={12} md={2}>
                <BasicTextFields
                  disabled
                  value={auctionDetails?.emdAmount}
                  label="EMD Amount"
                />
              </Grid>

              <Grid item xs={12} sm={12} md={2}>
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
                  option={[
                    { name: "1", value: "1" },
                    { name: "2", value: "2" },
                    { name: "3", value: "3" },
                    { name: "4", value: "4" },
                    { name: "5", value: "5" },
                  ]}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                <BasicTextFields
                  disabled
                  value={EmdFormData?.processingFees}
                  label="Processing fees"
                />
              </Grid>

              <Grid item xs={12} sm={12} md={2}>
                <BasicTextFields
                  disabled
                  value={EmdFormData.emdAmount}
                  label="Total EMD Amount"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                {auctionDetails?.userRegistered === true ? (
                  <>
                    <Typography variant="h6">Payment Done</Typography>
                    <DoneAllIcon
                      sx={{ color: "primary.success", fontSize: "40px" }}
                    />
                  </>
                ) : (
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
                )}
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
                When JavaScript reaches a break keyword, it breaks out of the
                switch block. This will stop the execution inside the switch
                block. It is not necessary to break the last case in a switch
                block. The block breaks (ends) there anyway.
            </p>
            {/* </Paper> */}
          </Box>
        </>
      );
    }
  };
  return (
    <>
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

      <Paper sx={{ m: 2, p: 2, border: "1px solid #00286B" }}>
        <div style={{ position: "relative", minHeight: "300px" }}>
          <Box sx={{ my: 1, p: 1 }}>{ShowNavigationCards()}</Box>
          <Box    sx={{
            position: "absolute",
            bottom: "10px",
            width: "97%",
            margin: "auto",
          }}>
            <Box  sx={{ display: "flex", justifyContent: "space-between" }}>
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
     
        </div>
      </Paper>
    </>
  );
};

export default memo(BottomNavContainer);
