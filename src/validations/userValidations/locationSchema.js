import * as Yup from "yup";

export const locationSchema = Yup.object().shape({
  road: Yup.string().trim().required("Road is required"),
  village: Yup.string().trim().required("Village is required"),
  district: Yup.string().trim().required("District is required"),
  state: Yup.string().trim().required("State is required"),
  postcode: Yup.number().required("Pincode is required").positive("Pincode must be a positive number"),
});
