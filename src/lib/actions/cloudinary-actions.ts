'use server'

import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
})

/**
 * Server action to upload an image to Cloudinary
 * Use this from client components instead of directly importing cloudinary
 */
export async function uploadImageAction(
    base64Data: string,
    folder: string = 'ivs-website'
): Promise<{ success: boolean; url?: string; publicId?: string; error?: string }> {
    try {
        const result = await cloudinary.uploader.upload(base64Data, {
            folder: folder,
            resource_type: 'auto',
            quality: 'auto',
            fetch_format: 'auto',
        })
        return { success: true, url: result.secure_url, publicId: result.public_id }
    } catch (error) {
        console.error('Cloudinary Upload Error:', error)
        return { success: false, error: 'Failed to upload image' }
    }
}

/**
 * Server action to delete an image from Cloudinary
 */
export async function deleteImageAction(
    publicId: string
): Promise<{ success: boolean; error?: string }> {
    try {
        await cloudinary.uploader.destroy(publicId)
        return { success: true }
    } catch (error) {
        console.error('Cloudinary Delete Error:', error)
        return { success: false, error: 'Failed to delete image' }
    }
}
