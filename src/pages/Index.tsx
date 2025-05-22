import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Instagram, Mail, Phone, MessageCircle } from "lucide-react";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* بخش اصلی */}
      <div className="relative flex-grow overflow-hidden">
        <div className="absolute inset-y-0 h-full w-full" aria-hidden="true">
          <div className="relative h-full">
            <svg
              className="absolute left-full transform translate-y-1/3 -translate-x-1/4 md:translate-y-1/2 sm:-translate-x-1/2 lg:-translate-x-full"
              width="404"
              height="784"
              fill="none"
              viewBox="0 0 404 784"
            >
              <defs>
                <pattern
                  id="e229dbec-10e9-49ee-8ec3-0286ca089edf"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="404"
                height="784"
                fill="url(#e229dbec-10e9-49ee-8ec3-0286ca089edf)"
              />
            </svg>
            <svg
              className="absolute right-full transform -translate-y-3/4 translate-x-1/4 sm:translate-x-1/2 md:-translate-y-1/2 lg:translate-x-3/4"
              width="404"
              height="784"
              fill="none"
              viewBox="0 0 404 784"
            >
              <defs>
                <pattern
                  id="d2a68204-c383-44b1-b99f-42ccff4e5365"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="404"
                height="784"
                fill="url(#d2a68204-c383-44b1-b99f-42ccff4e5365)"
              />
            </svg>
          </div>
        </div>

        <div className="relative pt-6 pb-16 sm:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <nav className="relative flex items-center justify-between sm:h-10 md:justify-center" aria-label="Global">
              <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:right-0">
                <div className="flex items-center justify-between w-full md:w-auto">
                  <a href="#" className="text-2xl font-bold text-government-primary">
                    سامانه احراز هویت تصویری
                  </a>
                </div>
              </div>
              <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:left-0">
                <span className="inline-flex rounded-md shadow">
                  {user ? (
                    <Button asChild>
                      <Link to="/dashboard">ورود به پنل کاربری</Link>
                    </Button>
                  ) : (
                    <Button asChild>
                      <Link to="/login">ورود</Link>
                    </Button>
                  )}
                </span>
              </div>
            </nav>
          </div>

          <div className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">سامانه امن و قابل اعتماد</span>
                <span className="block text-government-primary">احراز هویت تصویری</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                این سامانه با هدف احراز هویت تصویری هوشمند و امن طراحی شده است و قرار است به عنوان بخشی از فرآیند ثبت‌نام یا احراز هویت برای خدمات داخلی دانشگاه اصفهان مورد استفاده قرار گیرد.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                {user ? (
                  <Button size="lg" className="bg-government-primary hover:bg-government-dark" asChild>
                    <Link to="/dashboard">ورود به پنل کاربری</Link>
                  </Button>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="bg-government-primary hover:bg-government-dark" asChild>
                      <Link to="/register">ثبت نام</Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <Link to="/login">ورود</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex flex-col" aria-hidden="true">
            <div className="flex-1" />
            <div className="flex-1 w-full bg-gray-50" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="relative rounded-lg shadow-lg overflow-hidden">
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-l from-government-primary to-government-secondary mix-blend-multiply" />
              </div>
              <div className="relative px-6 py-16 sm:py-24 lg:py-32 lg:px-8">
                <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                  <span className="block text-white">کنترل فرآیند احراز هویت خود را به دست بگیرید</span>
                </h2>
                <p className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-100 sm:max-w-3xl">
                  سیستم هوشمند تشخیص چهره ما با بررسی‌های داخلی برای تشخیص تاری و موقعیت مناسب چهره،
                  کیفیت بهینه تصویر را تضمین می‌کند.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* فوتر با اطلاعات تماس */}
      <footer className="bg-gray-800 text-white py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-600 pb-2">درباره ما</h3>
              <p className="text-gray-300">
                سامانه احراز هویت تصویری دانشگاه اصفهان، با هدف تسهیل و امنیت در فرایندهای شناسایی و احراز هویت دانشجویان و کارکنان طراحی شده است.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-600 pb-2">لینک‌های مفید</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://ui.ac.ir" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <span className="hover:underline">وب‌سایت دانشگاه</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <span className="hover:underline">راهنمای کاربری</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <span className="hover:underline">سؤالات متداول</span>
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-600 pb-2">تماس با ما</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-government-secondary" />
                  <span className="text-gray-300">۰۳۱-۳۷۹۳۴۵۶۷</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-government-secondary" />
                  <a href="mailto:contact@ui.ac.ir" className="text-gray-300 hover:text-white transition-colors duration-200">contact@ui.ac.ir</a>
                </li>
                <li className="mt-6">
                  <h4 className="text-md font-medium text-white mb-3">ما را در شبکه‌های اجتماعی دنبال کنید</h4>
                  <div className="flex space-x-5 space-x-reverse">
                    <a href="#" className="bg-gray-700 hover:bg-government-secondary p-3 rounded-full transition-colors duration-300">
                      <MessageCircle className="h-5 w-5" />
                    </a>
                    <a href="#" className="bg-gray-700 hover:bg-government-secondary p-3 rounded-full transition-colors duration-300">
                      <Instagram className="h-5 w-5" />
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-10 pt-8 border-t border-gray-700 flex flex-col md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-gray-400">
              &copy; ۱۴۰۴ سامانه احراز هویت تصویری دانشگاه اصفهان. تمامی حقوق محفوظ است.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6 space-x-reverse">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">سیاست حریم خصوصی</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">شرایط استفاده از خدمات</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;