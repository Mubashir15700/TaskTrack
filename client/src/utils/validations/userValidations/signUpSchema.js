import * as Yup from "yup";

export const signupSchema = Yup.object({
  username: Yup
    .string()
    .required("Username is required"),
  email: Yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup
    .string()
    .matches(/^\d{10}$/, "Invalid phone number")
    .required("Phone number is required"),
  password: Yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/,
      "Password must contain at least one lowercase letter, one uppercase letter, and one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup
    .string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});
