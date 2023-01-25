import React, { useEffect } from "react";
import { useFormik } from "formik";
import BasicTextFields from "../../../ui/input/Input";
import {
  AppBar,
  Box,
  Grid,
  Paper,

  Typography,
} from "@mui/material";
import Button from "../../../ui/Button/Button";
import * as Yup from "yup";
import SelectInput from "../../../ui/Dropdown/select";
import { Container } from "@mui/system";
import Navbar from "../../Nav/Navbar";

import axiosWithApiServer from "../../../apiServices/Utils/hooks/axiosHelpers/axiosWithApiServer";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const PasswordRegEx =
    /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
  const EmailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

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
        navigate("/Bidder/KYCInitiate"); // navigate to KYC intiate
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
      firstName: "",
      lastName: "",
      father_firstName: "",
      father_lastName: "",
      email: "",
      password: "",
      gender: "",
      confirmPassword: "",
      DOB: "",
      Address1: "",
      Address2: "",
      Address3: "",
      state: "",
    },
    onSubmit: (values) => {
      console.log(values);
      const url = "/register";
      const formBody = JSON.stringify({
        userType: "bidder",
        firstName: values.firstName,
        lastName: values.lastName,
        fatherFirstName: values.father_firstName,
        fatherLastName: values.father_lastName,
        gender: values.gender,
        dob: values.DOB,
        address:
          values.Address1 + values.Address2 + values.Address3 + values.state,
        email: values.email,
      });
      axiosWithApiServer({ url, method: "post", body: formBody })
        .then((successResponse) => {
          alert("Successfully Registered");
          console.log(successResponse.data);
          navigate("/Bidder/KYCInitiate");
        })
        .catch((e) => {
          console.log(e);
        });
    },

    validationSchema: Yup.object({
      firstName: Yup.string().required(" "),
      lastName: Yup.string().required(" "),
      father_firstName: Yup.string().required(" "),
      father_lastName: Yup.string().required(" "),
      email: Yup.string().email("Invalid email format").required(" "),
      gender: Yup.string().required(" "),
      DOB: Yup.string().required(" "),
      Address1: Yup.string().required(" "),
      Address2: Yup.string().required(" "),
      Address3: Yup.string().required(" "),
      state: Yup.string().required(" "),
    }),
  });
  return (
    <>
      <Navbar />
      <Container maxWidth="xl">
        <Box>
          <Typography sx={{ my: 2 }} variant="h4" component="h3">
            Registration
          </Typography>
        </Box>
        <Paper sx={{ p: 5, border: "2px solid #00286B" }} elevation={2}>
          <form onSubmit={formik.handleSubmit}>
            <Box>
              <Typography sx={{ my: 1 }} variant="h5" component="h3">
                Personal Details
              </Typography>
            </Box>
            <Paper
              sx={{
                p: 3,
                border: "0.5px solid #00286B",
                margin: "1.5rem 0 1.5rem 0",
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4} md={3}>
                  <BasicTextFields
                    error={
                      formik.errors.firstName &&
                      formik.touched.firstName &&
                      true
                    }
                    label="First Name"
                    size="small"
                    margin="dense"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>

                <Grid item xs={12} sm={4} md={3}>
                  <BasicTextFields
                    error={
                      formik.errors.lastName && formik.touched.lastName && true
                    }
                    label="Last Name"
                    margin="dense"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>

                <Grid item xs={12} sm={4} md={3}>
                  <BasicTextFields
                    error={
                      formik.errors.father_firstName &&
                      formik.touched.father_firstName &&
                      true
                    }
                    label=" Father First Name"
                    size="small"
                    margin="dense"
                    name="father_firstName"
                    value={formik.values.father_firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>

                <Grid item xs={12} sm={4} md={3}>
                  <BasicTextFields
                    error={
                      formik.errors.father_lastName &&
                      formik.touched.father_lastName &&
                      true
                    }
                    label=" Father Last Name"
                    margin="dense"
                    name="father_lastName"
                    value={formik.values.father_lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>

                <Grid item xs={12} sm={4} md={3}>
                  <SelectInput
                    error={
                      formik.errors.gender && formik.touched.gender && true
                    }
                    name="gender"
                    label="Gender"
                    option={[
                      { name: "Male", value: "Male" },
                      { name: "Female", value: "Female" },
                    ]}
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>

                <Grid item xs={12} sm={4} md={3}>
                  <BasicTextFields
                    error={formik.errors.email && formik.touched.email && true}
                    label="Email"
                    margin="dense"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.email && formik.touched.email && (
                    <span
                      style={{ color: "red", margin: "0px", fontSize: "12px" }}
                    >
                      {formik.errors.email}
                    </span>
                  )}
                </Grid>

                {/* <Grid item xs={12} sm={4} md={3}>
                  <BasicTextFields
                    error={
                      formik.errors.password && formik.touched.password && true
                    }
                    label="Password"
                    margin="dense"
                    name="password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.password && formik.touched.password && (
                    <span
                      style={{ color: "red", margin: "0px", fontSize: "12px" }}
                    >
                      {formik.errors.password}
                    </span>
                  )}
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                  <BasicTextFields
                    error={
                      formik.errors.confirmPassword &&
                      formik.touched.confirmPassword &&
                      true
                    }
                    label="Confirm Password"
                    margin="dense"
                    type="password"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid> */}

                <Grid item xs={12} sm={4} md={3}>
                  <BasicTextFields
                    error={formik.errors.DOB && formik.touched.DOB && true}
                    type="date"
                    label="Date of birth"
                    margin="dense"
                    name="DOB"
                    value={formik.values.DOB}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
              </Grid>
            </Paper>
            <Box>
              <Typography sx={{ my: 1 }} variant="h5" component="h3">
                Address Details
              </Typography>
            </Box>
            <Paper
              sx={{
                p: 3,
                border: "0.5px solid #00286B",
                margin: "1.5rem 0 1.5rem 0",
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={3} md={4}>
                  <BasicTextFields
                    error={
                      formik.errors.Address1 && formik.touched.Address1 && true
                    }
                    label="Address Line 1"
                    size="small"
                    margin="dense"
                    name="Address1"
                    value={formik.values.Address1}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>

                <Grid item xs={12} sm={3} md={4}>
                  <BasicTextFields
                    label="Address Line 2"
                    error={
                      formik.errors.Address2 && formik.touched.Address2 && true
                    }
                    margin="dense"
                    name="Address2"
                    value={formik.values.Address2}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>

                <Grid item xs={12} sm={3} md={4}>
                  <BasicTextFields
                    error={
                      formik.errors.Address3 && formik.touched.Address3 && true
                    }
                    label=" Address Line 3"
                    size="small"
                    margin="dense"
                    name="Address3"
                    value={formik.values.Address3}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>

                <Grid item xs={12} sm={3} md={4}>
                  <BasicTextFields
                    error={formik.errors.state && formik.touched.state && true}
                    label="State"
                    margin="dense"
                    name="state"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
              </Grid>
              <Grid xs={12} sm={3} md={4}>
                {/* <BasicButton
                  name="Register"
                  style={{
                    px: 3,
                    my: 2,
                    fontSize: "18px",
                    border: "1px solid #00286B",
                    backgroundColor: "primary.main",
                    py: 1,
                    "&:hover": {
                      backgroundColor: "#fff",

                      color: "primary.main",
                    },
                  }}
                /> */}
                <Button
                  style={{ my: 2, py: 1, px: 4, mx: 1, fontSize: "18px" }}
                  variant="contained"
                  color="primary"
                  size="small"
                  type="submit"
                  name="Register"
                />
              </Grid>
            </Paper>
          </form>
        </Paper>
      </Container>
    </>
  );
}
