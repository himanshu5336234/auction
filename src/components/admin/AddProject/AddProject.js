// import * as React from "react";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import { Button, Grid, IconButton, InputAdornment, TextField } from "@mui/material";
// // import AdminSidebar from "../AdminSidebar/AdminSidebar";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// // import { CustomTextField } from "../../../components/ui";
// import SearchIcon from '@mui/icons-material/Search';
// import "./AddProject.scss";
// import AddProjectMap from "./AddProjectMap";
// // import axiosWithApiServer from "../../../components/axiosWithApiServer";

// const alfabetsRegExp = /^[aA-zZ\s]+$/;

// const validationSchema = Yup.object().shape({
//   name: Yup.string().required("Name is required").matches(alfabetsRegExp, "Only alphabets are allowed for this field"),
//   tehsil: Yup.string().required("Tehsil is required").matches(alfabetsRegExp, "Only alphabets are allowed for this field"),
//   district: Yup.string().required("District is required").matches(alfabetsRegExp, "Only alphabets are allowed for this field"),
//   pincode: Yup.string().required("PIN Code is required").matches(/^(\d{4}|\d{6})$/, "6 digits required"),
//   state: Yup.string().required("State is required").matches(alfabetsRegExp, "Only alphabets are allowed for this field"),
//   date_from: Yup.date().required("From Date is required"),
//   date_to: Yup.date().required("To Date is required")
// });
// const btnStyle = {
//   width: "100%",
//   height: "60px",
//   backgroundColor: '#00286B',
//   color: '#fff',
//   '&:hover': {
//     backgroundColor: '#fff',
//     color: '#00286B',
//   }
// };

// export default function AddProject() {

//   const [mapPath, setMapPath] = React.useState([
//     { lat: "", lng: "" },
//   ]);

//   const [imgUrlArray, setImgUrlArray] = React.useState([]);

//   React.useEffect(() => {
//     console.log(mapPath);
//   }, [mapPath]);

//   const initialValues = {
//     name: "",
//     tehsil: "",
//     district: "",
//     pincode: "",
//     village: "",
//     khewat: "",
//     khatoni: "",
//     murabba: "",
//     khasra: "",
//     state: "",
//     date_from: "",
//     date_to: ""
//   };

//   function handleFileUpload(event) {

//     const selectedPictures = event.target.files;
//     console.log(selectedPictures.length);
//     // serverImageData.append("file", selectedPictures);
//     let imgUrlArrayTemp = [...imgUrlArray];
//     const url = "https://api-dev.pahal.cloud/land/image/upload";
//     for (let i = 0; i < selectedPictures.length; i++) {
//       const serverImageData = new FormData();
//       console.log("called");
//       serverImageData.append("file", selectedPictures[i]);
//       console.log(serverImageData);
//       const headers = { "Content-Type": "multipart/form-data" };
//       const isMultiPartData = true;
//       axiosWithApiServer({ url, method: "post", body: serverImageData, headers, isMultiPartData }).then((successResponse) => {
//         imgUrlArrayTemp.push(successResponse.data.data.url);
//         console.log(successResponse);
//       }).catch((e) => console.log(e));
//     }
//     setImgUrlArray(imgUrlArrayTemp);
//   };

//   const onSignup = (values) => {
//     console.log("called");

//     const formBody = JSON.stringify({
//       projectName: values.name,
//       tehsil: values.tehsil,
//       district: values.district,
//       pincode: values.pincode,
//       state: values.state,
//       village: values.village,
//       khewat: values.khewat,
//       khatoni: values.khatoni,
//       murabba: values.murabba,
//       khasra: values.khasra,
//       startDate: values.date_from,
//       endDate: values.date_to,
//       mapCoords: mapPath,
//       images: imgUrlArray
//     })
//     console.log(formBody);
//     const url = "https://api-dev.pahal.cloud/admin/project";

//     axiosWithApiServer({ url, method: "post", body: formBody }).then((successResponse) => {
//       console.log(successResponse);
//     }).catch((e) => console.log(e));
//   };

//   return (
//     <>
//       <Box sx={{ display: "flex" }}>
//         <Box component="main" sx={{ flexGrow: 1, background: "#EFF6FF" }}>
//           <>
//             <Typography ml={3} mt={3} sx={{ fontFamily: 'DM Sans', fontStyle: "normal", fontWeight: "500", fontSize: "40px" }}>Add a Project </Typography>

//             {/* <Box sx={{backgroundColor: "white", width: "100%", display: "flex", height: "56px", borderRadius: "8px", justifyContent: "space-between"}}>
//                   <Typography variant="p" sx={{textAlign: "center", margin: "auto 10px", fontSize: "20px"}}>Add a wallet</Typography>
//                   <Button sx={{background: "#1E40AF", color: "white", padding: "9px 20px 10px", height: "39px", width: "68px", marginTop: "auto", marginBottom: "auto", marginRight: "10px",'&:hover': { backgroundColor: '#fff',color: '#00286B' } }}>Add</Button>
//                 </Box> */}
//             <div style={{ margin: "20px", background: "white", borderRadius: "10px" }}>
//               <Grid my={2} container sx={{ padding: "0 0px" }}>
//                 <Grid xs={4}>
//                   <Box mx={2} mt={2}>
//                     <TextField sx={{ width: "100%" }}
//                       label="Search Google Maps"
//                       InputProps={{
//                         endAdornment: (
//                           <InputAdornment>
//                             <IconButton>
//                               <SearchIcon />
//                             </IconButton>
//                           </InputAdornment>
//                         )
//                       }}
//                     />
//                   </Box>

//                   <Formik initialValues={initialValues} validationSchema={validationSchema} validateOnBlur={false} validateOnChange={false} onSubmit={(value) => onSignup(value)}>
//                     {() => (
//                       <Form id="signup-form">
//                         <Box mx={2}>
//                           <CustomTextField name="name" label="Project Name" placeholder="Enter Project Name" Required id="text" />
//                           <CustomTextField name="tehsil" label="Tehsil" placeholder="Enter Tehsil" Required />
//                           <CustomTextField name="district" label="District" placeholder="Enter District" />
//                           <CustomTextField name="state" label="State" placeholder="Enter State" />
//                           <CustomTextField name="pincode" label="PIN Code" placeholder="Enter Pincode" />
//                           <CustomTextField name="village" label="Village" placeholder="Enter village" />
//                           <CustomTextField name="khewat" label="Khewat" placeholder="Enter Khewat" />
//                           <CustomTextField name="khatoni" label="Khatoni" placeholder="Enter Khatoni" />
//                           <CustomTextField name="murabba" label="Murabba" placeholder="Enter Murabba" />
//                           <CustomTextField name="khasra" label="Khasra" placeholder="Enter Khasra" />

//                           <Box sx={{ display: "flex", justifyContent: "space-between" }} my={2}>
//                             <div style={{ display: "inline-block" }}>
//                               <label for="date_from" style={{ fontWeight: "700", color: "black" }}>Start Date</label><br />
//                               <Field name="date_from">
//                                 {({ field, form, meta }) => (
//                                   <div>
//                                     <input type="date" {...field} style={{ height: "2.7em" }} />
//                                     {meta.touched &&
//                                       meta.error && <div className="error" style={{ fontSize: "10px" }}>{meta.error}</div>}
//                                   </div>
//                                 )}
//                               </Field>
//                             </div>
//                             <div style={{ display: "inline-block" }}>
//                               <label for="date_to" style={{ fontWeight: "700", color: "black" }}>End Date</label><br />
//                               <Field name="date_to">
//                                 {({ field, form, meta }) => (
//                                   <div>
//                                     <input type="date" {...field} style={{ height: "2.7em" }} />
//                                     {meta.touched &&

//                                       meta.error && <div className="error" style={{ fontSize: "10px" }}>{meta.error}</div>}
//                                   </div>
//                                 )}
//                               </Field>
//                             </div>
//                           </Box>
//                           <Typography sx={{ fontWeight: "700", color: "black", fontSize: "14px" }}>Add Images or Videos</Typography>
//                           <div class="card">

//                             <div class="drop_box">
//                               <header>
//                                 <h4>Select File here</h4>
//                               </header>
//                               <div>
//                                 <input
//                                   multiple
//                                   type="file"
//                                   accept="image/*"
//                                   style={{ margin: "auto", padding: "auto" }}
//                                   onChange={(e) => handleFileUpload(e)} />
//                               </div>
//                             </div>

//                           </div>
//                           <Box sx={{ mt: 4, mb: 2, width: "100%" }} id="btnbox">
//                             <Button sx={btnStyle} type="submit">Submit</Button>
//                           </Box>
//                         </Box>
//                       </Form>
//                     )}
//                   </Formik>
//                 </Grid>
//                 <Grid xs={8}>
//                   <AddProjectMap height="800px" onChange={(value) => setMapPath(value)} />
//                 </Grid>
//               </Grid>
//             </div>

//           </>
//         </Box>
//       </Box>
//     </>
//   );
// }