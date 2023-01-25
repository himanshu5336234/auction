/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import BasicModal from "../model";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Modal,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import SelectInput from "../Dropdown/select";
import { useState } from "react";
import Countdown from "react-countdown";
import axiosWithApiServer from "../../apiServices/Utils/hooks/axiosHelpers/axiosWithApiServer";
import SingleProjectMap from "./SingleMap";
import { useEffect } from "react";

export default function BasicTable(props) {
  const navigate = useNavigate();
  const {
    height,
    redirectUrl,
    headers,
    rows,
    isAuctionFloor,
    ifModal,
    event,
  } = props;

  const header = headers ?? [
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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [profile, setProfile] = useState({});
  const [ModalFlag, setModalFlag] = useState(false);
  const [modalState, setModalState] = useState({});

  const handleOpen = (row) => {
    const url = `/auction?auctionID=${row.id}`;
    axiosWithApiServer({ url, method: "get" })
      .then((successResponse) => {
        setModalFlag(true);
        console.log(successResponse.data.data, "row2");

        setModalState(successResponse.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleClose = () => setModalFlag(false);
  const [activeMultiplier, setActiveMultiplier] = useState(1);

  const [plotID, setPlotID] = useState("");

  const handlePlotChange = (event) => {
    setPlotID(event.target.value);
  };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  const navigateToTheGivenUrl = (id, isModal) => {
    if (redirectUrl) {
      navigate(`${redirectUrl}/${id}`);
    }
  };

  React.useEffect(() => {
    const url = "/profile";
    axiosWithApiServer({ url, method: "get" })
      .then((successResponse) => {
        console.log(successResponse);
        setProfile(successResponse.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  function setBid(auctionID) {
    const url = "/bidder/auction/bid/new";
    const formBody = JSON.stringify({
      auctionID: auctionID,
      increaseFactor: parseInt(activeMultiplier),
    });
    console.log(auctionID);
    axiosWithApiServer({ url, method: "post", body: formBody })
      .then((successResponse) => {
        alert("Bid created");
      })
      .catch((e) => {
        console.log(e);
        alert(e.response.data.message);
      });
  }

  function BookPlot(row) {
    const url = "/bidder/auction/plot/book";
    const formBody = JSON.stringify({
      auctionID: row.auctionID,
      plotID: plotID,
      roundNumber: parseInt(row.roundNumber),
    });
    axiosWithApiServer({ url, method: "post", body: formBody })
      .then((successResponse) => {
        alert("Successfully Booked");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function getLastBidColor(row) {
    return profile.id === row?.h1User ? "#39E75F": "#FFCCCB";
  }

  function getCountdownEndTime(row) {
    if (row?.status!=="ongoing") {
      let x = new Date(row?.endTime);
      return new Date(x.getTime()+10*60000);
    } else if (row?.status === "ongoing") {
      return new Date(row?.endTime);
    }
  }

  useEffect(() => {}, []);

  return (
    <>
      <TableContainer
        sx={{ minHeight: 440, maxHeight: height ?? 440, height: "100%" }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "primary.light" }}>
            <TableRow>
              {header?.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              {isAuctionFloor && (
                <>
                  <TableCell style={{ minWidth: 80 }}>
                    {"Last Bid"}
                  </TableCell>
                  <TableCell style={{ minWidth: "170" }}>
                    {"Time Remaining"}
                  </TableCell>
                  <TableCell style={{ minWidth: "170" }}>{"Rank"}</TableCell>
                  <TableCell style={{ minWidth: "170" }}>{"BID"}</TableCell>
                  <TableCell style={{ minWidth: "170" }}>
                    {"Plot List"}
                  </TableCell>
                  <TableCell style={{ minWidth: "170" }}>
                    {"Book Plot"}
                  </TableCell>
                </>
              )}
            </TableRow>
          </TableHead>

          {rows.length > 0 ? (
            <>
              <TableBody>
                {rows
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <>
                        <TableRow
                          onClick={
                            ifModal
                              ? () => handleOpen(row)
                              : () => navigateToTheGivenUrl(row.id, ifModal)
                          }
                          hover
                          sx={
                            row.counterOfferStatus === "created"
                              ? {
                                cursor: "pointer",
                                border: "none",
                                backgroundColor: "#f82c2c69",
                                color: "#fff",
                              }
                              : { cursor: "pointer", border: "none" }
                          }
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {header.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.id === "regStartDate" ||
                                column.id === "regEndDate" ||
                                column.id === "updated" ||
                                column.id === "created" ||
                                column.id === "h1PaymentEndDate" ||
                                column.id === "startDate" ||
                                column.id === "endDate"
                                  ? value?.slice(0, 10)
                                  : column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                              </TableCell>
                            );
                          })}
                          {isAuctionFloor && (
                            <>
                              <TableCell style={{"backgroundColor": getLastBidColor(row)}}>
                                {row?.userLastBid}
                              </TableCell>
                              <TableCell>
                                {
                                  row?.status==="ongoing" &&
                                  <Countdown
                                    date={
                                      getCountdownEndTime(row)
                                    // new Date().getTime()
                                    }
                                  />
                                }
                                {
                                  row?.status==="booking" &&
                                  <>
                                    <p>
                                    Booking going to end in 
                                    </p>
                                    <Countdown
                                      date={
                                        new Date(new Date(getCountdownEndTime(row)).getTime()+10*60000)
                                        // new Date().getTime()
                                      }
                                    />
                                  </>
                                }
                                {
                                  row?.status==="finished" &&
                                  <p>
                                    Round finished
                                  </p>
                                }
                              </TableCell>
                              <TableCell>
                                {row.h1User === profile.id ? "H1 User" : ""}
                              </TableCell>
                              <TableCell>
                                <SelectInput
                                  value={activeMultiplier}
                                  onChange={(e) => {
                                    setActiveMultiplier(e.target.value);
                                  }}
                                  label="Multiplier"
                                  option={[
                                    { name: "1x", value: "1" },
                                    { name: "2x", value: "2" },
                                    { name: "3x", value: "3" },
                                    { name: "4x", value: "4" },
                                    { name: "5x", value: "5" },
                                    { name: "6x", value: "6" },
                                    { name: "7x", value: "7" },
                                    { name: "8x", value: "8" },
                                    { name: "9x", value: "9" },
                                    { name: "10x", value: "10" },
                                  ]}
                                />
                                <Button
                                  onClick={() => setBid(row.auctionID)}
                                  disabled={row.status !== "ongoing"}
                                  variant="contained"
                                >
                                  Bid
                                </Button>
                              </TableCell>
                              <TableCell>
                                <BasicModal
                                  sx={{ fontSize: "11px" }}
                                  title="Plot List"
                                >
                                  <Container
                                    sx={{
                                      marginTop: "3rem",
                                      zIndex: "1",
                                      background: "white",
                                    }}
                                    maxWidth="lg"
                                  >
                                    <TableContainer
                                      sx={{
                                        maxHeight: height ?? 440,
                                        minHeight: 440,
                                      }}
                                    >
                                      <Table>
                                        <TableHead
                                          sx={{
                                            backgroundColor: "primary.light",
                                          }}
                                        >
                                          <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Round Number</TableCell>
                                            <TableCell>Bid Price</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>View</TableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          {row.plots.map((obj, index) => (
                                            <TableRow key={index}>
                                              <TableCell>{obj?.name}</TableCell>
                                              <TableCell>
                                                {obj?.roundNumber}
                                              </TableCell>
                                              <TableCell>
                                                {obj?.bidPrice}
                                              </TableCell>
                                              <TableCell>
                                                {obj?.status}
                                              </TableCell>
                                              <TableCell>
                                                <BasicModal title="View Plot">
                                                  <SingleProjectMap
                                                    prefill={obj.mapCoordinates}
                                                    height="420px"
                                                  />
                                                </BasicModal>
                                              </TableCell>
                                            </TableRow>
                                          ))}
                                        </TableBody>
                                      </Table>
                                    </TableContainer>
                                  </Container>
                                </BasicModal>
                              </TableCell>
                              <TableCell>
                                {row.h1User !== profile.id ? (
                                  <Button variant="contained" disabled>
                                    Book Plot
                                  </Button>
                                ) : (
                                  <BasicModal title="Book Plot">
                                    <Container
                                      sx={{
                                        background: "white",
                                        marginTop: "5rem",
                                        paddingBottom: "50px",
                                      }}
                                    >
                                      <Typography variant="h5" py={3}>
                                        Choose Plots
                                      </Typography>
                                      <Box
                                        my={3}
                                        p={4}
                                        sx={{
                                          border: "1px solid #2196f3",
                                          borderRadius: "10px",
                                          marginBottom: "30px",
                                        }}
                                      >
                                        <FormControl>
                                          <FormLabel id="demo-radio-buttons-group-label">
                                            Select the plot
                                          </FormLabel>
                                          <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue={row?.plots[0]?.id}
                                            name="radio-buttons-group"
                                            value={plotID}
                                            onChange={handlePlotChange}
                                          >
                                            {row.plots.map((obj, index) => (
                                              <FormControlLabel
                                                key={index}
                                                value={obj.id}
                                                control={<Radio />}
                                                label={obj.name}
                                              />
                                            ))}
                                          </RadioGroup>
                                        </FormControl>
                                        <Box py={3} my={3}>
                                          <Button
                                            sx={{ float: "right" }}
                                            variant="outlined"
                                            onClick={() => BookPlot(row)}
                                          >
                                            Confirm
                                          </Button>
                                        </Box>
                                      </Box>
                                    </Container>
                                  </BasicModal>
                                )}
                              </TableCell>
                            </>
                          )}
                        </TableRow>
                        <Modal open={ModalFlag} onClose={handleClose}>
                          <Box
                            sx={{
                              background: "white",
                              width: "80vw",
                              margin: "5rem auto 0 auto",
                              height: "70vh",
                            }}
                          >
                            <Typography
                              sx={{ my: 1, p: 4 }}
                              variant="h5"
                              component="h2"
                            >
                              Auction Basic Details
                            </Typography>
                            <Paper
                              sx={{ m: 3, p: 4, border: "1px solid #00286B" }}
                            >
                              <Grid container spacing={2} px={2}>
                                <Grid item sx={12} sm={6} md={3}>
                                  <Typography
                                    sx={{ my: 1 }}
                                    variant="h5"
                                    component="h2"
                                  >
                                    Auction Start Date
                                  </Typography>
                                  <Typography variant="p" component="p">
                                    {new Date(
                                      modalState?.startDate
                                    ).toLocaleDateString("en-US")}
                                  </Typography>
                                </Grid>
                                <Grid item sx={12} sm={6} md={3}>
                                  <Typography
                                    sx={{ my: 1 }}
                                    variant="h5"
                                    component="h2"
                                  >
                                    Auction End Date
                                  </Typography>
                                  <Typography variant="p" component="p">
                                    {new Date(
                                      modalState?.endDate
                                    ).toLocaleDateString()}
                                  </Typography>
                                </Grid>
                                <Grid item sx={12} sm={6} md={3}>
                                  <Typography
                                    sx={{ my: 1 }}
                                    variant="h5"
                                    component="h2"
                                  >
                                    Registration Start Date
                                  </Typography>
                                  <Typography variant="p" component="p">
                                    {new Date(
                                      modalState?.regStartDate
                                    ).toLocaleDateString()}
                                  </Typography>
                                </Grid>
                                <Grid item sx={12} sm={6} md={3}>
                                  <Typography
                                    sx={{ my: 1 }}
                                    variant="h5"
                                    component="h2"
                                  >
                                    Registration End Date
                                  </Typography>
                                  <Typography variant="p" component="p">
                                    {new Date(
                                      modalState?.regEndDate
                                    ).toLocaleDateString()}
                                  </Typography>
                                </Grid>
                                <Grid item sx={12} sm={6} md={3}>
                                  <Typography
                                    sx={{ my: 1 }}
                                    variant="h5"
                                    component="h2"
                                  >
                                    Auction Name
                                  </Typography>
                                  <Typography variant="p" component="p">
                                    {modalState?.name}
                                  </Typography>
                                </Grid>
                                <Grid item sx={12} sm={6} md={3}>
                                  <Typography
                                    sx={{ my: 1 }}
                                    variant="h5"
                                    component="h2"
                                  >
                                    EMD Amount
                                  </Typography>
                                  <Typography variant="p" component="p">
                                    {modalState?.emdAmount}
                                  </Typography>
                                </Grid>
                                <Grid item sx={12} sm={6} md={3}>
                                  <Typography
                                    sx={{ my: 1 }}
                                    variant="h5"
                                    component="h2"
                                  >
                                    H1 payment %
                                  </Typography>
                                  <Typography variant="p" component="p">
                                    {modalState?.h1PaymentPercentage} %
                                  </Typography>
                                </Grid>
                                <Grid item sx={12} sm={6} md={3}>
                                  <Typography
                                    sx={{ my: 1 }}
                                    variant="h5"
                                    component="h2"
                                  >
                                    H1 payment endDate
                                  </Typography>
                                  <Typography variant="p" component="p">
                                    {new Date(
                                      modalState?.h1PaymentEndDate
                                    ).toLocaleDateString()}
                                  </Typography>
                                </Grid>
                                <Grid item sx={12} sm={6} md={3}>
                                  <Typography
                                    sx={{ my: 1 }}
                                    variant="h5"
                                    component="h2"
                                  >
                                    Processing fees
                                  </Typography>
                                  <Typography variant="p" component="p">
                                    {modalState?.processingFees}
                                  </Typography>
                                </Grid>
                                <Grid item sx={12} sm={6} md={3}>
                                  <Typography
                                    sx={{ my: 1 }}
                                    variant="h5"
                                    component="h2"
                                  >
                                    Auction status
                                  </Typography>
                                  <Typography variant="p" component="p">
                                    {modalState?.status}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Paper>
                          </Box>
                        </Modal>
                      </>
                    );
                  })}
              </TableBody>
            </>
          ) : (
            <>
              <Box sx={{ px: 2, m: 2, width: "100%" }}>
                <Typography variant="h6"> No {event} </Typography>
              </Box>
            </>
          )}
        </Table>
      </TableContainer>
    </>
  );
}
