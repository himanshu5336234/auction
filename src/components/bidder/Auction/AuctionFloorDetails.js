import { Box, Grid, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { memo } from "react";
import BasicTable from "../../../ui/Table/Table";

const headers = [
  { id: "name", label: "Parameter", minWidth: 170 },
  { id: "code", label: "Value", minWidth: 100 },


];

function createData(name, code, ) {

  return { name, code,   };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
];
const AuctionFloorDetails = () => {
  return (
    <>
      <BasicTable headers={headers} rows={rows} />
    </>
  );
};

export default memo(AuctionFloorDetails);
