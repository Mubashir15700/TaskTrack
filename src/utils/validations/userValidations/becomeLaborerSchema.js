import * as Yup from "yup";

export const profileSchema = Yup.object().shape({
    username: Yup.string().trim().nullable().min(3, "Username must be at least 3 characters"),
    phone: Yup.string().trim().nullable().matches(/^\d{10}$/, "Phone number must be 10 digits"),
    email: Yup.string().trim().nullable().email("Invalid email address"),
    location: Yup.object().test("notEmpty", "Location is required", (obj) => {
        return obj && Object.keys(obj).length > 0;
    }),
});

export const workSchema = Yup.object().shape({
    languages: Yup.array()
        .of(Yup.string().required("At least one language should be selected"))
        .min(1, "At least one language should be selected")
        .required("Known languages are required"),
    education: Yup.array()
        .of(Yup.string().required("At least one education should be selected"))
        .min(1, "At least one education should be selected")
        .required("Education level is required"),
    avlDays: Yup.array()
        .of(Yup.string().required("At least one day should be selected"))
        .min(1, "At least one day should be selected")
        .required("Available days are required"),
    avlTimes: Yup.array()
        .of(Yup.string().required("At least one time should be selected"))
        .min(1, "At least one time should be selected")
        .required("Available times are required"),
    fields: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required("Field name is required"),
            worksDone: Yup.number().required("Number of works done is required").min(0, "Number of works done must be at least 0"),
            wagePerHour: Yup.number().required("Wage per hour is required").min(0, "Wage per hour must be at least 0"),
        })
    ).min(1, "At least one field of work is required"),
});

export const someOtherSchema = Yup.object().shape({

});
