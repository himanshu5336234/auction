import { Box, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Navbar from "../../../components/Nav/Navbar";
import BasicTable from "../../../ui/Table/Table";

const BidderNotifications = () => {


  const columns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
    {
      id: "population",
      label: "Population",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "size",
      label: "Size\u00a0(km\u00b2)",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "density",
      label: "Density",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
  ];

  function createData(
    name,
    code,
    population,
    size
  ) {
    const density = population / size;
    return { name, code, population, size, density };
  }
  
  const rows = [
    createData("India", "IN", 1324171354, 3287263),
    createData("China", "CN", 1403500365, 9596961),
    createData("Italy", "IT", 60483973, 301340),
    createData("United States", "US", 327167434, 9833520),

    
  ];
  



  return (
    <>
      <Navbar />

      <Container maxWidth="lg">
        <Box sx={{my:3, color: "primary.main",}}  >
          <Typography variant="h2">
            Notifications
          </Typography>

        </Box>
        <Paper sx={{ border: "1px solid #00286B", my: 2 }}>
          <BasicTable headers={columns} rows={rows} />
        </Paper>
      </Container>
    </>
  );
};

export default BidderNotifications;
