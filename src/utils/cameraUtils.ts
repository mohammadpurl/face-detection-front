
export const startCameraStream = async (): Promise<MediaStream | null> => {
  try {
    const constraints = {
      video: {
        facingMode: "user", // Prefer front camera
        width: { ideal: 1280 },
        height: { ideal: 720 }
      },
      audio: false
    };
    
    return await navigator.mediaDevices.getUserMedia(constraints);
  } catch (error) {
    console.error("Error accessing camera:", error);
    return null;
  }
};

export const drawVideoToCanvas = (
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement
): ImageData | null => {
  try {
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame to canvas
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Get image data for quality checks
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  } catch (error) {
    console.error("Error drawing video to canvas:", error);
    return null;
  }
};
