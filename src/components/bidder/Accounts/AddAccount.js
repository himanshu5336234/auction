import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import BasicTextFields from "../../../ui/input/Input";
import {  useFormik } from "formik";
import Button from "../../../ui/Button/Button";
import * as Yup from "yup";
import Navbar from "../../Nav/Navbar";
import axiosWithApiServer from "../../../apiServices/Utils/hooks/axiosHelpers/axiosWithApiServer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AddAccount = () => {
  useEffect(() => {
    const url = "/profile";
    axiosWithApiServer({url, method: "get"}).then((successResponse) => {
      console.log(successResponse.data);
      if(successResponse.data.data.type === "admin"){
        navigate("/admin"); // navigate to admin
      }
      else if(successResponse.data.data.type === "bidder" && successResponse.data.data.kycStatus === "not_verified"){
        navigate("/Bidder/KYCInitiate");
      }
      else if(successResponse.data.data.type === "bidder" && successResponse.data.data.kycStatus === "verified"){

        if(successResponse.data.data.pennyDropStatus === "not_verified"){
          navigate("/Bidder/addAccount"); // navigate to add account
        }
      }
    });
  }, []);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      account_number: "",
      ifsc: "",
    },
    onSubmit: (values) => {
      console.log({ values });
      const url = "/kyc/bank_account";
      const formBody = JSON.stringify({
        "accountNumber": values.account_number.toString(),
        "ifsc": values.ifsc
      });
      axiosWithApiServer({url, method: "post", body: formBody}).then((successResponse) => {
        alert("Successfully Added Bank Details");
        navigate("/Bidder");

      }).catch((e) => {
        console.log(e);
      });
    },

    validationSchema: Yup.object({

      account_number: Yup.number().required(
        "Enter beneficiary account number!"
      ),
      ifsc: Yup.string().required("Enter ifsc name"),

    }),
  });
  return (
    <>
      {" "}
      <Navbar />
      <Container maxWidth="xl" sx={{ my: 2 }}>
        <Paper sx={{ p: 2, border: "2px solid #00286B" }}>
          <Box sx={{ px: 1.5, py: 1, color: "black" }}>
            <Typography
              sx={{ my: 1, color: "#00286B" }}
              variant="h4"
              component="h2"
            >
              Primary refund bank details
            </Typography>
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <Grid sx={{ my: 2, px: 2 }} container spacing={2}>

              <Grid item md={8}>
                <BasicTextFields
                  error={
                    formik.errors.account_number &&
                      formik.touched.account_number &&
                      true
                  }
                  label="Account Number"
                  margin="dense"
                  name="account_number"
                  type="number"
                  value={formik.values.account_number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Grid>
              <Grid item md={8}>
                <BasicTextFields
                  error={
                    formik.errors.ifsc &&
                        formik.touched.ifsc &&
                        true
                  }
                  label="IFSC Code"
                  margin="dense"
                  name="ifsc"
                  type="text"
                  value={formik.values.ifsc}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Grid>

              <Grid item md={8}>
                <Button
                  style={{ my: 2, py: 1, px: 4, mx: 1, fontSize: "18px" }}
                  variant="contained"
                  color="primary"
                  size="small"
                  type="submit"
                  name="Submit"
                />
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default AddAccount;
