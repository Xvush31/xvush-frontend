
import React, { Suspense, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Trending from "./pages/Trending";
import Recent from "./pages/Recent";
import Categories from "./pages/Categories";
import CategoryPage from "./pages/CategoryPage";
import Creators from "./pages/Creators";
import CreatorsPopular from "./pages/CreatorsPopular";
import CreatorsRecent from "./pages/CreatorsRecent";
import Community from "./pages/Community";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Performers from "./pages/Performers";
import SingleVideo from "./pages/SingleVideo";
import Upload from "./pages/Upload";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import Invite from "./pages/Invite";
import Favorites from "./pages/Favorites";
import History from "./pages/History";
import XTease from "./pages/XTease";
import SubscriptionConfirmation from "./pages/SubscriptionConfirmation";
import Subscription from "./pages/Subscription";
import AuthCallback from "./pages/AuthCallback";
import AccessDenied from "./pages/AccessDenied";
import SecurityDemo from "./pages/SecurityDemo";
import { useAuth } from "./contexts/AuthContext";
import PerformerProfile from "./pages/PerformerProfile";
import CreaVerseRedirect from "./components/CreaVerseRedirect";

// Simple layout component to wrap routes that handles auth loading state
const Layout = ({ children }: { children: React.ReactNode }) => {
  const { loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-foreground">Loading authentication...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
};

function App() {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Debug logging
  console.log("App rendering, auth state:", { currentUser, loading, path: location.pathname });
  
  // Track access to legacy URLs
  useEffect(() => {
    // Log when routes like /performers/:id are accessed
    if (location.pathname.includes('/performers/')) {
      console.log("Detected access to legacy performers route:", location.pathname);
    }
  }, [location.pathname]);
  
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <Routes>
        {/* Main XVush routes - not affected by XDose styles */}
        <Route path="/" element={<Layout><Index /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/trending" element={<Layout><Trending /></Layout>} />
        <Route path="/recent" element={<Layout><Recent /></Layout>} />
        <Route path="/categories" element={<Layout><Categories /></Layout>} />
        <Route path="/category/:categoryId" element={<Layout><CategoryPage /></Layout>} />
        <Route path="/creators" element={<Layout><Creators /></Layout>} />
        <Route path="/creators/popular" element={<Layout><CreatorsPopular /></Layout>} />
        <Route path="/creators/recent" element={<Layout><CreatorsRecent /></Layout>} />
        <Route path="/community" element={<Layout><Community /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/signup" element={<Layout><Signup /></Layout>} />
        <Route path="/performers" element={<Layout><Performers /></Layout>} />
        <Route path="/video/:videoId" element={<Layout><SingleVideo /></Layout>} />
        <Route path="/upload" element={<Layout><Upload /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
        <Route path="/terms" element={<Layout><Terms /></Layout>} />
        <Route path="/invite" element={<Layout><Invite /></Layout>} />
        <Route path="/favorites" element={<Layout><Favorites /></Layout>} />
        <Route path="/history" element={<Layout><History /></Layout>} />
        <Route path="/xtease" element={<Layout><XTease /></Layout>} />
        <Route path="/subscription" element={<Layout><Subscription /></Layout>} />
        <Route path="/subscription/confirmation" element={<Layout><SubscriptionConfirmation /></Layout>} />
        <Route path="/auth/callback" element={<Layout><AuthCallback /></Layout>} />
        <Route path="/access-denied" element={<Layout><AccessDenied /></Layout>} />
        <Route path="/security-demo" element={<Layout><SecurityDemo /></Layout>} />

        {/* Main XDose redirect routes */}
        <Route path="/creaverse" element={<CreaVerseRedirect />} />
        <Route path="/creaverse/*" element={<CreaVerseRedirect />} />
        <Route path="/creaverse-app/*" element={<CreaVerseRedirect pathPrefix="creaverse-app" />} />
        
        {/* Legacy performer routes - redirect to XDose */}
        <Route path="/performer/:performerId" element={<PerformerProfile />} />
        <Route path="/performers/:performerId" element={<PerformerProfile />} />

        {/* Legacy creator routes - redirect to XDose */}
        <Route path="/creator/:performerId/dashboard" element={<CreaVerseRedirect pathPrefix="creator" />} />
        <Route path="/creator/:performerId/settings" element={<CreaVerseRedirect pathPrefix="creator" />} />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
