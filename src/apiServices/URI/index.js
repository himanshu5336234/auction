import { REQUEST_TYPE } from "../Base";

export const GET_NOTIFICATION = {
  url: "/notifications",
  reqType: REQUEST_TYPE.GET,
};

export const GET_BID_BY_ID = {
  url: "/bidder/bid?bidID=",
  reqType: REQUEST_TYPE.GET,
};

export const GET_AUCTION_BY_ID = {
  url: "/auction?auctionID=",
  reqType: REQUEST_TYPE.GET,
};

export const GET_AUCTIONS_AUCTION_DASHBOARD = {
  url: "/bidder/auctions",
  reqType: REQUEST_TYPE.GET,
};

export const GET_BIDDER_BID = {
  url: "/bidder/bids",
  reqType: REQUEST_TYPE.GET,
};
