import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export default cloudinary;

/**
 * Uploads an image to Cloudinary
 * @param fileUri - The path to the file or a base64 string
 * @param folder - Optional folder name to store the image in
 */
export async function uploadImage(fileUri: string, folder: string = 'ivs-website') {
    try {
        const result = await cloudinary.uploader.upload(fileUri, {
            folder: folder,
            resource_type: 'auto',
            quality: 'auto',
            fetch_format: 'auto',
        });
        return { success: true, url: result.secure_url, publicId: result.public_id };
    } catch (error) {
        console.error('Cloudinary Upload Error:', error);
        return { success: false, error: 'Failed to upload image' };
    }
}

/**
 * Deletes an image from Cloudinary
 * @param publicId - The public ID of the image
 */
export async function deleteImage(publicId: string) {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return { success: true, result };
    } catch (error) {
        console.error('Cloudinary Delete Error:', error);
        return { success: false, error: 'Failed to delete image' };
    }
}
