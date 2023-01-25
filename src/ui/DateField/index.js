import { TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
const BasicDate = ({label,value,onChange}) => {
  return (
    <>
    
      <DesktopDatePicker
        label="Date desktop"
        inputFormat="MM/DD/YYYY"
        value={value}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </>
  );
};

export default BasicDate;