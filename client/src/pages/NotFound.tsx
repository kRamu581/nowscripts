import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-slate-900 p-4">
      <h1 className="text-9xl font-extrabold text-now-primary mb-4 tracking-tighter">404</h1>
      <h2 className="text-3xl font-bold mb-6 text-center">Page Not Found</h2>
      <p className="text-gray-600 mb-8 max-w-md text-center">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link 
        to="/" 
        className="flex items-center gap-2 px-8 py-3 bg-now-primary text-black font-bold rounded-full hover:bg-now-accent transition-colors shadow-lg hover:shadow-now-primary/20"
      >
        <Home className="w-5 h-5" />
        Back to Home
      </Link>
    </div>
  );
}
