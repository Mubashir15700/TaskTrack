import * as yup from "yup";

const bannerSchema = yup.object().shape({
    title: yup.string().trim().required("Title is required"),
    description: yup.string().trim().required("Description is required"),
    image: yup
        .mixed()
        .test("is-image", "Image must be in image format", function (value) {
            if (!value) {
                // If no image is provided, return error if it's required
                if (this.options.context.isEdit) {
                    // Image is not required during editing, so pass validation
                    return true;
                } else {
                    // Image is required when adding a banner
                    return this.createError({ message: "Image is required" });
                }
            }
            
            const supportedFormats = ["image/jpeg", "image/png", "image/gif"];
            return supportedFormats.includes(value.type);
        }),
});

export default bannerSchema;
