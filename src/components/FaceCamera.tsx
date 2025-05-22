import React, { useRef, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { detectBlur, isFaceFrontal, canvasToFile, storeImage } from "@/utils/faceDetection";
import { useAuth } from "@/contexts/AuthContext";
import { startCameraStream, drawVideoToCanvas } from "@/utils/cameraUtils";

// Sub-components
import CameraView from "./camera/CameraView";
import CapturedImage from "./camera/CapturedImage";
import QualityIndicators from "./camera/QualityIndicators";
import CameraControls from "./camera/CameraControls";

interface FaceCameraProps {
  onCapture?: (result: { success: boolean; imageUrl: string; timestamp: string }) => void;
  active?: boolean;
}

const FaceCamera: React.FC<FaceCameraProps> = ({ onCapture, active = true }) => {
  const { user } = useAuth();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [captureResult, setCaptureResult] = useState<{
    image: string | null;
    isBlurry: boolean;
    isFrontal: boolean;
    blurScore: number;
    frontalConfidence: number;
  }>({
    image: null,
    isBlurry: false,
    isFrontal: true,
    blurScore: 0,
    frontalConfidence: 0,
  });
  const { toast } = useToast();

  // Start camera on component mount
  useEffect(() => {
    if (active && !captureResult.image) {
      initCamera();
    } else if (!active || captureResult.image) {
      stopCamera();
    }
    
    // Cleanup on unmount
    return () => {
      stopCamera();
    };
  }, [active, captureResult.image]);

  const initCamera = async () => {
    console.log("Initializing camera...");
    // Stop any existing streams first
    stopCamera();
    
    const mediaStream = await startCameraStream();
    
    if (mediaStream) {
      setStream(mediaStream);
      setIsCameraReady(true);
      
      toast({
        title: "Camera ready",
        description: "Please center your face in the guide and take a photo",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Camera error",
        description: "Could not access your camera. Please check permissions.",
      });
    }
  };

  const stopCamera = () => {
    console.log("Stopping camera...");
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop();
        console.log(`Track ${track.kind} stopped`);
      });
      setStream(null);
      setIsCameraReady(false);
    }
  };

  // Capture photo from video stream
  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current || !user) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "کاربر یا دوربین آماده نیست.",
      });
      return;
    }
    
    setIsCapturing(true);
    
    try {
      console.log("Capturing photo...");
      
      // Draw current video frame to canvas
      const imageData = drawVideoToCanvas(videoRef.current, canvasRef.current);
      if (!imageData) {
        throw new Error("Could not process image data");
      }
      
      console.log("Image data captured, performing quality checks...");
      
      // Perform quality checks
      const [blurResult, frontalResult] = await Promise.all([
        detectBlur(imageData),
        isFaceFrontal(imageData),
      ]);
      
      console.log("Quality checks results:", { blurResult, frontalResult });
      
      const imageBase64 = canvasRef.current.toDataURL("image/jpeg");
      
      setCaptureResult({
        image: imageBase64,
        isBlurry: blurResult.isBlurry,
        isFrontal: frontalResult.isFrontal,
        blurScore: blurResult.blurScore,
        frontalConfidence: frontalResult.confidence,
      });
      
      // Stop the camera after capturing the image
      stopCamera();
      
      // Check if image passes quality requirements
      const passesQualityCheck = !blurResult.isBlurry && frontalResult.isFrontal;
      
      if (passesQualityCheck) {
        console.log("Image passes quality checks. Storing image...");
        try {
          // Convert canvas to file and store the image
          const imageFile = await canvasToFile(canvasRef.current);
          console.log("Image file created, uploading to backend...");
          const result = await storeImage(user.id, imageFile);
          
          console.log("Upload result:", result);
          
          toast({
            title: "عکس ذخیره شد",
            description: "تصویر چهره شما با موفقیت در سرور ذخیره شد.",
          });
          
          if (onCapture) {
            onCapture(result);
          }
        } catch (uploadError) {
          console.error("Error uploading image:", uploadError);
          toast({
            variant: "destructive",
            title: "خطا در آپلود",
            description: "ذخیره تصویر در سرور با خطا مواجه شد.",
          });
        }
      } else {
        // Show quality issues
        console.log("Image failed quality checks:", {
          isBlurry: blurResult.isBlurry,
          isFrontal: frontalResult.isFrontal
        });
        
        toast({
          variant: "destructive",
          title: "مشکل کیفیت تصویر",
          description: blurResult.isBlurry 
          ? "تصویر تار است. لطفا دوباره تلاش کنید." 
          : "لطفا مستقیم به دوربین نگاه کنید.",
        });
      }
    } catch (error) {
      console.error("Error capturing photo:", error);
      toast({
        variant: "destructive",
        title: "خطا در ثبت تصویر",
        description: "پردازش تصویر با مشکل مواجه شد. لطفا دوباره تلاش کنید.",
      });
    } finally {
      setIsCapturing(false);
    }
  };

  // Reset capture state to try again
  const resetCapture = () => {
    console.log("Resetting camera...");
    setCaptureResult({
      image: null,
      isBlurry: false,
      isFrontal: true,
      blurScore: 0,
      frontalConfidence: 0,
    });
    // Camera will be re-initialized via the useEffect when captureResult.image changes
  };

  const isLowQuality = captureResult.isBlurry || !captureResult.isFrontal;

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="camera-container aspect-video relative">
        {/* Video element for camera feed */}
        <CameraView 
          stream={stream} 
          isCameraReady={isCameraReady} 
          show={!captureResult.image}
          videoRef={videoRef}
        />
        
        {/* Canvas for capturing and displaying the photo */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover absolute inset-0"
          style={{ display: "none" }}
        />
        
        {/* Display captured image */}
        <CapturedImage 
          imageUrl={captureResult.image}
          isBlurry={captureResult.isBlurry}
          isFrontal={captureResult.isFrontal}
          show={!!captureResult.image}
        />
      </div>
      
      {/* Quality metrics */}
      <QualityIndicators 
        blurScore={captureResult.blurScore}
        frontalConfidence={captureResult.frontalConfidence}
        show={!!captureResult.image}
      />
      
      {/* Camera controls */}
      <CameraControls 
        hasImage={!!captureResult.image}
        isCameraReady={isCameraReady}
        isCapturing={isCapturing}
        isLowQuality={isLowQuality}
        onCapture={capturePhoto}
        onReset={resetCapture}
      />
    </div>
  );
};

export default FaceCamera;
