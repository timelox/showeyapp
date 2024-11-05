"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
import '@uploadcare/react-uploader/core.css';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { Camera, Upload, Image as ImageIcon } from 'lucide-react';

export function MediaUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleUploadComplete = async (info: any) => {
    try {
      setUploading(true);
      // Simulate progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const url = info.cdnUrl;
      
      // Update progress to 100% when complete
      setProgress(100);
      clearInterval(interval);

      toast({
        title: "Upload Successful",
        description: "Your media has been uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your media",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Upload Media</h2>
        <p className="text-sm text-muted-foreground">
          Choose a file to upload or capture from your camera
        </p>
      </div>

      <div className="grid gap-4">
        <FileUploaderRegular
          sourceList="local, url, camera, dropbox"
          classNameUploader="uc-light"
          pubkey="c68ff4d76d2edd68e1e2"
          onUploadComplete={handleUploadComplete}
        />

        {uploading && (
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-center text-muted-foreground">
              Uploading... {progress}%
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <Button variant="outline" className="h-24">
          <div className="flex flex-col items-center">
            <Camera className="h-6 w-6 mb-2" />
            <span>Capture</span>
          </div>
        </Button>
        <Button variant="outline" className="h-24">
          <div className="flex flex-col items-center">
            <ImageIcon className="h-6 w-6 mb-2" />
            <span>Gallery</span>
          </div>
        </Button>
      </div>
    </Card>
  );
}