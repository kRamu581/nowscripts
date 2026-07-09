import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { httpRequest } from "../../interceptor/axiosInterceptor";
import { url } from "../../baseUrl";
import { useAppContext } from "../../App";
import { Search, Plus, Filter, Download, X, Check, AlertCircle, FileText } from "lucide-react";
import { Link } from "react-router-dom";

interface Certificate {
  _id: string;
  certificateId: string;
  verificationNumber: string;
  candidateName: string;
  email: string;
  trackCompleted: string;
  internshipTitle?: string; // Added for backwards compatibility with old records
  companyName: string;
  issueDate: string;
  startDate: string;
  endDate: string;
  mentorName: string;
  status: "Active" | "Revoked" | "Expired";
  createdAt: string;
}

const TRACKS_COMPLETED = [
 "ServiceNow Fundamentals",
 "ServiceNow Administration Internship",
 "ServiceNow Developer Internship",
 "ITSM Internship",
 "ServiceNow CSA Preparation Internship",
 "Technical Content Writing Internship",
 "Community Management Internship",
 "Frontend Development"
];

export default function AdminCertificates() {
 const { handleToast } = useAppContext();
 const queryClient = useQueryClient();

 const [searchQuery, setSearchQuery] = useState("");
 const [debouncedSearch, setDebouncedSearch] = useState("");
 const [statusFilter, setStatusFilter] = useState("All");
 const [currentPage, setCurrentPage] = useState(1);

 // Debounce Search
 useEffect(() => {
 const handler = setTimeout(() => {
 setDebouncedSearch(searchQuery);
 setCurrentPage(1);
 }, 500);
 return () => clearTimeout(handler);
 }, [searchQuery]);

 // Fetch Certificates
 const fetchCertificates = async () => {
 const params = new URLSearchParams({ 
 page: currentPage.toString(), 
 limit: "10",
 ...(debouncedSearch && { search: debouncedSearch }),
 ...(statusFilter !== "All" && { status: statusFilter })
 });
 
 const response = await httpRequest.get(`${url}/certificate/list?${params.toString()}`);
 return response.data;
 };

 const { data, isLoading } = useQuery({
 queryKey: ["adminCertificates", currentPage, debouncedSearch, statusFilter],
 queryFn: fetchCertificates,
 keepPreviousData: true,
 });

 const certificates = data?.certificates || [];
 const pagination = data?.pagination;

 // Mutations
 const revokeMutation = useMutation({
 mutationFn: async (id: string) => {
 return httpRequest.patch(`${url}/certificate/revoke/${id}`, {});
 },
 onSuccess: () => {
 queryClient.invalidateQueries(["adminCertificates"]);
 handleToast("Certificate revoked successfully");
 },
 onError: (err: any) => {
 handleToast(err.response?.data?.message || "Failed to revoke certificate");
 }
 });

 // Handlers
 const handleExportCSV = () => {
 if (!certificates.length) return handleToast("No data to export");
 
 const headers = ["Certificate ID", "Verification Number", "Candidate Name", "Email", "Track Completed", "Issue Date", "Status"];
 const csvContent = [
 headers.join(","),
 ...certificates.map((c: Certificate) => [
 c.certificateId,
 c.verificationNumber,
 `"${c.candidateName}"`,
 `"${c.email}"`,
 `"${c.trackCompleted}"`,
 new Date(c.issueDate).toLocaleDateString(),
 c.status
 ].join(","))
 ].join("\n");

 const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
 const link = document.createElement("a");
 const urlBlob = URL.createObjectURL(blob);
 link.setAttribute("href", urlBlob);
 link.setAttribute("download", `nowscripts_certificates_${new Date().toISOString().split('T')[0]}.csv`);
 link.style.visibility = 'hidden';
 document.body.appendChild(link);
 link.click();
 document.body.removeChild(link);
 };

 return (
    <div className="min-h-screen bg-transparent text-white p-6 lg:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
              <FileText className="w-8 h-8 text-now-primary" />
              Certificate Management
            </h1>
            <p className="text-gray-400">Issue, verify, and manage completion certificates.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleExportCSV}
              className="px-4 py-2 bg-white/5 border border-white/10 text-white font-semibold rounded-lg shadow-sm hover:bg-white/10 hover:border-white/20 transition flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
 <Link 
 to="/admin/certificates/studio"
 className="px-5 py-2 bg-now-primary text-white font-semibold rounded-lg shadow-sm hover:bg-now-accent transition flex items-center gap-2"
 >
 <Plus className="w-5 h-5" /> Issue Certificate
 </Link>
 </div>
 </div>

        {/* Controls */}
        <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl shadow-sm border border-white/10 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search by ID, Name, or Email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-now-primary/50 text-white placeholder-gray-500"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Filter className="w-5 h-5 text-gray-500" />
            <select 
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="px-4 py-2 border border-white/10 bg-[#0F1014] rounded-lg focus:outline-none focus:ring-2 focus:ring-now-primary/50 text-white"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Revoked">Revoked</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
 </div>

        {/* Table */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl shadow-sm border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-gray-400 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-bold">Certificate ID</th>
                  <th className="px-6 py-4 font-bold">Candidate</th>
                  <th className="px-6 py-4 font-bold">Track Completed</th>
                  <th className="px-6 py-4 font-bold">Issue Date</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
 {isLoading ? (
 <tr>
 <td colSpan={6} className="px-6 py-10 text-center text-gray-500">Loading certificates...</td>
 </tr>
 ) : certificates.length === 0 ? (
 <tr>
 <td colSpan={6} className="px-6 py-10 text-center text-gray-500">No certificates found.</td>
 </tr>
 ) : (
 certificates.map((cert: Certificate) => (
 <tr key={cert._id} className="hover:bg-white/5 transition-colors">
 <td className="px-6 py-4">
 <div className="font-semibold text-white">{cert.certificateId}</div>
 <div className="text-xs text-gray-400 font-mono">{cert.verificationNumber}</div>
 </td>
 <td className="px-6 py-4">
 <div className="font-semibold text-white">{cert.candidateName}</div>
 <div className="text-sm text-gray-400">{cert.email}</div>
 </td>
 <td className="px-6 py-4">
 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
 {cert.trackCompleted || cert.internshipTitle}
 </span>
 </td>
 <td className="px-6 py-4 text-sm text-gray-300">
 {new Date(cert.issueDate).toLocaleDateString()}
 </td>
 <td className="px-6 py-4">
 {cert.status === "Active" ? (
 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
 <Check className="w-3 h-3 mr-1" /> Active
 </span>
 ) : cert.status === "Revoked" ? (
 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
 <X className="w-3 h-3 mr-1" /> Revoked
 </span>
 ) : (
 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
 <AlertCircle className="w-3 h-3 mr-1" /> Expired
 </span>
 )}
 </td>
 <td className="px-6 py-4 text-right text-sm font-medium">
 <a 
 href={`/verify/${cert.certificateId}`} 
 target="_blank" 
 rel="noreferrer"
 className="text-now-primary hover:text-now-accent mr-4"
 >
 View
 </a>
 {cert.status === "Active" && (
 <button 
 onClick={() => {
 if (window.confirm("Are you sure you want to revoke this certificate?")) {
 revokeMutation.mutate(cert.certificateId);
 }
 }}
 className="text-red-400 hover:text-red-300"
 >
 Revoke
 </button>
 )}
 </td>
 </tr>
 ))
 )}
 </tbody>
 </table>
 </div>
 
 {/* Pagination */}
 {pagination && pagination.pages > 1 && (
          <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between bg-white/5">
            <p className="text-sm text-gray-400">
              Showing page <span className="font-semibold text-white">{pagination.page}</span> of <span className="font-semibold text-white">{pagination.pages}</span>
            </p>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-white/10 rounded-md text-sm font-medium text-gray-300 disabled:opacity-50 hover:bg-white/10 transition-colors"
              >
                Previous
              </button>
              <button 
                onClick={() => setCurrentPage(p => Math.min(pagination.pages, p + 1))}
                disabled={currentPage === pagination.pages}
                className="px-3 py-1 border border-white/10 rounded-md text-sm font-medium text-gray-300 disabled:opacity-50 hover:bg-white/10 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
 </div>
 </div>

 </div>
 );
}
