import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'showey',
  api_key: 'c68ff4d76d2edd68e1e2',
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'showey_uploads');

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/showey/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  const data = await response.json();
  return data.secure_url;
};