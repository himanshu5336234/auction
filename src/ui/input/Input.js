import * as React from "react";
import TextField from "@mui/material/TextField";

export default function BasicTextFields(props) {
  const { value, variant, label, name, onChange, type, required, error,disabled } =
  props;

  return (
    <TextField
      sx={{ my: 1, width: "100%" }}  // sx is a style object
      name={name}
      disabled={disabled??false}
      error={error ?? ""}
      type={type ?? "text"}
      value={value}
      label={label ?? ""}
      onChange={onChange}
      variant={variant ?? "standard"}
      required={required}
      InputLabelProps={{ shrink: true }}
    />
  );
}
