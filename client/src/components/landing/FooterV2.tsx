import { Link } from "react-router-dom";
import { twitterIcon, linkedinIcon, facebookIcon } from "../../assets/icons";
import { MessageSquare, ArrowRight } from "lucide-react";
import { useAuth } from "../../contexts/Auth";
import { BrandLogo } from "../BrandLogo";

export function FooterV2() {
  const { user } = useAuth();
  const isAdmin = user?.role === "Admin";

  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-2 pr-8">
            <Link to="/" className="inline-block mb-6 transition-transform hover:scale-105 origin-left">
              <BrandLogo textColor="text-gray-900" hideTextOnMobile={false} />
            </Link>
            <p className="text-gray-600 mb-8 max-w-sm leading-relaxed font-medium">
              The ultimate ecosystem for ServiceNow professionals to learn, build, and accelerate their careers.
            </p>
            <div className="flex items-center gap-5 text-gray-400 mb-8">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-now-primary hover:border-now-primary/30 hover:bg-now-primary/5 transition-all">{twitterIcon}</a>
              <a href="https://www.linkedin.com/company/nowscripts" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-now-primary hover:border-now-primary/30 hover:bg-now-primary/5 transition-all">{linkedinIcon}</a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-now-primary hover:border-now-primary/30 hover:bg-now-primary/5 transition-all">{facebookIcon}</a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-now-primary hover:border-now-primary/30 hover:bg-now-primary/5 transition-all"><MessageSquare className="w-4 h-4" /></a>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
                All credentials issued by NowScripts can be verified via our secure portal.
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-6 text-sm tracking-wider uppercase">Platform</h4>
            <ul className="space-y-4 text-gray-600 text-sm font-medium">
              <li><Link to="/learn" className="hover:text-now-primary transition-colors flex items-center gap-2 group">Learn <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-now-primary" /></Link></li>
              <li><Link to="/roadmaps" className="hover:text-now-primary transition-colors flex items-center gap-2 group">Roadmaps <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-now-primary" /></Link></li>
              <li><Link to="/projects" className="hover:text-now-primary transition-colors flex items-center gap-2 group">Projects <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-now-primary" /></Link></li>
              <li><Link to="/certifications" className="hover:text-now-primary transition-colors flex items-center gap-2 group">Certifications <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-now-primary" /></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-6 text-sm tracking-wider uppercase">Community</h4>
            <ul className="space-y-4 text-gray-600 text-sm font-medium">
              <li><Link to="/interview-prep" className="hover:text-now-primary transition-colors flex items-center gap-2 group">Interview Prep <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-now-primary" /></Link></li>
              <li><Link to="/community" className="hover:text-now-primary transition-colors flex items-center gap-2 group">Forums <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-now-primary" /></Link></li>
              <li><a href="#" className="hover:text-now-primary transition-colors flex items-center gap-2 group">Blog <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-now-primary" /></a></li>
              <li><a href="#" className="hover:text-now-primary transition-colors flex items-center gap-2 group">Help Center <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-now-primary" /></a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6 text-sm tracking-wider uppercase">Credentials</h4>
            <ul className="space-y-4 text-gray-600 text-sm font-medium">
              {isAdmin && <li><Link to="/admin/certificates/studio" className="hover:text-now-primary transition-colors flex items-center gap-2 group">Issue Certificate <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-now-primary" /></Link></li>}
              <li><Link to="/verify" className="hover:text-now-primary transition-colors flex items-center gap-2 group">Verify Certificate <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-now-primary" /></Link></li>
              {isAdmin && <li><a href="mailto:verify@nowscripts.com" className="hover:text-now-primary transition-colors flex items-center gap-2 group">Contact Team <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-now-primary" /></a></li>}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6 text-sm tracking-wider uppercase">Legal</h4>
            <ul className="space-y-4 text-gray-600 text-sm font-medium">
              <li><Link to="/privacy-policy" className="hover:text-now-primary transition-colors flex items-center gap-2 group">Privacy Policy <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-now-primary" /></Link></li>
              <li><Link to="/terms" className="hover:text-now-primary transition-colors flex items-center gap-2 group">Terms of Service <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-now-primary" /></Link></li>
              <li><Link to="/about" className="hover:text-now-primary transition-colors flex items-center gap-2 group">About Us <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-now-primary" /></Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-medium text-gray-500">
            &copy; {new Date().getFullYear()} NowScripts. All rights reserved.
          </p>
          <p className="text-xs font-medium text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
            Designed with <span className="text-now-primary">♥</span> for ServiceNow Developers
          </p>
        </div>
      </div>
    </footer>
  );
}
