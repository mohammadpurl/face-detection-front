
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FaceCamera from "@/components/FaceCamera";
import CaptureHistory from "@/components/CaptureHistory";
import { LogOut, User, Camera } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("camera");
  const { toast } = useToast();

  const handleCapture = (result: { success: boolean; imageUrl: string; timestamp: string }) => {
    if (result.success) {
      toast({
        title: "ثبت موفقیت‌آمیز",
        description: "تصویر چهره شما ذخیره شد",
      });
      // تغییر به تب تاریخچه برای دیدن ثبت جدید
      setActiveTab("history");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-government-primary">سامانه احراز هویت تصویری</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-medium">{user?.username}</span>
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <User className="h-4 w-4 text-government-primary" />
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={logout}
              className="text-gray-500 hover:text-gray-700"
              title="خروج"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="px-6 pt-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="camera" className="flex gap-2">
                  <Camera className="h-4 w-4" />
                  <span>دوربین</span>
                </TabsTrigger>
                <TabsTrigger value="history" className="flex gap-2">
                  <span>تاریخچه ثبت</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="camera" className="p-6">
              <div className="max-w-lg mx-auto">
                <h2 className="text-lg font-medium mb-6">ثبت چهره</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  لطفاً چهره خود را درون راهنما قرار داده و از نور کافی اطمینان حاصل کنید.
                  سیستم به صورت خودکار کیفیت تصویر را بررسی می‌کند.
                </p>
                <FaceCamera onCapture={handleCapture} active={activeTab === "camera"} />
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="p-6">
              <CaptureHistory />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
