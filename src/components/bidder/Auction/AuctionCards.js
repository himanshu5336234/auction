/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import {
  Card,
  CardActions,
  CardContent,
  makeStyles,
  Typography,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import { memo } from "react";
function AuctionCard(props) {
  const { id, key ,SetAuctionIds,auctionIds, data} = props;
  return (
    <Card key={key} id={id} sx={{ minHeight: "150px", }}>
      <Box
        sx={{
          backgroundColor: "primary.light",
          p: 2,
          
        }}
      >
        <Typography variant="h6" component="h2">
          {data?.name} {data?.created?.slice(0,10)}
        </Typography>
      </Box>

      <CardContent sx={{ position: "relative" }}>
        <div

          onClick={SetAuctionIds(id)}
          style={{
            height: "30px",
            position: " absolute",
            background: "white",
            right: "20px",
            top: "-15px",
            border: "2px solid black",
            display: "flex",
            widht: "30px",
            borderRadius: "50%",
            width: "30px",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!auctionIds.includes(id) ?<>
          
            <AddIcon sx={{ color: "primary.main" }} />
          </>:<>
            <DoneIcon sx={{ color: "primary.main" }}/>
          </>}
     
        </div>
        <Box>Round: {data?.currentRoundNumber} <br /> Status: {data?.status}</Box>
      </CardContent>
    </Card>
  );
}

export default memo(AuctionCard);
