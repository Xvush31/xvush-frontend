
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, Search, Plus, Video, User, LogIn } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/contexts/AuthContext";
import { AnimatePresence, motion } from "framer-motion";

interface NavigationFooterProps {
  performerId: number | string;
  performerImage: string;
  performerName: string;
}

const NavigationFooter: React.FC<NavigationFooterProps> = ({ 
  performerId,
  performerImage,
  performerName
}) => {
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  const location = useLocation();
  const isDark = theme === 'dark';
  const secondaryBgClass = theme === 'light' ? 'bg-white' : 'bg-[#1a1b31]';
  const borderClass = theme === 'light' ? 'border-gray-200' : 'border-[#2a2b4a]';
  
  // Helper function to check if a path is active
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  // Get the appropriate icon/component based on auth status
  const ProfileIcon = () => {
    if (currentUser) {
      return (
        <Link to={`/creaverse-app/performer/${performerId}`} className={isActive(`/creaverse-app/performer/${performerId}`) ? "text-rose-500" : "text-primary"}>
          <div className="relative">
            <Avatar className={`w-6 h-6 border transition-all ${isActive(`/creaverse-app/performer/${performerId}`) ? "border-rose-500 scale-110" : "border-primary"}`}>
              <AvatarImage src={performerImage} />
              <AvatarFallback className={`bg-pink-500 text-white text-xs ${isActive(`/creaverse-app/performer/${performerId}`) ? "scale-110" : ""}`}>
                {(performerName || "").substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </Link>
      );
    } else {
      return (
        <Link to="/login" className={isActive("/login") ? "text-rose-500" : "text-primary"}>
          <LogIn size={24} />
        </Link>
      );
    }
  };

  // In dark mode, use the pink from the image
  const activeColor = isDark ? "#ff3b8b" : "rose-500";

  return (
    <motion.nav 
      className={`fixed bottom-0 left-0 right-0 w-full flex justify-around py-3 ${secondaryBgClass} border-t ${borderClass} z-40`}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
    >
      <Link to="/" className={isActive("/") ? (isDark ? "text-[#ff3b8b]" : "text-rose-500") : "text-primary"}>
        <motion.div whileTap={{ scale: 0.9 }} transition={{ duration: 0.1 }}>
          <Home size={24} />
        </motion.div>
      </Link>
      
      <Link to="/search" className={isActive("/search") ? (isDark ? "text-[#ff3b8b]" : "text-rose-500") : "text-primary"}>
        <motion.div whileTap={{ scale: 0.9 }} transition={{ duration: 0.1 }}>
          <Search size={24} />
        </motion.div>
      </Link>
      
      {currentUser ? (
        <Link to="/upload" className="text-primary">
          <motion.div 
            whileTap={{ scale: 0.9 }} 
            transition={{ duration: 0.1 }}
            className={isDark ? "bg-gradient-to-r from-[#ff3b8b] to-[#ff71a6] rounded-lg p-1" : "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-lg p-1"}
          >
            <Plus size={24} className="text-white" />
          </motion.div>
        </Link>
      ) : (
        <Link to="/creators" className={isActive("/creators") ? (isDark ? "text-[#ff3b8b]" : "text-rose-500") : "text-primary"}>
          <motion.div whileTap={{ scale: 0.9 }} transition={{ duration: 0.1 }}>
            <User size={24} />
          </motion.div>
        </Link>
      )}
      
      <Link to="/xtease" className={isActive("/xtease") ? (isDark ? "text-[#ff3b8b]" : "text-rose-500") : "text-primary"}>
        <motion.div whileTap={{ scale: 0.9 }} transition={{ duration: 0.1 }}>
          <Video size={24} />
        </motion.div>
      </Link>
      
      <motion.div whileTap={{ scale: 0.9 }} transition={{ duration: 0.1 }}>
        <ProfileIcon />
      </motion.div>
    </motion.nav>
  );
};

export default NavigationFooter;
