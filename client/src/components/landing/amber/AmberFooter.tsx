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
    <footer className="bg-[#FAFAFA] pt-12 md:pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        
        {/* Mobile Top Section (Trust, Apps, Payments) */}
        <div className="flex flex-col items-center md:hidden mb-10 text-center">
          <Link to="/" className="flex items-center gap-1 mb-2">
            <BrandLogo textColor="text-[#333333]" hideTextOnMobile={false} />
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A5F] mt-1.5"></span>
          </Link>
          <p className="text-[13px] text-gray-500 mb-6 mt-1">
            nowscripts &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
          
          <div className="flex flex-col items-center gap-2 mb-8">
            <div className="flex items-center gap-2">
              {/* LinkedIn SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-7 h-7 text-[#0A66C2] fill-current"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              <span className="text-[24px] font-bold text-[#191919]">LinkedIn</span>
            </div>
            <div className="flex gap-1 mt-1">
              {[1,2,3,4,5].map(i => <div key={i} className="w-8 h-8 bg-[#FFB800] flex items-center justify-center rounded-[2px]"><Star className="w-5 h-5 text-white fill-white stroke-[1.5]"/></div>)}
            </div>
            <div className="text-[14px] text-gray-800 mt-2 flex flex-col items-center">
              <div><span className="text-gray-500">Course Score</span> <b>4.9/5</b></div>
              <div className="mt-0.5"><span className="underline cursor-pointer font-bold">2,145</span> reviews</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 w-full border-t border-gray-200 pt-6">
            <div className="flex flex-col items-center gap-3 border-r border-gray-200 pr-6">
              <span className="text-[14px] text-[#0B2538] font-medium">Get the app</span>
              <div className="flex gap-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Play Store" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-6" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-3 pl-2">
              <span className="text-[14px] text-[#0B2538] font-medium">Payment Options</span>
              <div className="flex gap-3">
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-4 object-contain" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="Mastercard" className="h-4 object-contain" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" alt="Amex" className="h-4 object-contain" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0 md:gap-12 mb-8 md:mb-16">
          
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
            <div key={idx} className="border-b md:border-b-0 border-gray-200 py-4 md:py-0">
              {/* Mobile Accordion details */}
              <details className="group md:hidden">
                <summary className="flex items-center justify-between font-bold text-[#0B2538] text-[15px] cursor-pointer list-none">
                  {col.title}
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </summary>
                <ul className="flex flex-col gap-3 mt-4 mb-2">
                  {col.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      {link.url.startsWith('http') ? (
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-[14px] text-gray-500 hover:text-[#FF5A5F] transition-colors">{link.name}</a>
                      ) : (
                        <Link to={link.url} className="text-[14px] text-gray-500 hover:text-[#FF5A5F] transition-colors">{link.name}</Link>
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
          <div className="border-b md:border-b-0 border-gray-200 py-4 md:hidden">
             <details className="group">
                <summary className="flex items-center justify-between font-bold text-[#0B2538] text-[15px] cursor-pointer list-none">
                  Contact us
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </summary>
                <div className="mt-4 mb-2">
                  <a href="mailto:support@nowscripts.com" className="text-[14px] text-gray-500 hover:text-[#FF5A5F] transition-colors">support@nowscripts.com</a>
                </div>
             </details>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 md:border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="hidden md:block text-gray-500 text-[13px] font-medium">
            Copyright &copy; {new Date().getFullYear()} NowScripts. All rights reserved.
          </p>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"></div>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"></div>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
