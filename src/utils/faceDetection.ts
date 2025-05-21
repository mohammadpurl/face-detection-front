
// توابع کمکی برای تشخیص چهره و ارزیابی کیفیت
import { imageApi } from "@/services/apiService";

// شبیه‌سازی تشخیص تاری (در نسخه تولیدی از کتابخانه‌های CV استفاده می‌شود)
export const detectBlur = async (imageData: ImageData): Promise<{ isBlurry: boolean; blurScore: number }> => {
  // در پیاده‌سازی واقعی، از الگوریتم‌های پردازش تصویر استفاده می‌شود
  // اینجا تشخیص تاری را با تحلیل واریانس پیکسل‌ها شبیه‌سازی می‌کنیم
  
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
  
  return { isBlurry, blurScore };
};

// تابع بررسی روبرو بودن چهره
export const isFaceFrontal = async (imageData: ImageData): Promise<{ isFrontal: boolean; confidence: number }> => {
  // در پیاده‌سازی واقعی، از مدل‌های تشخیص چهره استفاده می‌شود
  // برای تشخیص جهت چهره و نشانه‌های صورت
  
  // برای این نمونه، یک عدد تصادفی ایجاد می‌کنیم
  // که معمولاً بالاست (نشان‌دهنده چهره روبرو)
  const confidence = Math.random() * 30 + 70; // بین 70 تا 100
  const isFrontal = confidence > 85;
  
  return { isFrontal, confidence };
};

// تبدیل تصویر کانواس به شیء فایل
export const canvasToFile = async (canvas: HTMLCanvasElement): Promise<File> => {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("تبدیل کانواس به Blob با خطا مواجه شد"));
        return;
      }
      
      const file = new File([blob], `face_${Date.now()}.jpg`, {
        type: "image/jpeg",
        lastModified: Date.now(),
      });
      
      resolve(file);
    }, "image/jpeg", 0.9);
  });
};

// ذخیره تصویر چهره با استفاده از API
export const storeImage = async (
  userId: string, 
  imageFile: File
): Promise<{ success: boolean; imageUrl: string; timestamp: string }> => {
  try {
    // ارسال تصویر به API
    const result = await imageApi.saveImage(imageFile, userId);
    
    return {
      success: true,
      imageUrl: result.imageUrl,
      timestamp: result.timestamp,
    };
  } catch (error) {
    console.error("خطا در ذخیره تصویر:", error);
    throw error;
  }
};

// دریافت تمام تصاویر کاربر از API
export const getUserImages = (userId: string): Array<{ id: string; imageData: string; timestamp: string }> => {
  // برای اینکه از خطا جلوگیری شود و تا زمانی که API واقعی آماده شود
  // از داده‌های ذخیره شده در localStorage استفاده می‌کنیم
  try {
    // در حالت واقعی اینجا یک فراخوانی async به API خواهیم داشت
    // مانند: const images = await imageApi.getUserImages(userId);
    
    // اما فعلاً از localStorage استفاده می‌کنیم تا کد بدون خطا اجرا شود
    return JSON.parse(localStorage.getItem(`user_images_${userId}`) || "[]");
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
