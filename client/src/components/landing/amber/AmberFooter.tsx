import { Link } from "react-router-dom";

export function AmberFooter() {
  const footerLinks = [
    {
      title: "Company",
      links: [
        { name: "About Us", url: "/about" },
        { name: "Careers", url: "/careers" },
        { name: "How it works", url: "/how-it-works" },
        { name: "Contact", url: "/contact" }
      ]
    },
    {
      title: "Discover",
      links: [
        { name: "Roadmaps", url: "/roadmaps" },
        { name: "Interview Prep", url: "/interview-prep" },
        { name: "Projects", url: "/projects" },
        { name: "Newsletter", url: "/newsletter" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", url: "/help" },
        { name: "Terms & Conditions", url: "/terms" },
        { name: "Privacy Policy", url: "/privacy" }
      ]
    }
  ];

  return (
    <footer className="bg-[#FAFAFA] pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Logo Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-1 mb-6">
              <span className="text-[32px] font-extrabold tracking-tight lowercase text-[#333333] font-sans">
                nowscripts
              </span>
              <span className="w-2 h-2 rounded-full bg-[#FF5A5F] mt-2"></span>
            </Link>
            <p className="text-sm font-medium text-gray-500 mb-6 leading-relaxed pr-8">
              The ultimate platform to master ServiceNow, build real projects, and prepare for interviews.
            </p>
            <div className="flex flex-col gap-2">
              <div className="text-sm font-bold text-[#333333]">
                support@nowscripts.com
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((col, idx) => (
            <div key={idx}>
              <h4 className="font-bold text-[#333333] mb-6 text-[15px]">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-4">
                {col.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    {link.url.startsWith('http') ? (
                      <a 
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-gray-500 hover:text-[#FF5A5F] transition-colors"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link 
                        to={link.url} 
                        className="text-sm font-medium text-gray-500 hover:text-[#FF5A5F] transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-[13px] font-medium">
            Copyright &copy; {new Date().getFullYear()} NowScripts. All rights reserved.
          </p>
          <div className="flex gap-4">
            {/* Social icons placeholders */}
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"></div>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"></div>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
