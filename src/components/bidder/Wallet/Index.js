import { Box, Button, Container, Tab, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosWithApiServer from "../../../apiServices/Utils/hooks/axiosHelpers/axiosWithApiServer";
import BasicTable from "../../../ui/Table/Table";
import Navbar from "../../Nav/Navbar";

const PaymentHeaders = [
  { id: "type", label: "Payment Type", minWidth: 170 },
  { id: "status", label: "Status", minWidth: 170 },
  { id: "created", label: "Created", minWidth: 100 },
  {
    id: "updated",
    label: "Updated",
    minWidth: 120,
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 170,
  },
];

function createData(name, code, population, size) {
  return { name, code, population, size };
}
function AdminWallet() {
  const [value, setValue] = React.useState("1");
  const navigate = useNavigate();
  const [walletDetails, setWalletDetails] = useState({});
  const [walletTable, setWalletTable] = useState([]);

  const rows = [
    createData("India", "IN", 1324171354, 3287263),
    createData("China", "CN", 1403500365, 9596961),
    createData("Italy", "IT", 60483973, 301340),
    createData("United States", "US", 327167434, 9833520),
  ];

  useEffect(() => {
    const url = "/profile";
    axiosWithApiServer({ url, method: "get" })
      .then((successResponse) => {
        console.log(successResponse.data.data);
        setWalletDetails(successResponse.data.data);
      })
      .catch((e) => {
        alert(e.response.data.error);
        if (e.response.data.error === "ent: wallet_secrets not found") {
          alert("Create a Wallet First!");
        }
      });
    const url2 = "/fiat/transactions";
    axiosWithApiServer({ url: url2, method: "get" })
      .then((successResponse) => {
        console.log(successResponse.data.data);
        setWalletTable(successResponse.data.data);
      })
      .catch((e) => {
        alert(e.response.data.error);
        if (e.response.data.error === "ent: wallet_secrets not found") {
          alert("Create a Wallet First!");
        }
      });
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={{ color: "primary.main",}}>
        <Box sx={{ display: "flex", justifyContent: "center",   }} my={5}>
          <Box
            sx={{
              display: "flex",
              height: "30vh",
              width: "30vw",
              border: "1px solid #00286B",
              borderRadius: "10px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box >
              <Typography variant="h4">INR Wallet Balance</Typography>
              <br />
              <Typography variant="h4" sx={{ textAlign: "center" }}>
                Rs. {walletDetails?.userBankAccount?.balance}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box py={2}>
          <Typography variant="h4" component="h2">INR Wallet Transactions History</Typography>
          <Box
            mt={3}
            sx={{ border: "1px solid #00286B", borderRadius: "10px" }}
          >
            <BasicTable
              event="Payment Transactions History"
              headers={PaymentHeaders}
              rows={walletTable}
            />
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default AdminWallet;
