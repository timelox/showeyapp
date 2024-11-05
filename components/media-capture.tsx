"use client"

import { useState, useRef } from 'react'
import { Camera, Video, Upload, X } from 'lucide-react'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { useToast } from '@/hooks/use-toast'
import { useStore } from '@/lib/store'

export function MediaCapture() {
  const [mediaType, setMediaType] = useState<'photo' | 'video'>('photo')
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const { toast } = useToast()
  const addMedia = useStore((state) => state.addMedia)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: mediaType === 'video',
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
      }
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera",
        variant: "destructive",
      })
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }

  const captureMedia = () => {
    if (!videoRef.current) return

    if (mediaType === 'photo') {
      const canvas = document.createElement('canvas')
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0)
      setPreview(canvas.toDataURL('image/jpeg'))
      stopCamera()
    }
  }

  const handleUpload = async () => {
    if (!preview) return

    setUploading(true)
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 500)

    try {
      // Mock upload
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      addMedia({
        id: Date.now().toString(),
        url: preview,
        type: mediaType,
        userId: 'user-1',
        venueId: 'venue-1',
        status: 'pending'
      })

      toast({
        title: "Upload Successful",
        description: "Your media has been uploaded",
      })
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Please try again",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
      setUploadProgress(0)
      setPreview(null)
      clearInterval(interval)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-center">
        <Button
          variant={mediaType === 'photo' ? 'default' : 'outline'}
          onClick={() => setMediaType('photo')}
        >
          <Camera className="mr-2 h-4 w-4" />
          Photo
        </Button>
        <Button
          variant={mediaType === 'video' ? 'default' : 'outline'}
          onClick={() => setMediaType('video')}
        >
          <Video className="mr-2 h-4 w-4" />
          Video
        </Button>
      </div>

      <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
        {!preview ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <Button
              className="absolute bottom-4 left-1/2 -translate-x-1/2"
              onClick={startCamera}
            >
              Start Camera
            </Button>
          </>
        ) : (
          <>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => {
                setPreview(null)
                startCamera()
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {!preview && (
        <Button
          className="w-full"
          onClick={captureMedia}
          disabled={!streamRef.current}
        >
          Capture {mediaType === 'photo' ? 'Photo' : 'Video'}
        </Button>
      )}

      {preview && (
        <div className="space-y-4">
          {uploading && (
            <Progress value={uploadProgress} className="w-full" />
          )}
          <Button
            className="w-full"
            onClick={handleUpload}
            disabled={uploading}
          >
            <Upload className="mr-2 h-4 w-4" />
            {uploading ? 'Uploading...' : 'Upload'}
          </Button>
        </div>
      )}
    </div>
  )
}