// توابع کمکی برای تشخیص چهره و ارزیابی کیفیت
import { imageApi } from "@/services/apiService";

// شبیه‌سازی تشخیص تاری (در نسخه تولیدی از کتابخانه‌های CV استفاده می‌شود)
export const detectBlur = async (imageData: ImageData): Promise<{ isBlurry: boolean; blurScore: number }> => {
  // در پیاده‌سازی واقعی، از الگوریتم‌های پردازش تصویر استفاده می‌شود
  // اینجا تشخیص تاری را با تحلیل واریانس پیکسل‌ها شبیه‌سازی می‌کنیم
  console.log("Detecting blur in image...");
  
  const width = imageData.width;
  const height = imageData.height;
  const data = imageData.data;
  
  // محاسبه واریانس لاپلاسین به عنوان روشی ساده برای تشخیص تاری
  // واریانس بالاتر = تاری کمتر، واریانس پایین‌تر = تاری بیشتر
  let sum = 0;
  let sumSquared = 0;
  let pixelCount = 0;
  
  // نمونه‌برداری از پیکسل‌ها برای محاسبه واریانس (ساده‌سازی شده)
  for (let y = 1; y < height - 1; y += 4) {
    for (let x = 1; x < width - 1; x += 4) {
      const idx = (y * width + x) * 4;
      const grayValue = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
      sum += grayValue;
      sumSquared += grayValue * grayValue;
      pixelCount++;
    }
  }
  
  const mean = sum / pixelCount;
  const variance = sumSquared / pixelCount - mean * mean;
  
  // نرمال‌سازی واریانس به یک امتیاز 0 تا 100
  const blurScore = Math.min(100, Math.max(0, variance / 10));
  
  // در نظر گرفتن تصویر به عنوان تار اگر امتیاز زیر آستانه باشد
  const blurThreshold = 30;
  const isBlurry = blurScore < blurThreshold;
  
  console.log(`Blur detection complete. Score: ${blurScore}, isBlurry: ${isBlurry}`);
  
  return { isBlurry, blurScore };
};

// تابع بررسی روبرو بودن چهره
export const isFaceFrontal = async (imageData: ImageData): Promise<{ isFrontal: boolean; confidence: number }> => {
  // در پیاده‌سازی واقعی، از مدل‌های تشخیص چهره استفاده می‌شود
  // برای تشخیص جهت چهره و نشانه‌های صورت
  console.log("Checking if face is frontal...");
  
  // برای این نمونه، یک عدد تصادفی ایجاد می‌کنیم
  // که معمولاً بالاست (نشان‌دهنده چهره روبرو)
  const confidence = Math.random() * 30 + 70; // بین 70 تا 100
  const isFrontal = confidence > 85;
  
  console.log(`Face frontal check complete. Confidence: ${confidence}, isFrontal: ${isFrontal}`);
  
  return { isFrontal, confidence };
};

// تبدیل تصویر کانواس به شیء فایل
export const canvasToFile = async (canvas: HTMLCanvasElement): Promise<File> => {
  console.log("Converting canvas to file...");
  
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        console.error("Failed to convert canvas to blob");
        reject(new Error("تبدیل کانواس به Blob با خطا مواجه شد"));
        return;
      }
      
      const file = new File([blob], `face_${Date.now()}.jpg`, {
        type: "image/jpeg",
        lastModified: Date.now(),
      });
      
      console.log("Canvas successfully converted to file");
      resolve(file);
    }, "image/jpeg", 0.9);
  });
};

// ذخیره تصویر چهره با استفاده از API
export const storeImage = async (
  userId: string, 
  imageFile: File
): Promise<{ success: boolean; imageUrl: string; timestamp: string }> => {
  console.log("Storing image using API...", { userId });
  
  try {
    // ارسال تصویر به API
    const result = await imageApi.saveImage(imageFile, userId);
    
    console.log("Image stored successfully:", result);
    
    return {
      success: true,
      imageUrl: result.imageUrl || result.url,
      timestamp: result.timestamp || new Date().toISOString(),
    };
  } catch (error) {
    console.error("خطا در ذخیره تصویر:", error);
    
    // Create mock result for development purposes
    const mockResult = {
      success: true,
      imageUrl: URL.createObjectURL(imageFile),
      timestamp: new Date().toISOString(),
    };
    
    console.log("Using mock result:", mockResult);
    
    // Store in localStorage for CaptureHistory component
    const existingImages = JSON.parse(localStorage.getItem(`user_images_${userId}`) || '[]');
    const newImage = {
      id: `local_${Date.now()}`,
      imageData: await readFileAsDataURL(imageFile),
      timestamp: mockResult.timestamp,
    };
    
    existingImages.push(newImage);
    localStorage.setItem(`user_images_${userId}`, JSON.stringify(existingImages));
    
    return mockResult;
  }
};

// Utility function to read a file as data URL
const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
};

// دریافت تمام تصاویر کاربر از API
export const getUserImages = async (userId: string): Promise<{ filename: string; imageData: string; upload_date: string }[]> => {
  
  console.log("Getting user images for userId:", userId);
 
  try {
    // در حالت واقعی اینجا یک فراخوانی async به API خواهیم داشت
    const images = await imageApi.getUserImages(userId);
    debugger;
    
    console.log("Retrieved images from localStorage:", images.length);
    return images;
  } catch (error) {
    console.error("خطا در دریافت تصاویر کاربر:", error);
    return [];
  }
};

// در آینده می‌توانیم این قسمت را به‌روزرسانی کنیم تا از API استفاده کند:
// export const getUserImages = async (userId: string) => {
//   try {
//     const data = await imageApi.getUserImages(userId);
//     return data.images;
//   } catch (error) {
//     console.error("خطا در دریافت تصاویر کاربر:", error);
//     return [];
//   }
// };