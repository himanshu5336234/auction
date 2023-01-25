import {
  BottomNavigation,
  Box,
  Button,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BasicButton from "../../../../ui/Button/Button";
import BasicModal from "../../../../ui/model/index";
import TermCondition from "./TermCondition";
import Navbar from "../../../Nav/Navbar";
import axiosWithApiServer from "../../../../apiServices/Utils/hooks/axiosHelpers/axiosWithApiServer";
// import BasicTextFields from "../../../../ui/input/Input";
// import SelectInput from "../../../../ui/Dropdown/select";
// import PaymentModel from "../../../bidder/PaymentModel/PaymentModel";
// import AllPlotsMap from "./AllPlotsMap";
// import SingleProjectMap from "../../../../ui/Table/SingleMap";
import BottomNavContainer from "./BottomNavContainer";
import AuctionDetail from "./AuctionDetail";
const AuctionDetails = () => {
  const navigate = useNavigate();
  const { auctionId } = useParams();

  const [ProfileData, setProfileData] = useState({});
  const [EmdFormData, setEmdFormData] = useState({});
  const [auctionDetails, setAuctionDetails] = useState({});
  const [mapCoords, setMapCoords] = useState([]);

  console.log({ auctionDetails });
  useEffect(() => {
    const AUCTIONID = auctionId ?? false;
    if (AUCTIONID) {
      const url = "/profile";
      const url2 = `/bidder/auction?auctionID=${auctionId}`;

      axiosWithApiServer({ url: url2, method: "get" })
        .then((res) => {
          setAuctionDetails(res.data.data);
          setEmdFormData({
            totalProperty: 1,
            processingFees: res.data.data.processingFees,
            emdAmount: res.data.data.emdAmount + res.data.data.processingFees,
          });
          let mapCoord = [];
          res.data.data.plots.forEach((obj) => {
            mapCoord.push(obj.mapCoordinates);
          });
          setMapCoords(mapCoord);
        })
        .catch((e) => {
          console.log(e);
        });

      axiosWithApiServer({ url, method: "get" })
        .then((successResponse) => {
          setProfileData(successResponse.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      navigate("/bidder");
    }
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="xl">
    
        <AuctionDetail auctionDetails={auctionDetails}  mapCoords={mapCoords}/>
        <BottomNavContainer
          setEmdFormData={setEmdFormData}
          auctionDetails={auctionDetails}
          ProfileData={ProfileData}
          EmdFormData={EmdFormData}
          mapCoords={mapCoords}
        />
      </Container>
    </>
  );
};
export default AuctionDetails;
