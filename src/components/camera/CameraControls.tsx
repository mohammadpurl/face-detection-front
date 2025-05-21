
import React from "react";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

interface CameraControlsProps {
  hasImage: boolean;
  isCameraReady: boolean;
  isCapturing: boolean;
  isLowQuality: boolean;
  onCapture: () => void;
  onReset: () => void;
}

const CameraControls: React.FC<CameraControlsProps> = ({
  hasImage,
  isCameraReady,
  isCapturing,
  isLowQuality,
  onCapture,
  onReset
}) => {
  return (
    <div className="mt-4 flex gap-4 justify-center">
      {!hasImage ? (
        <Button 
          onClick={onCapture} 
          disabled={!isCameraReady || isCapturing}
          className="rounded-full bg-indigo-600 hover:bg-indigo-700 h-14 w-14 p-0"
        >
          {isCapturing ? (
            <div className="animate-spin h-6 w-6 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <Camera className="h-6 w-6" />
          )}
        </Button>
      ) : (
        <div className="flex gap-4">
          <Button 
            onClick={onReset} 
            variant="outline"
            className="px-6"
          >
            Try Again
          </Button>
          
          <Button
            onClick={onCapture}
            disabled={isLowQuality}
            className="px-6 bg-indigo-600 hover:bg-indigo-700"
          >
            {isLowQuality
              ? "Low Quality"
              : "Use Photo"}
          </Button>
        </div>
      )}
      
      {!isCameraReady && (
        <div className="mt-4 text-center text-sm text-gray-500">
          Please allow camera access to use this feature
        </div>
      )}
    </div>
  );
};

export default CameraControls;
