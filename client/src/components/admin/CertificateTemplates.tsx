import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { HRSignature } from "../../assets/certificate-assets";

export interface CertificateData {
  candidateName: string;
  email: string;
  internshipTitle: string;
  startDate: string;
  endDate: string;
  issueDate: string;
  mentorName: string;
  department?: string;
  projectUndertaken?: string;
  rolesAndResponsibilities?: string;
  location?: string;
  certificateId: string;
  verificationNumber: string;
  templateType: string;
  companyName: string;
}

export const CertificateTemplate = React.forwardRef<HTMLDivElement, { data: CertificateData }>(({ data }, ref) => {
  // Format dates cleanly (e.g., "08, June, 2026")
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    try {
      const d = new Date(dateStr);
      const day = d.getDate().toString().padStart(2, '0');
      const month = d.toLocaleString('default', { month: 'long' });
      const year = d.getFullYear();
      return `${day}, ${month}, ${year}`;
    } catch {
      return dateStr;
    }
  };

  const formatShortDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    try {
      const d = new Date(dateStr);
      const day = d.getDate().toString().padStart(2, '0');
      const month = d.toLocaleString('default', { month: 'short' });
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    } catch {
      return dateStr;
    }
  };

  return (
    <div 
      ref={ref}
      className="bg-white relative mx-auto text-black font-sans flex flex-col"
      style={{ 
        width: "794px", 
        height: "1123px", 
        padding: "60px 80px", 
        boxSizing: "border-box",
        overflowWrap: "break-word",
        wordBreak: "break-word",
        whiteSpace: "normal",
        textRendering: "auto",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
      }}
    >
      {/* Header Block exactly like the reference */}
      <div className="flex justify-between items-start mb-[80px]">
        {/* Left Side: Logo and Company Link */}
        <div className="flex items-center gap-4">
          <div className="w-[50px] h-[50px] flex items-center justify-center">
             <img src="/icon-512.png" alt="NowScripts" className="w-full h-full object-contain rounded-xl" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[14px]">NowScripts</span>
            <span className="text-[12px] text-gray-600">www.nowscripts.in</span>
          </div>
        </div>
        
        {/* Middle Address */}
        <div className="flex flex-col text-[10px] text-gray-700 max-w-[280px] leading-relaxed">
          <span>NowScripts Software Development India Pvt. Ltd.</span>
          <span>Remote-First Team</span>
          <span>Gurugram, Haryana</span>
        </div>

        {/* Right Side Info */}
        <div className="flex flex-col text-[10px] text-gray-700 text-right">
          <span>Tel +91 (40) 6629 4700</span>
          <span>CIN {data.certificateId || "[Auto-Generated]"}</span>
        </div>
      </div>

      {/* Date */}
      <div className="mb-[60px]">
        <p className="font-bold text-[14px]">{formatDate(data.issueDate)}</p>
      </div>

      {/* Title */}
      <div className="text-center mb-[40px]">
        <h1 className="font-bold text-[14px] uppercase tracking-wide">
          TO WHOM IT MAY CONCERN
        </h1>
      </div>

      {/* Body Paragraph */}
      <div className="text-black flex flex-col gap-[24px] text-[13px] leading-[1.8] text-justify mb-[32px]">
        <p>
          This is to certify that <strong>{data.candidateName || "[Name]"}{data.certificateId ? ` (${data.certificateId})` : ""}</strong> have completed the internship with us from <strong>{formatShortDate(data.startDate)}</strong> to <strong>{formatShortDate(data.endDate)}</strong>. <strong>{data.candidateName || "[Name]"}</strong>'s role at the time of leaving NowScripts was <strong>{data.internshipTitle || "[Track/Role Name]"}</strong>.
        </p>

        <p>
          We wish you all the very best for your future endeavors.
        </p>

        <p>
          For any queries concerning the above information, please verify at <span className="text-blue-600 underline">nowscripts.in/verify/{data.certificateId || "[Certificate ID]"}</span> or contact <span className="text-blue-600 underline">support@nowscripts.in</span>.
        </p>
      </div>

      {/* Sign Off */}
      <div>
        <p className="text-[13px] leading-relaxed mb-1">Yours sincerely,</p>
        <p className="text-[13px] leading-relaxed mb-[32px]">For and on behalf of <strong>NowScripts Software Development LLC</strong></p>
        
        {/* Signature Placeholder - Using a cursive font to simulate a real signature */}
        <div className="mb-[16px] ml-[-10px]">
           <span className="font-['Brush_Script_MT',cursive] text-[36px] text-gray-800 opacity-90 block" style={{ transform: 'rotate(-5deg)' }}>
             {data.mentorName || "Signature"}
           </span>
        </div>

        <div className="w-[180px] h-[1px] bg-gray-400 mb-[8px]"></div>
        
        <p className="font-bold text-[13px] uppercase">{data.mentorName || "[Signatory Name]"}</p>
        <p className="font-bold text-[13px]">{data.department || "[Signatory Title]"}</p>
      </div>

      {/* Footer Logo */}
      <div className="mt-auto">
        <div className="font-bold text-[24px] tracking-tighter flex items-center">
          nowscripts<span className="text-now-primary">.</span>
        </div>
      </div>
    </div>
  );
});
