const { getPresignedUrl } = require("../middlewares/imageUploadMiddlewares/s3UploadMiddleware");

const getBannerWithPresignedUrl = async (key) => {
    // Get the presigned URL for the image
    return await getPresignedUrl(key);
};

const getBannersWithPresignedUrls = async (banners) => {
    // Map over the banners array and get presigned URL for each image
    const bannersWithPresignedUrls = await Promise.all(banners.map(async banner => {
        // Get the presigned URL for the image
        const imageUrl = await getBannerWithPresignedUrl(banner.key);
        // Return a new object with the image URL and other properties from the banner
        return { ...banner._doc, image: imageUrl };
    }));
    
    return bannersWithPresignedUrls;
};

module.exports = { getBannerWithPresignedUrl, getBannersWithPresignedUrls };
