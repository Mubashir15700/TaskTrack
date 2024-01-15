import * as Yup from "yup";

const planSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  type: Yup.string().required("Type is required"),
  number: Yup.number().required("Number is required").positive("Number must be a positive integer"),
  amount: Yup.number().required("Amount is required").positive("Amount must be a positive number"),
});

export default planSchema;
