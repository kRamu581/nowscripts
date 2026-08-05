import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Don't show breadcrumbs on home page
  if (pathnames.length === 0) return null;

  // Formatting for display
  const formatName = (name: string) => {
    return name
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6 px-4 md:px-0">
      <Link
        to="/"
        className="flex items-center hover:text-[#FF5A5F] transition-colors"
      >
        <Home className="w-4 h-4 mr-1" />
        Home
      </Link>
      
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <div key={name} className="flex items-center space-x-2">
            <ChevronRight className="w-4 h-4 text-gray-400" />
            {isLast ? (
              <span className="text-gray-900 font-medium" aria-current="page">
                {formatName(name)}
              </span>
            ) : (
              <Link
                to={routeTo}
                className="hover:text-[#FF5A5F] transition-colors"
              >
                {formatName(name)}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
