import { AppBar, Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosWithApiServer from "../../../apiServices/Utils/hooks/axiosHelpers/axiosWithApiServer";
import BasicButton from "../../../ui/Button/Button";
import BasicTable from "../../../ui/Table/Table";

const Auction = () => {
  const [auctionData, setAuctionData] = useState([]);

  useEffect(() => {
    const url = "/auctions";
    axiosWithApiServer({ url, method: "get" })
      .then((successResponse) => {
        setAuctionData(successResponse.data.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const [auctionEvent, setAuctinEvent] = useState(0);

  const headers = [
    { id: "name", label: "Name", minWidth: 160 },
    { id: "startDate", label: "Start Date", minWidth: 180 },
    {
      id: "endDate",
      label: "End Date",
      minWidth: 180,
    },
    {
      id: "status",
      label: "Status",
      minWidth: 100,
    },
  ];

  function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
  }

  const rows = [
    createData("India", "IN", 1324171354, 3287263),
    createData("China", "CN", 1403500365, 9596961),
    createData("Italy", "IT", 60483973, 301340),
  ];
  const PastAuction = auctionData.filter((item, index) => {
    return item.status == "finished";
  });
  const UpcomingAuction = auctionData.filter((item, index) => {
    return item.status == "upcoming";
  });

  const CurrentAuction = auctionData.filter((item, index) => {
    return item.status == "ongoing";
  });
  console.log({ CurrentAuction });
  const showEvent = (type) => {
    switch (type) {
    case 1:
      return (
        <BasicTable
          event="   Current  Auction"
          headers={headers}
          rows={CurrentAuction}
          ifModal={true}
        />
      );
      break;
    case 2:
      return (
        <BasicTable
          event=" Past Auction"
          headers={headers}
          rows={PastAuction}
          ifModal={true}
        />
      );

      break;
    default:
      return (
        <>
          {" "}
          <BasicTable
            event=" Upcoming Auction"
            headers={headers}
            rows={UpcomingAuction}
            ifModal={true}
          />
        </>
      );
    }
  };

  console.log({ PastAuction });
  return (
    <>
      <header style={{ marginBottom: "10px" }}>
        <Grid container spacing={2}>
          <Grid item md={4}>
            <Typography
              variant="h5"
              component="h4"
              sx={
                auctionEvent == 0
                  ? {
                    cursor: "pointer",
                    borderBottom: "3px solid rgb(42, 87, 148)",
                    padding: "20px 10px",
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
                    cursor: "pointer",
                    borderRadius: "0px",
                    padding: "20px 10px",
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
              onClick={() => setAuctinEvent(0)}
            >
              UPCOMING AUCTIONS
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography
              variant="h5"
              component="h5"
              sx={
                auctionEvent == 1
                  ? {
                    cursor: "pointer",
                    borderBottom: "3px solid rgb(42, 87, 148)",
                    padding: "20px 10px",
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
                    cursor: "pointer",

                    borderRadius: "0px",
                    padding: "20px 10px",
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
              onClick={() => setAuctinEvent(1)}
            >
              CURRENT AUCTIONS
            </Typography>
          </Grid>{" "}
          <Grid item md={4}>
            <Typography
              variant="h5"
              component="h5"
              sx={
                auctionEvent == 2
                  ? {
                    cursor: "pointer",
                    borderBottom: "3px solid rgb(42, 87, 148)",
                    padding: "20px 10px",
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
                    cursor: "pointer",
                    borderRadius: "0px",
                    padding: "20px 10px",
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
              onClick={() => setAuctinEvent(2)}
            >
              PAST AUCTIONS
            </Typography>
          </Grid>
        </Grid>

        <></>
      </header>

      <Box>{showEvent(auctionEvent)}</Box>
    </>
  );
};

export default Auction;
