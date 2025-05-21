
import React, { useRef, useEffect } from "react";

interface CameraViewProps {
  stream: MediaStream | null;
  isCameraReady: boolean;
  show: boolean;
}

const CameraView: React.FC<CameraViewProps> = ({ stream, isCameraReady, show }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Connect stream to video element
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  if (!show) return null;
  
  return (
    <>
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        playsInline
        muted
      />
      
      {/* Face guide overlay */}
      {isCameraReady && (
        <div className="camera-overlay">
          <div className="face-guide">
            <div className="pulse-ring w-64 h-64"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default CameraView;
