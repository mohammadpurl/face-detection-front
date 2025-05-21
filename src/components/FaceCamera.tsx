
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
}

const FaceCamera: React.FC<FaceCameraProps> = ({ onCapture }) => {
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
    initCamera();
    
    // Cleanup on unmount
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const initCamera = async () => {
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

  // Capture photo from video stream
  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current || !user) return;
    
    setIsCapturing(true);
    
    try {
      // Draw current video frame to canvas
      const imageData = drawVideoToCanvas(videoRef.current, canvasRef.current);
      if (!imageData) throw new Error("Could not process image data");
      
      // Perform quality checks
      const [blurResult, frontalResult] = await Promise.all([
        detectBlur(imageData),
        isFaceFrontal(imageData),
      ]);
      
      const imageBase64 = canvasRef.current.toDataURL("image/jpeg");
      
      setCaptureResult({
        image: imageBase64,
        isBlurry: blurResult.isBlurry,
        isFrontal: frontalResult.isFrontal,
        blurScore: blurResult.blurScore,
        frontalConfidence: frontalResult.confidence,
      });
      
      // Check if image passes quality requirements
      const passesQualityCheck = !blurResult.isBlurry && frontalResult.isFrontal;
      
      if (passesQualityCheck) {
        // Convert canvas to file and store the image
        const imageFile = await canvasToFile(canvasRef.current);
        const result = await storeImage(user.id, imageFile);
        
        toast({
          title: "Photo captured",
          description: "Your photo has been saved successfully.",
        });
        
        if (onCapture) {
          onCapture(result);
        }
      } else {
        // Show quality issues
        toast({
          variant: "destructive",
          title: "Photo quality issues",
          description: blurResult.isBlurry 
            ? "The image is too blurry. Please try again." 
            : "Please face the camera directly.",
        });
      }
    } catch (error) {
      console.error("Error capturing photo:", error);
      toast({
        variant: "destructive",
        title: "Capture failed",
        description: "Could not process the photo. Please try again.",
      });
    } finally {
      setIsCapturing(false);
    }
  };

  // Reset capture state to try again
  const resetCapture = () => {
    setCaptureResult({
      image: null,
      isBlurry: false,
      isFrontal: true,
      blurScore: 0,
      frontalConfidence: 0,
    });
  };

  const isLowQuality = captureResult.isBlurry || !captureResult.isFrontal;

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="camera-container aspect-video">
        {/* Video element for camera feed */}
        <CameraView 
          stream={stream} 
          isCameraReady={isCameraReady} 
          show={!captureResult.image} 
        />
        
        {/* Canvas for capturing and displaying the photo */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
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
