// سرویس ارتباط با API های بک‌اند
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sub: string;
  username: string;
  [key: string]: any;
}

// آدرس پایه API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/';

// توابع کمکی برای ارسال درخواست
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('authToken');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };
  
  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `خطا در درخواست: ${response.status}`);
  }
  
  return response.json();
};

// سرویس‌های احراز هویت
export const authApi = {
  // ورود کاربر
  login: async (username: string, password: string) => {
    try {
      const data = await fetchWithAuth('auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
      
      if (data.access_token) {
        localStorage.setItem('authToken', data.access_token);
        // Decode token and extract user information
        const decodedToken = jwtDecode<DecodedToken>(data.access_token);
        const user = {
          id: decodedToken.sub,
          username: decodedToken.username
        };       
        return { ...data, user };
      }
      
      return data;
    } catch (error) {
      console.error('خطا در ورود:', error);
      throw error;
    }
  },
  
  // ثبت‌نام کاربر
  register: async (username: string, password: string) => {
    try {
      const data = await fetchWithAuth('auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });      
      if (data.tokens.access_token) {
        localStorage.setItem('authToken', data.tokens.access_token);
        // Decode token and extract user information
        const decodedToken = jwtDecode<DecodedToken>(data.tokens.access_token);
        const user = {
          id: decodedToken.sub,
          username: decodedToken.username
        };
        
        return { ...data, user };
      }
    } catch (error) {
      console.error('خطا در ثبت‌نام:', error);
      throw error;
    }
  },
  
  // دریافت اطلاعات کاربر جاری
  getCurrentUser: async () => {
    try {
      return await fetchWithAuth('auth/me');
    } catch (error) {
      console.error('خطا در دریافت اطلاعات کاربر:', error);
      throw error;
    }
  },
};

// سرویس‌های مدیریت تصاویر
export const imageApi = {
  // ذخیره تصویر جدید
  saveImage: async (imageFile: File, userId: string) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('userId', userId);
      
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`${API_BASE_URL}/images/upload`, {
        method: 'POST',
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `خطا در آپلود تصویر: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('خطا در ذخیره تصویر:', error);
      throw error;
    }
  },
  
  // دریافت تصاویر کاربر
  getUserImages: async (userId: string) => {
    try {
      return await fetchWithAuth(`/images/user/${userId}`);
    } catch (error) {
      console.error('خطا در دریافت تصاویر کاربر:', error);
      throw error;
    }
  },
};
