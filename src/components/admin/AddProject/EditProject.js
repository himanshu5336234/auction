
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { CustomTextField } from "../../../components/ui";
import SearchIcon from "@mui/icons-material/Search";
import "./AddProject.scss";
import AddProjectMap from "./AddProjectMap";
import axiosWithApiServer from "../../../components/axiosWithApiServer";
import { useNavigate, useParams } from "react-router-dom";

const alfabetsRegExp = /^[aA-zZ\s]+$/;

const validationSchema = Yup.object().shape({
  tehsil: Yup.string()
    .required("Tehsil is required")
    .matches(alfabetsRegExp, "Only alphabets are allowed for this field"),
  district: Yup.string()
    .required("District is required")
    .matches(alfabetsRegExp, "Only alphabets are allowed for this field"),
  pincode: Yup.string()
    .required("PIN Code is required")
    .matches(/^(\d{4}|\d{6})$/, "6 digits required"),
  state: Yup.string()
    .required("State is required")
    .matches(alfabetsRegExp, "Only alphabets are allowed for this field"),
  status: Yup.string().required("Status is Required"),
});
const btnStyle = {
  width: "100%",
  height: "60px",
  backgroundColor: "#00286B",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#fff",
    color: "#00286B",
  },
};
export default function EditProject() {
  const searchParams = useParams();
  const [imgUrlArray, setImgUrlArray] = React.useState([]);
  const [mapPath, setMapPath] = React.useState([]);
  const [initialValues, setInitialValues] = React.useState({});
  const [isRender, setIsRender] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();
  function getProjectDetails() {
    const url = `https://api-dev.pahal.cloud/project?projectID=${searchParams.id}`;
    axiosWithApiServer({ url, method: "get" }).then((response) => {
      console.log(response.data.data);
      const body = {
        tehsil: response.data.data.tehsil,
        district: response.data.data.district,
        pincode: response.data.data.pincode,
        village: response.data.data.village,
        khewat: response.data.data.khewat,
        khatoni: response.data.data.khatoni,
        murabba: response.data.data.murabba,
        khasra: response.data.data.khasra,
        state: response.data.data.state,
        startDate:
          response.data.data && response.data.data.startDate.substring(0, 10),
        endDate:
          response.data.data && response.data.data.endDate.substring(0, 10),
        mapCoords: response.data.data.mapsCoords,
        images: response.data.data.images,
        status: response.data.data.status,
      };
      setInitialValues(body);
      setIsRender(true);
      setMapPath(response.data.data.mapsCoords);
      setImgUrlArray(response.data.data.images);
    });
  }

  React.useEffect(() => {
    getProjectDetails();
  }, []);
  React.useEffect(() => console.log(initialValues), [initialValues]);
  function handleFileUpload(event) {
    const selectedPictures = event.target.files;
    console.log(selectedPictures.length);
    let imgUrlArrayTemp = [...imgUrlArray];
    const url = "https://api-dev.pahal.cloud/land/image/upload";
    for (let i = 0; i < selectedPictures.length; i++) {
      const serverImageData = new FormData();
      serverImageData.append("file", selectedPictures[i]);
      console.log(serverImageData);
      const headers = { "Content-Type": "multipart/form-data" };
      const isMultiPartData = true;
      axiosWithApiServer({
        url,
        method: "post",
        body: serverImageData,
        headers,
        isMultiPartData,
      })
        .then((successResponse) => {
          imgUrlArrayTemp.push(successResponse.data.data.url);
          console.log(successResponse);
        })
        .catch((e) => console.log(e));
    }
    setImgUrlArray(imgUrlArrayTemp);
  }

  const onSignup = (values) => {
    console.log("called");

    const formBody = JSON.stringify({
      projectID: searchParams.id,
      tehsil: values.tehsil,
      district: values.district,
      pincode: values.pincode,
      state: values.state,
      village: values.village,
      khewat: values.khewat,
      khatoni: values.khatoni,
      murabba: values.murabba,
      khasra: values.khasra,
      startDate: values.startDate,
      endDate: values.endDate,
      mapCoords: mapPath,
      images: imgUrlArray,
      status: values.status,
    });
    console.log(formBody);
    const url = "https://api-dev.pahal.cloud/admin/project/update";
    axiosWithApiServer({ url, method: "post", body: formBody })
      .then((successResponse) => {
        console.log(successResponse);
        setMessage("Updated");
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box component="main" sx={{ flexGrow: 1, background: "#EFF6FF" }}>
          <>
            <Typography
              ml={3}
              mt={3}
              sx={{
                fontFamily: "DM Sans",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "40px",
              }}
            >
              Edit a Project{" "}
            </Typography>

            <div
              style={{
                margin: "20px",
                background: "white",
                borderRadius: "10px",
              }}
            >
              <Grid my={2} container sx={{ padding: "0 0px" }}>
                <Grid xs={4}>
                  <Box mx={2} mt={2}>
                    <TextField
                      sx={{ width: "100%" }}
                      label="Search Google Maps"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment>
                            <IconButton>
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>

                  {isRender && (
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      validateOnBlur={false}
                      validateOnChange={false}
                      onSubmit={(value) => onSignup(value)}
                    >
                      {() => (
                        <Form id="edit-form">
                          <Box mx={2}>
                            <CustomTextField
                              name="tehsil"
                              label="Tehsil"
                              placeholder="Enter Tehsil"
                              Required
                            />
                            <CustomTextField
                              name="district"
                              label="District"
                              placeholder="Enter District"
                            />
                            <CustomTextField
                              name="state"
                              label="State"
                              placeholder="Enter State"
                            />
                            <CustomTextField
                              name="pincode"
                              label="PIN Code"
                              placeholder="Enter Pincode"
                            />
                            <CustomTextField
                              name="village"
                              label="Village"
                              placeholder="Enter village"
                            />
                            <CustomTextField
                              name="khewat"
                              label="Khewat"
                              placeholder="Enter Khewat"
                            />
                            <CustomTextField
                              name="khatoni"
                              label="Khatoni"
                              placeholder="Enter Khatoni"
                            />
                            <CustomTextField
                              name="murabba"
                              label="Murabba"
                              placeholder="Enter Murabba"
                            />
                            <CustomTextField
                              name="khasra"
                              label="Khasra"
                              placeholder="Enter Khasra"
                            />
                            <Field name="status">
                              {({ field, form, meta }) => (
                                <div>
                                  <label
                                    htmlFor="date_from"
                                    style={{
                                      fontWeight: "700",
                                      color: "black",
                                    }}
                                  >
                                    Status
                                  </label>
                                  <br />
                                  <select
                                    defaultValue={initialValues.status}
                                    name="status"
                                    {...field}
                                    style={{ height: "2.7rem" }}
                                  >
                                    {[
                                      "Project Opened",
                                      "Applications Invited",
                                      "Applications Closed",
                                      "Notifications Issued",
                                      "Sale Deed Executed",
                                      "LEC Issued",
                                      "Project Started",
                                      "Project Ended",
                                      "Land Allotted",
                                      "LEC Submitted",
                                    ].map((obj) => {
                                      return (
                                        <>
                                          <option value={obj}>{obj}</option>
                                        </>
                                      );
                                    })}
                                    {meta.touched && meta.error && (
                                      <div
                                        className="error"
                                        style={{ fontSize: "10px" }}
                                      >
                                        {meta.error}
                                      </div>
                                    )}
                                  </select>
                                </div>
                              )}
                            </Field>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                              my={2}
                            >
                              <div style={{ display: "inline-block" }}>
                                <label
                                  htmlFor="date_from"
                                  style={{ fontWeight: "700", color: "black" }}
                                >
                                  Start Date
                                </label>
                                <br />
                                <Field name="startDate">
                                  {({ field, form, meta }) => (
                                    <div>
                                      <input
                                        type="date"
                                        {...field}
                                        style={{ height: "2.7em" }}
                                      />
                                      {meta.touched && meta.error && (
                                        <div
                                          className="error"
                                          style={{ fontSize: "10px" }}
                                        >
                                          {meta.error}
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </Field>
                              </div>
                              <div style={{ display: "inline-block" }}>
                                <label
                                  htmlFor="date_to"
                                  style={{ fontWeight: "700", color: "black" }}
                                >
                                  End Date
                                </label>
                                <br />
                                <Field name="endDate">
                                  {({ field, form, meta }) => (
                                    <div>
                                      <input
                                        type="date"
                                        {...field}
                                        style={{ height: "2.7em" }}
                                      />
                                      {meta.touched && meta.error && (
                                        <div
                                          className="error"
                                          style={{ fontSize: "10px" }}
                                        >
                                          {meta.error}
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </Field>
                              </div>
                            </Box>
                            <Typography
                              sx={{
                                fontWeight: "700",
                                color: "black",
                                fontSize: "14px",
                              }}
                            >
                              Add Images or Videos
                            </Typography>
                            <div className="card">
                              <div className="drop_box">
                                <header>
                                  <h4>Select File here</h4>
                                </header>
                                <Field name="imgs">
                                  {({ field, form, meta }) => {
                                    return (
                                      <div>
                                        <input
                                          type="file"
                                          accept="image/*"
                                          {...field}
                                          onChange={(e) => handleFileUpload(e)}
                                          multiple
                                          style={{
                                            margin: "auto",
                                            padding: "auto",
                                          }}
                                        />
                                        {meta.touched && meta.error && (
                                          <div
                                            className="error"
                                            style={{ fontSize: "10px" }}
                                          >
                                            {meta.error}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  }}
                                </Field>
                              </div>
                            </div>
                            <Box
                              sx={{ mt: 4, mb: 2, width: "100%" }}
                              id="btnbox"
                            >
                              <Button sx={btnStyle} type="submit">
                                Submit
                              </Button>
                            </Box>
                            {message !== "" && (
                              <>
                                <p>Updated</p>
                                <Button
                                  onClick={() => navigate("/admin-dashboard")}
                                >
                                  Go Back
                                </Button>
                              </>
                            )}
                          </Box>
                        </Form>
                      )}
                    </Formik>
                  )}
                </Grid>
                <Grid xs={8}>
                  <AddProjectMap
                    height="800px"
                    prefill={mapPath}
                    onChange={(value) => setMapPath(value)}
                  />
                </Grid>
              </Grid>
            </div>
          </>
        </Box>
      </Box>
    </>
  );
}
