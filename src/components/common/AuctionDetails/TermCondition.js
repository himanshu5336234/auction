import { Paper, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicButton from "../../../ui/Button/Button";
import BasicTextFields from "../../../ui/input/Input";

const TermCondition = () => {
  const navigate = useNavigate();
  const [termAccept, setTermAccept] = useState(false);
  const GoToAuctionFloor = () => {
    if (termAccept) {
      return navigate("AuctionFloor");
    }
  };
  return (
    <>
      <Container maxWidth="xs">
        <Paper sx={{ my: 5, p: 2 }}>
          <Box sx={{ borderBottom: "1px solid gray" }}>
            <Typography sx={{ my: 1 }} variant="h6" component="h2">
              Term and condition
            </Typography>
          </Box>

          <ul>
            <li>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </li>{" "}
            <li>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </li>{" "}
            <li>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </li>
          </ul>
          <div style={{display:"flex"}}>
            <input
              type="checkbox"
              value={termAccept}
              onChange={(e) => setTermAccept(e.target.checked)}
            />
          
            <h4>I Accept Term & conditions</h4>
            
          </div>

          <div>
            <BasicButton
              onClick={GoToAuctionFloor}
              style={{ width: "100%" }}
              name="Accept Term & conditions"
            />
          </div>
        </Paper>
      </Container>
    </>
  );
};

export default TermCondition;
