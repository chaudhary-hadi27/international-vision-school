import imageCompression from 'browser-image-compression';

export async function compressImage(file: File) {
    const options = {
        maxSizeMB: 0.2, // Max size is 200KB per user request
        maxWidthOrHeight: 1280, // Slightly smaller for better weight
        useWebWorker: true,
        fileType: 'image/webp', // Convert to webp for better compression
    };

    try {
        const compressedFile = await imageCompression(file, options);
        return compressedFile;
    } catch (error) {
        console.error('Image compression error:', error);
        return file; // Return original file if compression fails
    }
}
