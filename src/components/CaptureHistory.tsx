
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getUserImages } from "@/utils/faceDetection";
import { useAuth } from "@/contexts/AuthContext";
import { imageApi } from "@/services/apiService";

const CaptureHistory: React.FC = () => {
  const { user } = useAuth();
  const [images, setImages] = useState<Array<{ id: string; imageData: string; timestamp: string }>>([]);
  const [loading, setLoading] = useState(true);
  
  // دریافت تصاویر از API
  useEffect(() => {
    const fetchImages = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        // فعلاً از تابع محلی استفاده می‌کنیم تا در آینده به API متصل شود
        const userImages = getUserImages(user.id);
        setImages(userImages);
      } catch (error) {
        console.error("خطا در بارگیری تصاویر:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchImages();
  }, [user]);
  
  // مرتب‌سازی تصاویر بر اساس زمان (جدیدترین ابتدا)
  const sortedImages = [...images].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-government-primary"></div>
        <span className="mr-3 text-government-primary">در حال بارگذاری تصاویر...</span>
      </div>
    );
  }

  if (sortedImages.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        <p>هنوز تصویری ثبت نشده است. از دوربین برای ثبت اولین تصویر استفاده کنید.</p>
      </div>
    );
  }

  // تبدیل تاریخ به فرمت فارسی (بدون وابستگی به locale)
  const formatPersianDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    // فرمت فارسی تاریخ: yyyy/MM/dd - HH:mm
    return `${year}/${month}/${day} - ${hours}:${minutes}`;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium">تصاویر اخیر</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedImages.map((image) => (
          <Card key={image.id} className="overflow-hidden border-government-primary/10 hover:border-government-primary/30 transition-colors">
            <div className="aspect-video bg-muted">
              <img
                src={image.imageData}
                alt={`تصویر ثبت شده در ${image.timestamp}`}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                ثبت شده در {formatPersianDate(new Date(image.timestamp))}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CaptureHistory;
