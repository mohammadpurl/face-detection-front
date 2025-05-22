
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { authApi } from "@/services/apiService";

interface User {
  id: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // بررسی وضعیت احراز هویت کاربر در هنگام بارگذاری
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const userData = await authApi.getCurrentUser();
          setUser({
            id: userData.id,
            username: userData.username,
          });
        } catch (error) {
          console.error("خطا در بررسی وضعیت احراز هویت:", error);
          localStorage.removeItem('authToken');
        }
      }
      setLoading(false);
    };
    
    checkAuthStatus();
  }, []);

  // تابع ورود با استفاده از API
  const login = async (username: string, password: string) => {
    setLoading(true);
    
    try {
      const data = await authApi.login(username, password);
      
      const loggedInUser = {
        id: data.user.id,
        username: data.user.username,
      };
      
      setUser(loggedInUser);
      localStorage.setItem("authToken", data.access_token);
      
      toast({
        title: "ورود موفقیت‌آمیز",
        description: `${username} عزیز، خوش آمدید.`,
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطا در ورود",
        description: error instanceof Error ? error.message : "نام کاربری یا رمز عبور اشتباه است",
      });
    } finally {
      setLoading(false);
    }
  };

  // تابع ثبت‌نام با استفاده از API
  const register = async (username: string, password: string) => {
    setLoading(true);
    
    try {
      const data = await authApi.register(username, password);
      const newUser = {
        id: data.user.id,
        username: data.user.username,
      };
      
      setUser(newUser);
      localStorage.setItem("authToken", data.access_token);
      
      toast({
        title: "ثبت‌نام موفقیت‌آمیز",
        description: "حساب کاربری شما با موفقیت ایجاد شد.",
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطا در ثبت‌نام",
        description: error instanceof Error ? error.message : "خطا در ایجاد حساب کاربری",
      });
    } finally {
      setLoading(false);
    }
  };

  // تابع خروج از حساب کاربری
  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    toast({
      title: "خروج موفق",
      description: "شما با موفقیت از حساب کاربری خود خارج شدید.",
    });
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth باید درون AuthProvider استفاده شود");
  }
  return context;
};
