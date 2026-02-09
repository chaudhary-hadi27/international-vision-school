import * as tf from '@tensorflow/tfjs';
import * as blazeface from '@tensorflow-models/blazeface';

let model: blazeface.BlazeFaceModel | null = null;

export async function detectFace(file: File): Promise<boolean> {
    if (!file.type.startsWith('image/')) return true; // Skip for non-images

    try {
        if (!model) {
            await tf.ready();
            model = await blazeface.load();
        }

        const img = await fileToImage(file);
        const predictions = await model.estimateFaces(img, false);

        // Cleanup image from memory
        URL.revokeObjectURL(img.src);

        return predictions.length > 0;
    } catch (error) {
        console.error('Face detection error:', error);
        return true; // Default to true if detection fails to avoid blocking users
    }
}

function fileToImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
    });
}
