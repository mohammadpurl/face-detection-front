import React, { useRef, useEffect } from "react";

interface CameraViewProps {
  stream: MediaStream | null;
  isCameraReady: boolean;
  show: boolean;
  videoRef?: React.RefObject<HTMLVideoElement>;
}

const CameraView: React.FC<CameraViewProps> = ({ stream, isCameraReady, show, videoRef }) => {
  const internalVideoRef = useRef<HTMLVideoElement>(null);
  const actualVideoRef = videoRef || internalVideoRef;
  
  // Connect stream to video element
  useEffect(() => {
    if (actualVideoRef.current && stream) {
      actualVideoRef.current.srcObject = stream;
    }
  }, [stream, actualVideoRef]);

  if (!show) return null;
  
  return (
    <>
      <video
        ref={actualVideoRef}
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