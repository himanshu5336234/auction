import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import BasicTextFields from "../../../ui/input/Input";
import Navbar from "../../Nav/Navbar";
import Button from "../../../ui/Button/Button";
import axiosWithApiServer from "../../../apiServices/Utils/hooks/axiosHelpers/axiosWithApiServer";
import { useNavigate } from "react-router-dom";

function KYCInitiate() {
  const navigate = useNavigate();

  useEffect(() => {
    const url = "/profile";
    axiosWithApiServer({ url, method: "get" }).then((successResponse) => {
      console.log(successResponse.data);
      if (successResponse.data.data.type === "admin") {
        navigate("/admin"); // navigate to admin
      } else if (
        successResponse.data.data.type === "bidder" &&
        successResponse.data.data.kycStatus === "not_verified"
      ) {
        // navigate('/Bidder/KYCInitiate'); // navigate to KYC intiate
      } else if (
        successResponse.data.data.type === "bidder" &&
        successResponse.data.data.kycStatus === "verified"
      ) {
        if (successResponse.data.data.pennyDropStatus === "not_verified") {
          navigate("/Bidder/addAccount"); // navigate to add account
        }
        if (successResponse.data.data.pennyDropStatus === "verified") {
          navigate("/Bidder"); // navigate to bidder dashboard
        }
      }

      // if undefined , stay in bidder registration
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      aadhar_number: "",
      pan: "",
    },
    onSubmit: (values) => {
      console.log({ values });
      const url = "/kyc/initiate";
      console.log(values);
      const formBody = JSON.stringify({
        pan: values.pan,
        aadharNumber: values.aadhar_number,
      });
      axiosWithApiServer({ url, method: "post", body: formBody })
        .then((successResponse) => {
          alert("Successfully Initiated KYC");
          navigate("/Bidder/addAccount");
        })
        .catch((e) => {
          console.log(e);
        });
    },

    validationSchema: Yup.object({
      aadhar_number: Yup.string().required("Enter Aadhar Number"),
      pan: Yup.string().required("Enter PAN Number"),
    }),
  });

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ my: 2 }}>
        <Paper sx={{ p: 2, border: "2px solid #00286B" }}>
          <Box sx={{ px: 1.5, py: 1, color: "black" }}>
            <Typography
              sx={{ my: 1, color: "#00286B" }}
              variant="h4"
              component="h2"
            >
              KYC Details
            </Typography>
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <Grid sx={{ my: 2, px: 2 }} container spacing={2}>
              <Grid item md={8}>
                <BasicTextFields
                  error={
                    formik.errors.aadhar_number &&
                    formik.touched.aadhar_number &&
                    true
                  }
                  label="Aadhar Number"
                  margin="dense"
                  name="aadhar_number"
                  type="text"
                  value={formik.values.aadhar_number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Grid>

              <Grid item md={8}>
                <BasicTextFields
                  error={formik.errors.pan && formik.touched.pan && true}
                  label="PAN Number"
                  margin="dense"
                  name="pan"
                  type="text"
                  value={formik.values.pan}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Grid>
              <Grid item md={8}>
                <Button
                  style={{ my: 2, py: 1, px: 4, mx: 1, fontSize: "18px" }}
                  variant="contained"
                  color="success"
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
}

export default KYCInitiate;
