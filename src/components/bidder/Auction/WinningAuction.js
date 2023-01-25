import React, { useEffect, useState } from "react";
import axiosWithApiServer from "../../../apiServices/Utils/hooks/axiosHelpers/axiosWithApiServer";
import BasicTable from "../../../ui/Table/Table";

const WinningAuction = () => {
  const [WinningAuctionData, setWinningAuctionData] = useState([]);

  useEffect(() => {
    GetWinningAuctionData();
  }, []);

  const GetWinningAuctionData = () => {
    const url = "/bidder/bids/won";
    axiosWithApiServer({ url, method: "get" })
      .then((successResponse) => {
        const newData = [];
        successResponse.data.data.forEach((element) => {
          const newObj = {
            ...element,
            AmountToPay: element.amount / 10 - element.emdAmount,
          };

          newData.push(newObj);
        });

        setWinningAuctionData(newData);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const headers = [
    { id: "auctionName", label: "Name", minWidth: 170 },
    { id: "AmountToPay", label: "Amount To Pay", minWidth: 130 },
    {
      id: "amount",
      label: "Winning Bid",
      minWidth: 130,
    },
    {
      id: "emdAmount",
      label: "EMD Amount",
      minWidth: 120,
    },
    {
      id: "counterOffer",
      label: "Counter Offer",
      minWidth: 130,
    },
    {
      id: "h1PaymentEndDate",
      label: "H1 End Date",
      minWidth: 130,
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
  return (
    <>
      <BasicTable
        event="Winning Auction"
        headers={headers}
        rows={WinningAuctionData}
        redirectUrl="WauctionDetails"
      />
    </>
  );
};

export default WinningAuction;
