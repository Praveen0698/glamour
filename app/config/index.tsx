export const config = {
    // Server
    PORT: process.env.NEXT_PUBLIC_PORT,

    // Database
    MONGODB_URI: process.env.MONGODB_URI,

    // JWT
    JWT_SECRET: process.env.JWT_SECRET,

    // Cloudinary
    CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};
