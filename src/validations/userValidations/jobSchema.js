import * as Yup from "yup";

export const jobSchema = Yup.object().shape({
    title: Yup.string().trim().required("Title is required"),
    description: Yup.string().trim().required("Description is required"),
    date: Yup.date().required("Date is required"),
    time: Yup.string().required("Time is required"),
    duration: Yup.number().positive("Duration must be a positive number").required("Duration is required"),
    location: Yup.object().test('notEmpty', 'Location is required', (obj) => {
        return obj && Object.keys(obj).length > 0;
    }),
    fields: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().trim().required("Field name is required"),
            workers: Yup.number().positive("Number of workers must be a positive number").required("Number of workers is required"),
            materialsRequired: Yup.string(),
            wagePerHour: Yup.number().positive("Wage per hour must be a positive number").required("Wage per hour is required"),
        })
    )
});