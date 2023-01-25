import React, { useCallback, useEffect, useState } from "react";
import {
  GET_BID_BY_ID,
  GET_AUCTION_BY_ID,
} from "../../../../apiServices/URI/index";
import { useParams } from "react-router-dom";
import axiosWithApiServer from "../../../../apiServices/Utils/hooks/axiosHelpers/axiosWithApiServer";

import { Container } from "@mui/system";
import Navbar from "../../../Nav/Navbar";

import AuctionDetail from "../AuctionDetails/AuctionDetail";
import BottomNavBarContainer from "./bottomNavBarContainer";

const WinningAuctionDetails = () => {
  const { auctionId } = useParams();

  const [ProfileData, setProfileData] = useState({});
  const [auctionDetails, setAuctionDetails] = useState({});
  const [mapCoords, setMapCoords] = useState([]);

  useEffect(() => {
    GetWinningAuctionDetailsData();
  }, []);
  const SetMpCordinates = (mapData) => {
    let mapCoord = [];
    mapData.plots.forEach((obj) => {
      mapCoord.push(obj.mapCoordinates);
    });
    setMapCoords(mapCoord);
  };
  const GetWinningAuctionDetailsData = async () => {
    // const url = `/bidder/bid?bidID=${auctionId}`;
    // const url2 = `/auction?auctionID=${bidData?.data?.data.auctionID}`;
    const bidData = await axiosWithApiServer({
      url: `${GET_BID_BY_ID.url}${auctionId}`,
      method: `${GET_BID_BY_ID.reqType}`,
    });
    console.log(bidData);
    axiosWithApiServer({
      url: `${GET_AUCTION_BY_ID.url}${bidData?.data?.data.auctionID}`,
      method: `${GET_AUCTION_BY_ID.reqType}`,
    }).then((res) => {
      setAuctionDetails(res?.data?.data);
      setProfileData(bidData?.data?.data);
      SetMpCordinates(res?.data?.data);
    });
  };

  const SETPROFILEDATA = (data) =>
    useCallback(() => {
      setProfileData(data);
    }, [ProfileData]);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <AuctionDetail
          auctionDetails={auctionDetails}
          mapCoords={mapCoords}
          SETPROFILEDATA={SETPROFILEDATA}
        />
        <BottomNavBarContainer
          auctionDetails={auctionDetails}
          ProfileData={ProfileData}
          mapCoords={mapCoords}
        />
      </Container>
    </>
  );
};

export default WinningAuctionDetails;
