import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  left: "0px",
  margin: "auto",
  right: "0px",
  maxWidth: "80%",
  width: "100%",
  bgcolor: "background.paper",
  top: "20%",
  boxShadow: 24,
  p: 4,
};

function BasicModal(props) {
  const [openModel, setOpenModel] = React.useState(false);
  const handleOpen = () => setOpenModel(true);
  const handleClose = () => setOpenModel(false);

  return (
    <>
      <Button sx={props.sx} onClick={handleOpen} variant='outlined'>{props.title ?? "Open modal"}</Button>

      <Modal  open={openModel} onClose={handleClose}>
        {props.children}
      </Modal>
    </>
  );
}

export default BasicModal;
