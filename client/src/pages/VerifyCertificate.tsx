import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { url } from "../baseUrl";
import { useAppContext } from "../App";
import { Search, CheckCircle, XCircle, AlertTriangle, Download, Award, Calendar, User, Briefcase, Hash } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export default function VerifyCertificate() {
  const { certificateId: urlCertId } = useParams();
  const navigate = useNavigate();
  const { hideNavbar } = useAppContext();

  const [searchInput, setSearchInput] = useState("");
  const [activeCertId, setActiveCertId] = useState<string | null>(urlCertId || null);

  useEffect(() => {
    hideNavbar(true);
    document.title = "Verify Credentials | NowScripts";
    return () => hideNavbar(false);
  }, []);

  const { data: certData, isLoading, isError, error } = useQuery({
    queryKey: ["verifyCertificate", activeCertId],
    queryFn: async () => {
      if (!activeCertId) return null;
      const response = await axios.get(`${url}/certificate/verify/${activeCertId}`);
      return response.data;
    },
    enabled: !!activeCertId,
    retry: false,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setActiveCertId(searchInput.trim());
      navigate(`/verify/${searchInput.trim()}`, { replace: true });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "Revoked": return "text-red-600 bg-red-50 border-red-200";
      case "Expired": return "text-amber-600 bg-amber-50 border-amber-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const verificationTimestamp = new Date().toLocaleString();

  return (
    <div className="min-h-screen bg-white text-[#111928] pt-24 pb-20 font-sans relative overflow-hidden">
      
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Search Header */}
        <div className="text-center mb-12">
          <Award className="w-16 h-16 text-[#111928] mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Credential Verification</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-8 font-medium">
            Verify the authenticity of NowScripts internship certificates and professional credentials.
          </p>

          <form onSubmit={handleSearch} className="max-w-xl mx-auto relative flex items-center shadow-lg rounded-full">
            <Search className="absolute left-4 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Enter Certificate ID or Verification Number" 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-full py-4 pl-12 pr-24 sm:pr-32 text-[#111928] placeholder:text-gray-400 focus:outline-none focus:border-now-primary focus:ring-1 focus:ring-now-primary transition-all text-sm md:text-lg font-medium"
            />
            <button 
              type="submit" 
              className="absolute right-2 px-4 sm:px-6 py-2.5 bg-[#111928] text-white font-bold rounded-full hover:bg-gray-900 transition-colors text-sm md:text-base shadow-md"
            >
              Verify
            </button>
          </form>
        </div>

        {/* Results Area */}
        <div className="mt-12">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-now-primary"></div>
              <p className="mt-4 text-gray-500 font-medium">Verifying secure database...</p>
            </div>
          ) : isError ? (
            <div className="bg-red-50 border border-red-200 rounded-3xl p-10 text-center max-w-2xl mx-auto shadow-sm">
              <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-[#111928] mb-4">Certificate Not Found</h2>
              <p className="text-gray-600 text-lg font-medium">
                This certificate does not exist in the NowScripts verification database. Please check the Certificate ID or Verification Number and try again.
              </p>
            </div>
          ) : certData ? (
            <div className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-gray-200 relative">
              {/* Header */}
              <div className="bg-gray-50 border-b border-gray-200 px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  {certData.status === "Active" ? (
                     <CheckCircle className="w-8 h-8 text-emerald-500" />
                  ) : certData.status === "Revoked" ? (
                    <XCircle className="w-8 h-8 text-red-500" />
                  ) : (
                    <AlertTriangle className="w-8 h-8 text-amber-500" />
                  )}
                  <h2 className="text-2xl font-bold text-[#111928]">Credential Verified</h2>
                </div>
                <div className={`px-4 py-1.5 rounded-full border text-sm font-bold tracking-wide uppercase ${getStatusColor(certData.status)}`}>
                  Status: {certData.status}
                </div>
              </div>

              {/* Body */}
              <div className="p-8 md:p-12 flex flex-col md:flex-row gap-12">
                <div className="flex-1 space-y-8">
                  <div>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Candidate Name</p>
                    <p className="text-3xl font-extrabold text-[#111928]">{certData.candidateName}</p>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Internship Program</p>
                    <p className="text-xl font-bold text-now-primary flex items-center gap-2">
                      <Briefcase className="w-5 h-5" />
                      {certData.internshipTitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" /> Duration
                      </p>
                      <p className="font-medium text-[#111928]">
                        {new Date(certData.startDate).toLocaleDateString()} - {new Date(certData.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" /> Issue Date
                      </p>
                      <p className="font-medium text-[#111928]">
                        {new Date(certData.issueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <User className="w-4 h-4" /> Mentor
                      </p>
                      <p className="font-medium text-[#111928]">{certData.mentorName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Organization</p>
                      <p className="font-medium text-[#111928]">{certData.companyName}</p>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Hash className="w-3 h-3" /> Certificate ID
                      </p>
                      <p className="font-mono text-[#111928] font-bold">{certData.certificateId}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Hash className="w-3 h-3" /> Verification Number
                      </p>
                      <p className="font-mono text-[#111928] font-bold">{certData.verificationNumber}</p>
                    </div>
                  </div>
                </div>

                {/* QR Code Column */}
                <div className="flex flex-col items-center justify-center md:border-l md:border-gray-100 md:pl-12 gap-6">
                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <QRCodeSVG 
                      value={`https://nowscripts.com/verify/${certData.certificateId}`}
                      size={180}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                  <p className="text-xs text-center text-gray-500 max-w-[200px] font-medium">
                    Scan QR code to verify this credential online at anytime.
                  </p>
                </div>
              </div>

              {/* Footer text */}
              <div className="bg-gray-50 border-t border-gray-200 px-8 py-4 text-center">
                <p className="text-xs text-gray-500 font-medium">
                  Verified on <span className="font-bold text-[#111928]">{verificationTimestamp}</span> from the NowScripts secure database.
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
