import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpRequest } from "../../interceptor/axiosInterceptor";
import { url } from "../../baseUrl";
import { useAppContext } from "../../App";
import { ArrowLeft, Save, Download, FileText, CheckCircle, Maximize2, X } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { CertificateTemplate, CertificateData } from "../../components/admin/CertificateTemplates";



const TEMPLATE_TYPES = [
 "Certificate of Completion"
];

export default function CertificateStudio() {
 const navigate = useNavigate();
 const { handleToast, hideNavbar } = useAppContext();
 const queryClient = useQueryClient();
 const certificateRef = useRef<HTMLDivElement>(null);

 const [isGenerating, setIsGenerating] = useState(false);
 const [savedCertId, setSavedCertId] = useState<string | null>(null);
 const [isPreviewFullScreen, setIsPreviewFullScreen] = useState(false);

 // Form State
 const [formData, setFormData] = useState<CertificateData>({
 candidateName: "",
 email: "",
 internshipTitle: "",
 templateType: TEMPLATE_TYPES[0],
 department: "Senior Director - NowScripts Management",
 projectUndertaken: "",
 rolesAndResponsibilities: "",
 location: "Full-time Remote",
 companyName: "NowScripts Private Limited",
 issueDate: new Date().toISOString().split('T')[0],
 startDate: "",
 endDate: "",
 mentorName: "",
 certificateId: "",
 verificationNumber: "",
 });

 useEffect(() => {
 hideNavbar(true);
 return () => hideNavbar(false);
 }, []);

 const createMutation = useMutation({
 mutationFn: async (newCert: any) => {
 return httpRequest.post(`${url}/certificate/create`, newCert);
 },
 onSuccess: (res) => {
 queryClient.invalidateQueries(["adminCertificates"]);
 handleToast("Certificate saved to database!");
 setSavedCertId(res.data.certificateId);
 // Update form with the generated IDs from the server so the PDF includes them
 setFormData(prev => ({
 ...prev,
 certificateId: res.data.certificateId,
 verificationNumber: res.data.verificationNumber
 }));
 },
 onError: (err: any) => {
 handleToast(err.response?.data?.message || "Failed to save certificate");
 }
 });

 const handleSave = async (e: React.FormEvent) => {
 e.preventDefault();
 if (!formData.candidateName || !formData.email || !formData.startDate || !formData.endDate || !formData.mentorName) {
 return handleToast("Please fill all required fields");
 }
 createMutation.mutate(formData);
 };

 const generatePDF = async () => {
 if (!certificateRef.current) return;
 
 setIsGenerating(true);
 try {
 // Wait for all fonts and images to load completely
 await document.fonts.ready;
 await new Promise(resolve => setTimeout(resolve, 500));

 const canvas = await html2canvas(certificateRef.current, {
 scale: 3,
 useCORS: true,
 allowTaint: false,
 logging: false,
 backgroundColor: "#ffffff",
 scrollX: 0,
 scrollY: 0,
 windowWidth: 794,
 windowHeight: 1123,
 removeContainer: true,
 onclone: (clonedDoc) => {
 // Remove any scaling transforms from the cloned document's parent wrappers
 // that cause text overlapping issues in html2canvas
 const element = clonedDoc.getElementById('certificate-export-wrap');
 if (element) {
 element.style.transform = 'none';
 }
 }
 });
 
 const imgData = canvas.toDataURL("image/png", 1.0);
 const pdf = new jsPDF({
 orientation: "portrait",
 unit: "mm",
 format: "a4",
 compress: true
 });
 
 // A4 size in mm is 210 x 297
 pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
 pdf.save(`NowScripts_Certificate_${formData.candidateName.replace(/\s+/g, '_') || "Draft"}.pdf`);
 handleToast("PDF Downloaded successfully!");
 } catch (error) {
 console.error("PDF Generation failed", error);
 handleToast("Failed to generate PDF");
 } finally {
 setIsGenerating(false);
 }
 };

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
 setFormData({ ...formData, [e.target.name]: e.target.value });
 // If they change data after saving, clear the saved state so they know it's un-synced
 if (savedCertId) setSavedCertId(null);
 };

 return (
 <div className="h-screen w-full bg-gray-900 flex flex-col overflow-hidden font-sans">
 {/* Top Navbar */}
 <div className="h-16 bg-gray-800 border-b border-[rgba(255,255,255,0.1)] flex items-center justify-between px-6 shrink-0">
 <div className="flex items-center gap-4">
 <button 
 onClick={() => navigate('/admin/certificates')}
 className="text-gray-500 hover:text-slate-900 transition-colors"
 >
 <ArrowLeft className="w-5 h-5" />
 </button>
 <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
 <FileText className="w-5 h-5 text-now-primary" />
 Certificate Studio
 </div>
 </div>
 
 <div className="flex items-center gap-3">
 <button 
 onClick={handleSave}
 disabled={createMutation.isLoading || !!savedCertId}
 className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors ${
 savedCertId 
 ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 cursor-default"
 : "bg-[#334155] text-slate-900 hover:bg-[#475569]"
 }`}
 >
 {savedCertId ? <><CheckCircle className="w-4 h-4" /> Saved</> : <><Save className="w-4 h-4" /> Save to Database</>}
 </button>
 <button 
 onClick={generatePDF}
 disabled={isGenerating}
 className="px-5 py-2 bg-now-primary text-black font-bold rounded-lg hover:bg-now-accent transition-colors flex items-center gap-2 disabled:opacity-70"
 >
 <Download className="w-4 h-4" /> 
 {isGenerating ? "Generating..." : "Download PDF"}
 </button>
 </div>
 </div>

 {/* Main Workspace */}
 <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
 
 {/* Left Panel: Form */}
 <div className="w-full lg:w-[450px] bg-gray-800 border-b lg:border-b-0 lg:border-r border-[rgba(255,255,255,0.1)] overflow-y-auto p-4 lg:p-6 custom-scrollbar shrink-0">
 <form className="space-y-6">
 
 <div className="space-y-4">
 <h3 className="text-slate-900 font-bold uppercase tracking-wider text-sm border-b border-[rgba(255,255,255,0.1)] pb-2">Document Settings</h3>
 <div>
 <label className="block text-xs font-semibold text-gray-500 mb-1">Template Type</label>
 <select name="templateType" value={formData.templateType} onChange={handleChange} className="w-full px-3 py-3 lg:py-2 bg-gray-900 border border-[rgba(255,255,255,0.1)] rounded text-slate-900 focus:outline-none focus:border-now-primary text-sm min-h-[44px]">
 {TEMPLATE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
 </select>
 </div>
 <div>
 <label className="block text-xs font-semibold text-gray-500 mb-1">Role / Track Completed</label>
 <input type="text" name="internshipTitle" value={formData.internshipTitle} onChange={handleChange} placeholder="e.g. Intern-Associate Technical Support Engineer" className="w-full px-3 py-3 lg:py-2 bg-gray-900 border border-[rgba(255,255,255,0.1)] rounded text-slate-900 focus:outline-none focus:border-now-primary text-sm min-h-[44px]" />
 </div>
 </div>

 <div className="space-y-4">
 <h3 className="text-slate-900 font-bold uppercase tracking-wider text-sm border-b border-[rgba(255,255,255,0.1)] pb-2">Candidate Details</h3>
 <div>
 <label className="block text-xs font-semibold text-gray-500 mb-1">Candidate Name *</label>
 <input type="text" name="candidateName" value={formData.candidateName} onChange={handleChange} placeholder="e.g. Kalluri Prathap" className="w-full px-3 py-3 lg:py-2 bg-gray-900 border border-[rgba(255,255,255,0.1)] rounded text-slate-900 focus:outline-none focus:border-now-primary text-sm min-h-[44px]" />
 </div>
 <div>
 <label className="block text-xs font-semibold text-gray-500 mb-1">Email Address *</label>
 <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="e.g. name@example.com" className="w-full px-3 py-3 lg:py-2 bg-gray-900 border border-[rgba(255,255,255,0.1)] rounded text-slate-900 focus:outline-none focus:border-now-primary text-sm min-h-[44px]" />
 </div>
 <div>
 <label className="block text-xs font-semibold text-gray-500 mb-1">Signatory Title</label>
 <input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="e.g. Senior Director - NowScripts Management" className="w-full px-3 py-3 lg:py-2 bg-gray-900 border border-[rgba(255,255,255,0.1)] rounded text-slate-900 focus:outline-none focus:border-now-primary text-sm min-h-[44px]" />
 </div>
 </div>

 <div className="space-y-4">
 <h3 className="text-slate-900 font-bold uppercase tracking-wider text-sm border-b border-[rgba(255,255,255,0.1)] pb-2">Timeline & Execution</h3>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
 <div>
 <label className="block text-xs font-semibold text-gray-500 mb-1">Start Date *</label>
 <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full px-3 py-3 lg:py-2 bg-gray-900 border border-[rgba(255,255,255,0.1)] rounded text-slate-900 focus:outline-none focus:border-now-primary text-sm [color-scheme:dark] min-h-[44px]" />
 </div>
 <div>
 <label className="block text-xs font-semibold text-gray-500 mb-1">End Date *</label>
 <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full px-3 py-3 lg:py-2 bg-gray-900 border border-[rgba(255,255,255,0.1)] rounded text-slate-900 focus:outline-none focus:border-now-primary text-sm [color-scheme:dark] min-h-[44px]" />
 </div>
 </div>

 <div>
 <label className="block text-xs font-semibold text-gray-500 mb-1">Signatory Name *</label>
 <input type="text" name="mentorName" value={formData.mentorName} onChange={handleChange} placeholder="e.g. Kalluri Prathap" className="w-full px-3 py-3 lg:py-2 bg-gray-900 border border-[rgba(255,255,255,0.1)] rounded text-slate-900 focus:outline-none focus:border-now-primary text-sm min-h-[44px]" />
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
 <div>
 <label className="block text-xs font-semibold text-gray-500 mb-1">Issue Date</label>
 <input type="date" name="issueDate" value={formData.issueDate} onChange={handleChange} className="w-full px-3 py-3 lg:py-2 bg-gray-900 border border-[rgba(255,255,255,0.1)] rounded text-slate-900 focus:outline-none focus:border-now-primary text-sm [color-scheme:dark] min-h-[44px]" />
 </div>

 </div>
 </div>

 {/* Hint Box */}
 <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg mt-6">
 <p className="text-xs text-blue-300 leading-relaxed">
 <strong>Tip:</strong> The live preview updates instantly. Save the certificate to generate official IDs and Verification URLs before downloading the PDF.
 </p>
 </div>
 </form>
 </div>

 {/* Right Panel: Live Preview */}
 <div className={`flex-1 overflow-auto flex items-start justify-center p-4 lg:p-8 custom-scrollbar ${isPreviewFullScreen ? 'fixed inset-0 z-50 bg-gray-800/90 backdrop-blur-sm' : 'bg-gray-300 relative'}`}>
 {/* Action buttons overlay for mobile preview */}
 {isPreviewFullScreen && (
 <button 
 onClick={() => setIsPreviewFullScreen(false)}
 className="absolute top-4 right-4 z-[60] bg-white p-3 rounded-full text-black shadow-lg hover:bg-gray-200"
 >
 <X className="w-6 h-6" />
 </button>
 )}

 {!isPreviewFullScreen && (
 <button 
 onClick={() => setIsPreviewFullScreen(true)}
 className="lg:hidden absolute bottom-4 right-4 z-[40] bg-now-primary p-3 flex items-center justify-center rounded-full text-black shadow-2xl hover:scale-105 transition-transform"
 >
 <Maximize2 className="w-5 h-5" />
 </button>
 )}

 {/* Wrapper to scale the A4 component to fit the screen nicely */}
 <div 
 id="certificate-export-wrap"
 className="shadow-2xl origin-top transition-transform duration-300 mx-auto" 
 style={{ 
 transform: isPreviewFullScreen ? 'scale(0.8)' : 'scale(0.4)',
 transformOrigin: 'top center',
 width: '794px',
 height: '1123px',
 marginBottom: isPreviewFullScreen ? '0' : '-600px'
 }}
 >
 <CertificateTemplate ref={certificateRef} data={formData} />
 </div>
 </div>

 </div>
 
 <style dangerouslySetInnerHTML={{__html: `
 .custom-scrollbar::-webkit-scrollbar { width: 8px; }
 .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
 .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
 .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
 `}} />
 </div>
 );
}
