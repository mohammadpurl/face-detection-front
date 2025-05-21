
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* بخش اصلی */}
      <div className="relative overflow-hidden">
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
              <div className="hidden md:flex md:space-x-10 md:space-x-reverse">
                {/* <a href="#features" className="font-medium text-gray-500 hover:text-gray-900">
                  ویژگی‌ها
                </a> */}
                <a href="#how-it-works" className="font-medium text-gray-500 hover:text-gray-900">
                  نحوه کارکرد
                </a>
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
                ثبت تصاویر چهره با کیفیت بالا همراه با بررسی خودکار کیفیت.
                سیستم ما با اطمینان از وضوح و موقعیت مناسب چهره، هویت شما را تأیید می‌کند.
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

      

      {/* بخش نحوه کارکرد */}
      <div id="how-it-works" className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-government-primary font-semibold tracking-wide uppercase">نحوه کارکرد</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              ساده، سریع و قابل اعتماد
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              فرآیند ثبت چهره ما برای سهولت استفاده و در عین حال حفظ استانداردهای بالا طراحی شده است.
            </p>
          </div>

          <div className="mt-10">
            <ol className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              <li className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-government-primary text-white">۱</div>
                <p className="mr-16 text-lg leading-6 font-medium text-gray-900">ایجاد حساب کاربری</p>
                <p className="mt-2 mr-16 text-base text-gray-500">
                  با یک نام کاربری و رمز عبور امن ثبت‌نام کنید و شروع کنید.
                </p>
              </li>
              
              <li className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-government-primary text-white">۲</div>
                <p className="mr-16 text-lg leading-6 font-medium text-gray-900">دسترسی به پنل کاربری</p>
                <p className="mt-2 mr-16 text-base text-gray-500">
                  به بخش دوربین بروید تا ثبت تصاویر چهره را شروع کنید.
                </p>
              </li>
              
              <li className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-government-primary text-white">۳</div>
                <p className="mr-16 text-lg leading-6 font-medium text-gray-900">ثبت و تأیید</p>
                <p className="mt-2 mr-16 text-base text-gray-500">
                  عکس خود را بگیرید، سیستم ما اطمینان حاصل می‌کند که الزامات کیفی را برآورده می‌کند.
                </p>
              </li>
            </ol>
          </div>
          
          <div className="mt-16 flex justify-center">
            {!user && (
              <Button size="lg" className="bg-government-primary hover:bg-government-dark" asChild>
                <Link to="/register">همین حالا شروع کنید</Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* فوتر */}
      <footer className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 space-x-reverse md:order-2">
              <p className="text-sm text-gray-400">سیاست حریم خصوصی</p>
              <p className="text-sm text-gray-400">شرایط استفاده از خدمات</p>
              <p className="text-sm text-gray-400">تماس با ما</p>
            </div>
            <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
              &copy; ۱۴۰۴ سامانه احراز هویت تصویری. تمامی حقوق محفوظ است.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
