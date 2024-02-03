import * as Yup from "yup";

export const passwordSchema = Yup.object({
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/,
            "Password must contain at least one lowercase letter, one uppercase letter, and one special character"
        )
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
});
