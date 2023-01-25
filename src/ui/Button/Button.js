import React from "react";
import { Button } from "@mui/material";
const BasicButton = (props) => {
  const { style, variant, size, type, color, name ,onClick,fullWidth,disabled} = props;
  return (
    <>
      <Button
        onClick={onClick}
        fullWidth={fullWidth??false}
        disabled={disabled}
        sx={style}
        variant={variant ?? "contained"}
        color={color ?? "primary"}
        size={size ?? "small"}
        type={type ?? "submit"}
      >
        {name}
      </Button>
    </>
  );
};

export default BasicButton;
