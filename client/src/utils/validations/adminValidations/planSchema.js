import * as Yup from "yup";

const planSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup
    .string()
    .required("Description is required")
    .max(100, "Description must be at most 100 characters"),
  type: Yup.string().required("Type is required"),
  numberOfJobPosts: Yup
    .number()
    .required("Number of job posts is required")
    .positive("Number of job posts must be a positive number"),
  amount: Yup
    .number()
    .required("Amount is required")
    .positive("Amount must be a positive number"),
});

export default planSchema;
