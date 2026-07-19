import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AmberFooter } from '../components/landing/amber/AmberFooter';
import { Search, Users, MapPin, Globe } from 'lucide-react';

const JOBS = [
  {
    id: 'servicenow-content-creator',
    title: 'ServiceNow Content Creator',
    team: 'Content',
    location: 'Remote in India',
    flag: '🇮🇳',
  },
  {
    id: 'senior-frontend-engineer',
    title: 'Senior Frontend Engineer',
    team: 'Engineering',
    location: 'Remote in India',
    flag: '🇮🇳',
  }
];

export default function Careers() {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    document.title = "Careers - NowScripts";
    window.scrollTo(0, 0);
  }, []);

  const filteredJobs = JOBS.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.team.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F7F9FC] font-sans text-[#333333]">
      <div className="max-w-[1200px] mx-auto px-6 pt-12 md:pt-16 pb-20">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <h1 className="text-4xl md:text-[56px] font-bold text-[#0B2538] leading-[1.1] tracking-tight max-w-2xl">
            Empower ServiceNow professionals across the globe
          </h1>
          
          <div className="flex flex-col gap-3 border-l-2 border-[#E2E8F0] pl-6 md:mb-2">
            <Link to="/about" className="text-[#FF5A5F] font-medium hover:underline flex items-center gap-1 text-[15px]">
              About NowScripts <span className="text-lg leading-none">&rsaquo;</span>
            </Link>
            <Link to="/community" className="text-[#FF5A5F] font-medium hover:underline flex items-center gap-1 text-[15px]">
              Meet our community <span className="text-lg leading-none">&rsaquo;</span>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="relative flex-grow md:flex-grow-0 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search for a job" 
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] shadow-[0_2px_4px_rgba(0,0,0,0.02)] transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative flex-grow md:flex-grow-0 md:w-48">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <select className="w-full pl-9 pr-8 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-[#0B2538] font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] shadow-[0_2px_4px_rgba(0,0,0,0.02)] cursor-pointer">
              <option>Teams</option>
              <option>Engineering</option>
              <option>Content</option>
              <option>Product</option>
              <option>Sales</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>

          <div className="relative flex-grow md:flex-grow-0 md:w-48">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <select className="w-full pl-9 pr-8 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-[#0B2538] font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] shadow-[0_2px_4px_rgba(0,0,0,0.02)] cursor-pointer">
              <option>Office Locations</option>
              <option>San Francisco HQ</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>

          <div className="relative flex-grow md:flex-grow-0 md:w-48">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <select className="w-full pl-9 pr-8 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-[#0B2538] font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] shadow-[0_2px_4px_rgba(0,0,0,0.02)] cursor-pointer">
              <option>Remote Locations</option>
              <option>Remote in United States</option>
              <option>Remote in Australia</option>
              <option>Remote in United Kingdom</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </div>

        <div className="text-center md:text-left mb-6 text-sm text-gray-500">
          Showing roles across all locations and all teams.
        </div>

        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-200 text-sm font-bold text-[#0B2538]">
          <div className="col-span-6">Role</div>
          <div className="col-span-2">Team</div>
          <div className="col-span-4">Location</div>
        </div>

        {/* Table Body */}
        <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden mt-2">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, idx) => (
              <div 
                key={job.id} 
                className={`grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-4 px-6 py-4 md:py-5 items-center hover:bg-[#F8FAFC] transition-colors ${
                  idx !== filteredJobs.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="col-span-6">
                  <span className="md:hidden text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Role</span>
                  <Link to={`/careers/${job.id}`} className="text-[#4f46e5] font-medium text-[15px] hover:underline">
                    {job.title}
                  </Link>
                </div>
                <div className="col-span-2">
                  <span className="md:hidden text-xs font-bold text-gray-400 uppercase tracking-wider block mt-3 mb-1">Team</span>
                  <span className="text-gray-600 text-sm">{job.team}</span>
                </div>
                <div className="col-span-4 flex items-center gap-2">
                  <span className="md:hidden text-xs font-bold text-gray-400 uppercase tracking-wider block mt-3 mb-1 w-full">Location</span>
                  <span className="text-base">{job.flag}</span>
                  <span className="text-gray-600 text-sm">{job.location}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center text-gray-500">
              No roles found matching your search criteria.
            </div>
          )}
        </div>

      </div>

      <AmberFooter />
    </div>
  );
}
