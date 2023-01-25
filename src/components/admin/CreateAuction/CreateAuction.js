import { Grid, Paper, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect } from "react";
import BasicTextFields from "../../../ui/input/Input";
import Button from "../../../ui/Button/Button";
import BasicModal from "../../../ui/model";
import * as Yup from "yup";
import { useFormik } from "formik";
import AddProjectMap from "../../common/AddProjectMap/AddProjectMap";
import axiosWithApiServer from "../../../apiServices/Utils/hooks/axiosHelpers/axiosWithApiServer";

const CreateAuction = (props) => {

  const { sx } =props;
  const [mapPath, setMapPath] = React.useState([]);

  const [plotNames, setPlotNames] = React.useState([]);

  const removePlotFields = () => {
    let newFormValues = [...plotNames];
    newFormValues.pop();
    setPlotNames(newFormValues);
  };

  const plotNameChange = (index, e) => {
    let newFormValues = [...plotNames];
    newFormValues[index] = e.target.value;
    setPlotNames(newFormValues);
  };

  useEffect(() => {
    console.log(plotNames);
  }, [plotNames]);

  const formik = useFormik({
    initialValues: {
      name: "",
      startDate: "",
      endDate: "",
      regStartDate: "",
      regEndDate: "",
      baseReservePrice: "",
      emdAmount: "",
      processingFees: "",
      h1PaymentPercentage: "",
      h1PaymentEndDate: "",
    },
    onSubmit: (values) => {
      console.log(values);
      if(mapPath.length === 0){
        alert("Select Map Cordinates");
      };
      if(plotNames.length === 0){
        alert("Add atleast 1 plot Name");
      }
      const formBody = JSON.stringify({
        "name": values.name,
        "startDate": values.startDate,
        "endDate": values.endDate,
        "regStartDate": values.regStartDate,
        "regEndDate": values.regEndDate,
        "baseReservePrice": values.baseReservePrice,
        "emdAmount": values.emdAmount,
        "processingFees": values.processingFees,
        "h1PaymentPercentage": values.h1PaymentPercentage,
        "h1PaymentEndDate": values.h1PaymentEndDate,
        "plots": [{
          name: plotNames[0],
          mapCoordinates: mapPath
        }]
      });
      const url = "/admin/auction/new";
      (mapPath.length !== 0 && plotNames.length !== 0) && axiosWithApiServer({url, method: "post", body: formBody}).then((successResponse) => {
        alert("Successfully created Auction");
      }).catch((e) => {
        console.log(e);
      });
    },

    validationSchema: Yup.object({
      name: Yup.string().required(" "),
      startDate: Yup.string().required(" "),
      endDate: Yup.string().required(" "),
      regStartDate: Yup.string().required(" "),
      regEndDate: Yup.string().required(" "),
      baseReservePrice: Yup.string().required(" "),
      emdAmount: Yup.string().required(" "),
      processingFees: Yup.string().required(" "),
      h1PaymentPercentage: Yup.string().required(" "),
      h1PaymentEndDate: Yup.string().required(" "),
    }),
  });

  useEffect(() => {
    console.log(mapPath);
  }, [mapPath]);
  return (
    <>
      <BasicModal title="Add Auction">
        <Container maxWidth="md" sx={{ marginTop: "2rem" }}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ borderBottom: "1px solid gray", my: 2 }}>
              <Typography sx={{ my: 1 }} variant="h5" component="h2">
                Add Project
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={6} md={4} sx={{ p: 1 }}>
                <form onSubmit={formik.handleSubmit}>
                  <div style={{ maxHeight: "400px", overflow: "auto" }}>
                    <BasicTextFields
                      error={formik.errors.name && formik.touched.name && true}
                      name="name"
                      label="Project Name"
                      type="text"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <BasicTextFields
                      error={
                        formik.errors.startDate &&
                        formik.touched.startDate &&
                        true
                      }
                      name="startDate"
                      label="Start Date"
                      type="date"
                      value={formik.values.startDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <BasicTextFields
                      error={
                        formik.errors.endDate && formik.touched.endDate && true
                      }
                      name="endDate"
                      label="End Date"
                      type="date"
                      value={formik.values.endDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <BasicTextFields
                      error={
                        formik.errors.regStartDate &&
                        formik.touched.regStartDate &&
                        true
                      }
                      name="regStartDate"
                      label="Reg Start Date"
                      type="date"
                      value={formik.values.regStartDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <BasicTextFields
                      error={
                        formik.errors.regEndDate &&
                        formik.touched.regEndDate &&
                        true
                      }
                      name="regEndDate"
                      label="Reg End Date"
                      type="date"
                      value={formik.values.regEndDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <BasicTextFields
                      error={
                        formik.errors.baseReservePrice &&
                        formik.touched.baseReservePrice &&
                        true
                      }
                      name="baseReservePrice"
                      label="Reserve Price"
                      type="number"
                      value={formik.values.baseReservePrice}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <BasicTextFields
                      error={
                        formik.errors.emdAmount &&
                        formik.touched.emdAmount &&
                        true
                      }
                      name="emdAmount"
                      label="EMD Amount"
                      type="number"
                      value={formik.values.emdAmount}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <BasicTextFields
                      error={
                        formik.errors.processingFees &&
                        formik.touched.processingFees &&
                        true
                      }
                      name="processingFees"
                      label="Processing Fees"
                      type="number"
                      value={formik.values.processingFees}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <BasicTextFields
                      error={
                        formik.errors.h1PaymentPercentage &&
                        formik.touched.h1PaymentPercentage &&
                        true
                      }
                      name="h1PaymentPercentage"
                      label="H1 Payment %"
                      type="number"
                      value={formik.values.h1PaymentPercentage}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <BasicTextFields
                      error={
                        formik.errors.h1PaymentEndDate &&
                        formik.touched.h1PaymentEndDate &&
                        true
                      }
                      name="h1PaymentEndDate"
                      label="H1 Payment End Date"
                      type="Date"
                      value={formik.values.h1PaymentEndDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <Button onClick={() => setPlotNames([...plotNames, ""])} name="Add Plot"></Button>
                    {plotNames.length >=1 && <Button onClick={() => removePlotFields()} name="Remove a Plot"></Button>}
                    {
                      plotNames.map((plot, index) => (
                        <BasicTextFields key={index}
                          name={"Plot" + index}
                          label={"Enter the Plot Name " + index}
                          type="text"
                          onChange={(e) => plotNameChange(index, e)}
                        />
                      ))
                    }
                  </div>

                  <Button
                    style={{
                      maxWidth: "90%",
                      mx: 1,
                      my: 2,
                      py: 1,
                      px: 3,
                      fontSize: "18px",
                      backgroundColor: "primary.main",
                    }}
                    variant="contained"
                    size="small"
                    type="submit"
                    name="Submit"
                  />
                </form>
              </Grid>
              <Grid xs={6} md={8} item>
                <AddProjectMap  onChange={(value) => setMapPath(value)} plots={plotNames} />
              </Grid>
            </Grid>
          </Paper>
        </Container>

        {/*
         */}
      </BasicModal>
    </>
  );
};

export default CreateAuction;
