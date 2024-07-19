import * as Yup from "yup";

export const profileSchema = Yup.object().shape({
    username: Yup.string().trim().nullable().min(3, "Username must be at least 3 characters"),
    phone: Yup.string().trim().nullable().matches(/^\d{10}$/, "Phone number must be 10 digits"),
    email: Yup.string().trim().nullable().email("Invalid email address"),
    profile: Yup.mixed().test("isImageOrEmpty", "Invalid file format", (value) => {
        if (!value) {
            return true;
        }

        const supportedFormats = ["image/jpeg", "image/png", "image/gif"];
        return supportedFormats.includes(value.type);
    }),
});
