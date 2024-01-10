import * as yup from 'yup';

const bannerSchema = yup.object().shape({
    title: yup.string().trim().required('Title is required'),
    description: yup.string().trim().required('Description is required'),
    image: yup
        .mixed()
        .test('is-image', 'Image must be in image format', function (value) {
            if (!value) {
                return this.createError({ message: 'Image is required' });
            }

            const supportedFormats = ['image/jpeg', 'image/png', 'image/gif'];
            return supportedFormats.includes(value.type);
        })
        .required('Image is required'),
});

export default bannerSchema;
