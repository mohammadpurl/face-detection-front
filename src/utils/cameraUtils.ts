export const startCameraStream = async (): Promise<MediaStream | null> => {
  console.log("Starting camera stream...");
  
  try {
    // First, make sure no streams are already running
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      console.log(`Available video devices: ${videoDevices.length}`);
    } catch (e) {
      console.warn("Could not enumerate devices:", e);
    }
    const constraints = {
      video: {
        facingMode: "user", // Prefer front camera
        width: { ideal: 1280 },
        height: { ideal: 720 }
      },
      audio: false
    };
    
    console.log("Requesting camera access with constraints:", constraints);
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    console.log("Camera access granted successfully");
    return stream;
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
    console.log("Drawing video to canvas...");
    console.log(`Video dimensions: ${video.videoWidth}x${video.videoHeight}`);
    
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      console.error("Video dimensions are zero. Video might not be ready.");
      return null;
    }
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    console.log(`Canvas dimensions set to: ${canvas.width}x${canvas.height}`);
    
    // Draw video frame to canvas
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Could not get 2D context from canvas");
      return null;
    }
    
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    console.log("Video frame drawn to canvas successfully");
    
    // Get image data for quality checks
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log(`Image data extracted: ${imageData.width}x${imageData.height} pixels`);
    return imageData;
  } catch (error) {
    console.error("Error drawing video to canvas:", error);
    return null;
  }
};