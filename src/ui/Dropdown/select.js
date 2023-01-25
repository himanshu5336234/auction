import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectInput(props) {
  const { value, label, name, onChange, option, required, error, limit } =
    props;

  const showMenuItems = () => {
    const optionData = option ?? [{ name: "none", value: "" }];
    const optionLimit = limit ?? false;
    if (limit) {
      return optionData.map((item, index) => {
        if (index < optionLimit) {
          return (
            
            <MenuItem key={index} value={item.value}>
              {item.name}
            </MenuItem>
           
          );
        }
      });
    } else {
      return optionData.map((item, index) => {
        return (
          <MenuItem key={index} value={item.value}>
            {item.name}
          </MenuItem>
        );
      });
    }
  };
  return (
    <>
      <FormControl variant="standard" sx={{ my: 1, width: "100%" }}>
        <InputLabel>{label ?? ""}</InputLabel>
        <Select
          error={error ?? ""}
          name={name}
          required={required}
          onChange={onChange}
          value={value}
          label={label ?? ""}
        >
          {showMenuItems()}
        </Select>
      </FormControl>
    </>
  );
}
