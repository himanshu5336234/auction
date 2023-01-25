/* eslint-disable react/prop-types */
import { AccountCircle } from "@mui/icons-material";
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import usePagination from "@mui/material/usePagination/usePagination";
import React, { memo } from "react";
import {  Link, redirect, useNavigate, useParams } from "react-router-dom";
import BasicButton from "../../../ui/Button/Button";

function AuctionNavbar(props) {
  const { auctionIds } = props;
  console.log({ auctionIds }, "navbar");
  const searchParams = useParams();
  const auctionID = searchParams.auctionId;
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
 
  const navigate = useNavigate();
  // const handleChange = (event) => {
  //   setAuth(event.target.checked);
  // };

  // const handleMenu = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const  redirectToAuctionFloorDAshboard =()=>{
    if(auctionIds.length>0){
      navigate(`${"dashboard"}/${[...auctionIds]}`);
    }
  };
  return (
    <AppBar
      position="static"
      component="nav"
      sx={{ background: "white", boxShadow: "none", marginTop: "2rem", paddingRight: "5rem" }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: "#00286B", marginLeft: "3rem" }}
        ></Typography>
        <div>
          <Link to={`/Bidder/auctionDetails/${auctionID}/AuctionFloor/dashboard`} state={{ data: auctionIds }} className="link">
            <BasicButton
              onClick={redirectToAuctionFloorDAshboard}
              style={{ py: 1, px: 2 }}
              color="primary"
              name="Go to Auction"
            />
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default memo(AuctionNavbar);
