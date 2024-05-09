import * as Yup from "yup";

export const otpSchema = Yup.object({
  otp: Yup
    .string()
    .length(6, "OTP must be 6 characters")
    .required("OTP is required"),
});
