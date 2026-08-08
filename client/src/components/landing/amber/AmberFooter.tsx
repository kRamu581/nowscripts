import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { BrandLogo } from "../../BrandLogo";

export function AmberFooter() {
  const footerLinks = [
    {
      title: "Company",
      links: [
        { name: "About Us", url: "/about" },
        { name: "Careers", url: "/careers" },
        { name: "Contact", url: "/contact" },
        { name: "Login", url: "/login" }
      ]
    },
    {
      title: "Discover",
      links: [
        { name: "Start Learning", url: "/learn" },
        { name: "Roadmaps", url: "/roadmaps" },
        { name: "Projects", url: "/projects" },
        { name: "Interview Prep", url: "/interview-prep" }
      ]
    },
    {
      title: "Community & Support",
      links: [
        { name: "Community", url: "/community" },
        { name: "Newsletter", url: "/newsletter" },
        { name: "Terms & Conditions", url: "/terms" },
        { name: "Privacy Policy", url: "/privacy" }
      ]
    }
  ];

  return (
    <footer className="bg-[#FAFAFA] pt-8 md:pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        
        {/* Mobile Top Section (Trust, Apps, Payments) */}
        <div className="flex flex-col items-center md:hidden mb-6 text-center">
          <Link to="/" className="flex items-center gap-1 mb-1">
            <BrandLogo textColor="text-[#333333]" hideTextOnMobile={false} />
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A5F] mt-1.5"></span>
          </Link>
          <p className="text-[12px] text-gray-500 mb-5">
            nowscripts &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
          
          <div className="flex flex-col items-center gap-1.5 mb-6">
            <span className="font-bold text-[15px] text-[#0B2538]">Trusted by Learners</span>
            <div className="flex gap-1 mt-0.5 mb-0.5">
               {[1, 2, 3, 4, 5].map((star) => (
                 <Star key={star} className="w-4 h-4 fill-[#FF5A5F] text-[#FF5A5F]" />
               ))}
            </div>
            <div className="text-[13px] text-[#0B2538] mt-0.5">
               <span className="font-bold">4.7/5</span>
               <span className="mx-1 text-gray-400">•</span>
               <span className="font-bold">100+</span> Reviews
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 w-full pt-2">
            <div className="flex flex-col items-center gap-2 border-r border-gray-200 pr-4">
              <span className="text-[12px] text-[#0B2538] font-medium">Get the app</span>
              <div className="flex gap-1.5">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Play Store" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-4" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 pl-1">
              <span className="text-[12px] text-[#0B2538] font-medium">Payment Options</span>
              <div className="flex gap-2 items-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg" alt="PhonePe" className="h-3 object-contain" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Pay_Logo_%282020%29.svg" alt="Google Pay" className="h-2.5 object-contain" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0 md:gap-12 mb-6 md:mb-16">
          
          {/* Logo Column (Desktop only) */}
          <div className="hidden md:block lg:col-span-2">
            <Link to="/" className="flex items-center gap-1 mb-6">
              <BrandLogo textColor="text-[#333333]" hideTextOnMobile={false} />
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
            <div key={idx} className="border-b md:border-b-0 border-gray-200 py-3 md:py-0">
              {/* Mobile Accordion details */}
              <details className="group md:hidden">
                <summary className="flex items-center justify-between font-bold text-[#0B2538] text-[14px] cursor-pointer list-none">
                  {col.title}
                  <svg className="w-4 h-4 transition-transform group-open:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </summary>
                <ul className="flex flex-col gap-2.5 mt-3 mb-1">
                  {col.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      {link.url.startsWith('http') ? (
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-[13px] text-gray-500 hover:text-[#FF5A5F] transition-colors">{link.name}</a>
                      ) : (
                        <Link to={link.url} className="text-[13px] text-gray-500 hover:text-[#FF5A5F] transition-colors">{link.name}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </details>

              {/* Desktop links */}
              <div className="hidden md:block">
                <h4 className="font-bold text-[#333333] mb-6 text-[15px]">
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-4">
                  {col.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      {link.url.startsWith('http') ? (
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-500 hover:text-[#FF5A5F] transition-colors">{link.name}</a>
                      ) : (
                        <Link to={link.url} className="text-sm font-medium text-gray-500 hover:text-[#FF5A5F] transition-colors">{link.name}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* Contact Us Accordion (Mobile Only) */}
          <div className="border-b md:border-b-0 border-gray-200 py-3 md:hidden">
             <details className="group">
                <summary className="flex items-center justify-between font-bold text-[#0B2538] text-[14px] cursor-pointer list-none">
                  Contact us
                  <svg className="w-4 h-4 transition-transform group-open:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </summary>
                <div className="mt-3 mb-1">
                  <a href="mailto:support@nowscripts.com" className="text-[13px] text-gray-500 hover:text-[#FF5A5F] transition-colors">support@nowscripts.com</a>
                </div>
             </details>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 md:border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="hidden md:block text-gray-600 text-[13px] font-medium">
            Copyright &copy; {new Date().getFullYear()} NowScripts. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#0A66C2] hover:text-white text-gray-600 transition-colors flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#FF0000] hover:text-white text-gray-600 transition-colors flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#5865F2] hover:text-white text-gray-600 transition-colors flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36" fill="currentColor" className="w-4 h-4">
                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.14c2.64-27.38-4.51-51.11-19.5-72.15ZM42.56,65.3c-5.36,0-9.8-4.83-9.8-10.79s4.38-10.79,9.8-10.79,9.85,4.83,9.8,10.79c0,5.96-4.45,10.79-9.8,10.79Zm42.08,0c-5.36,0-9.8-4.83-9.8-10.79s4.38-10.79,9.8-10.79,9.85,4.83,9.8,10.79c0,5.96-4.45,10.79-9.8,10.79Z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
