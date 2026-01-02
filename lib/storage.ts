
import { supabase } from './supabase';

/**
 * Uploads a file to Supabase Storage.
 * @param file The file to upload.
 * @param bucket The storage bucket name (default: 'content').
 * @param folder The folder path within the bucket (optional).
 * @returns The public URL of the uploaded file.
 */
export const uploadImage = async (file: File, bucket: string = 'content', folder: string = ''): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

    if (uploadError) {
        throw uploadError;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return data.publicUrl;
};
