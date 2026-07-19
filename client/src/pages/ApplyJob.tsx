import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AmberFooter } from '../components/landing/amber/AmberFooter';
import { ChevronLeft, Upload } from 'lucide-react';

export default function ApplyJob() {
  const { id } = useParams();
  const jobTitle = id ? id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : "Software Engineer Intern";

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneCountry: '',
    phone: '',
    locationCity: '',
    school: '',
    degree: '',
    discipline: '',
    startYear: '',
    endMonth: '',
    endYear: '',
    otherSchool: '',
    gpa: '',
    preferredName: '',
    pronouns: '',
    profileLinks: '',
    whatsappOptIn: '',
    previouslyEmployed: '',
    whyGoodFit: '',
    cohortDates: '',
    eligibleToWork: '',
    requireVisa: ''
  });

  useEffect(() => {
    document.title = `Apply for ${jobTitle} - NowScripts`;
    window.scrollTo(0, 0);
  }, [jobTitle]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct the email body
    const subject = `Job Application: ${jobTitle} - ${formData.firstName} ${formData.lastName}`;
    const body = `
*** PERSONAL INFORMATION ***
Name: ${formData.firstName} ${formData.lastName}
Preferred Name: ${formData.preferredName}
Pronouns: ${formData.pronouns}
Email: ${formData.email}
Phone: ${formData.phoneCountry} ${formData.phone}
Location (City): ${formData.locationCity}

*** EDUCATION ***
School: ${formData.school}
Other School: ${formData.otherSchool}
Degree: ${formData.degree}
Discipline: ${formData.discipline}
Start Year: ${formData.startYear}
End Date: ${formData.endMonth} ${formData.endYear}
GPA: ${formData.gpa}

*** PROFILE LINKS ***
Links: ${formData.profileLinks}

*** QUESTIONS ***
WhatsApp Opt-In: ${formData.whatsappOptIn}
Previously Employed by NowScripts: ${formData.previouslyEmployed}
Why good fit: ${formData.whyGoodFit}
Cohort Dates: ${formData.cohortDates}
Eligible to work in India: ${formData.eligibleToWork}
Requires Visa Sponsorship: ${formData.requireVisa}

*** ATTACHMENTS ***
(Please manually attach your Resume/CV and Cover Letter to this email before sending.)
    `.trim();

    // Trigger the email client
    window.location.href = `mailto:kramu.cloud@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] font-sans text-[#333333]">
      <div className="max-w-[800px] mx-auto px-6 pt-16 md:pt-24 pb-20">
        
        <Link to={`/careers/${id}`} className="inline-flex items-center text-[#FF5A5F] hover:text-[#E82C45] font-medium text-sm mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Role Details
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-[#0B2538] mb-2 tracking-tight">
          Apply for this job
        </h1>
        <p className="text-gray-500 mb-2 text-[15px]">
          Applying for <span className="font-semibold text-[#0B2538]">{jobTitle}</span>
        </p>
        <p className="text-[#FF5A5F] mb-10 text-xs font-semibold">
          * indicates a required field
        </p>

        <div className="bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100 p-8 md:p-12">
          <form onSubmit={handleSubmit} className="flex flex-col gap-10">
            
            {/* Personal Information */}
            <div>
              <h3 className="text-xl font-bold text-[#0B2538] mb-6">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-bold text-gray-700">First Name <span className="text-[#FF5A5F]">*</span></label>
                  <input required name="firstName" value={formData.firstName} onChange={handleChange} type="text" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] transition-all text-sm" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-bold text-gray-700">Last Name <span className="text-[#FF5A5F]">*</span></label>
                  <input required name="lastName" value={formData.lastName} onChange={handleChange} type="text" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] transition-all text-sm" />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[14px] font-bold text-gray-700">Email <span className="text-[#FF5A5F]">*</span></label>
                  <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] transition-all text-sm" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-bold text-gray-700">Phone Country <span className="text-[#FF5A5F]">*</span></label>
                  <select required name="phoneCountry" value={formData.phoneCountry} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] transition-all text-sm">
                    <option value="">Select...</option>
                    <option value="+91">India (+91)</option>
                    <option value="+1">United States (+1)</option>
                    <option value="+44">United Kingdom (+44)</option>
                    <option value="+61">Australia (+61)</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-bold text-gray-700">Phone <span className="text-[#FF5A5F]">*</span></label>
                  <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] transition-all text-sm" />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[14px] font-bold text-gray-700">Location (City) <span className="text-[#FF5A5F]">*</span></label>
                  <input required name="locationCity" value={formData.locationCity} onChange={handleChange} type="text" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] transition-all text-sm" />
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Documents */}
            <div>
              <h3 className="text-xl font-bold text-[#0B2538] mb-6">Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="text-[14px] font-bold text-gray-700 block mb-2">Resume/CV <span className="text-[#FF5A5F]">*</span></label>
                  <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center bg-gray-50/50">
                    <Upload className="w-6 h-6 text-gray-400 mb-2" />
                    <p className="text-sm font-medium text-gray-600 mb-1">Attach File</p>
                    <p className="text-[11px] text-gray-400">Accepted file types: pdf, doc, docx, txt, rtf</p>
                    <p className="text-[11px] text-[#FF5A5F] mt-2 italic">* Attach in your email client</p>
                  </div>
                </div>
                <div>
                  <label className="text-[14px] font-bold text-gray-700 block mb-2">Cover Letter</label>
                  <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center bg-gray-50/50">
                    <Upload className="w-6 h-6 text-gray-400 mb-2" />
                    <p className="text-sm font-medium text-gray-600 mb-1">Attach File</p>
                    <p className="text-[11px] text-gray-400">Accepted file types: pdf, doc, docx, txt, rtf</p>
                    <p className="text-[11px] text-[#FF5A5F] mt-2 italic">* Attach in your email client</p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Education */}
            <div>
              <h3 className="text-xl font-bold text-[#0B2538] mb-6">Education</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[14px] font-bold text-gray-700">School <span className="text-[#FF5A5F]">*</span></label>
                  <select required name="school" value={formData.school} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] transition-all text-sm">
                    <option value="">Select...</option>
                    <option value="IIT">IIT</option>
                    <option value="NIT">NIT</option>
                    <option value="BITS Pilani">BITS Pilani</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                {formData.school === 'Other' && (
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-[14px] font-bold text-gray-700">School Name</label>
                    <p className="text-xs text-gray-500 mb-1">We are always aiming to keep our school list inclusive of all institutions. If you do not see your University listed, please let us know your school name here.</p>
                    <input name="otherSchool" value={formData.otherSchool} onChange={handleChange} type="text" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] transition-all text-sm" />
                  </div>
                )}

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[14px] font-bold text-gray-700">Degree <span className="text-[#FF5A5F]">*</span></label>
                  <select required name="degree" value={formData.degree} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] transition-all text-sm">
                    <option value="">Select...</option>
                    <option value="Bachelors">Bachelors</option>
                    <option value="Masters">Masters</option>
                    <option value="PhD">PhD</option>
                    <option value="Diploma">Diploma</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[14px] font-bold text-gray-700">Discipline <span className="text-[#FF5A5F]">*</span></label>
                  <select required name="discipline" value={formData.discipline} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] transition-all text-sm">
                    <option value="">Select...</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Electronics & Communication">Electronics & Communication</option>
                    <option value="Other Engineering">Other Engineering</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-bold text-gray-700">Start date year <span className="text-[#FF5A5F]">*</span></label>
                  <input required name="startYear" value={formData.startYear} onChange={handleChange} type="number" min="1990" max="2030" placeholder="YYYY" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] transition-all text-sm" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-bold text-gray-700">End date month <span className="text-[#FF5A5F]">*</span></label>
                  <select required name="endMonth" value={formData.endMonth} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] transition-all text-sm">
                    <option value="">Select...</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-bold text-gray-700">End date year <span className="text-[#FF5A5F]">*</span></label>
                  <input required name="endYear" value={formData.endYear} onChange={handleChange} type="number" min="1990" max="2035" placeholder="YYYY" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] transition-all text-sm" />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2 mt-2">
                  <label className="text-[14px] font-bold text-gray-700">GPA</label>
                  <p className="text-xs text-gray-500 mb-1">As part of our commitment to understanding candidates' backgrounds, we invite you to share your GPA if you feel comfortable. This information is optional.</p>
                  <input name="gpa" value={formData.gpa} onChange={handleChange} type="text" placeholder="e.g. 3.8 or 9.2" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] transition-all text-sm" />
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Profile & Additional Questions */}
            <div>
              <h3 className="text-xl font-bold text-[#0B2538] mb-6">Additional Details</h3>
              <div className="grid grid-cols-1 gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold text-gray-700">Preferred Name</label>
                    <input name="preferredName" value={formData.preferredName} onChange={handleChange} type="text" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] transition-all text-sm" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-bold text-gray-700">Pronouns</label>
                    <input name="pronouns" value={formData.pronouns} onChange={handleChange} type="text" placeholder="e.g. they/them, she/her, he/him" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] transition-all text-sm" />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-bold text-gray-700">LinkedIn Profile, Github, Personal Website, or Portfolio</label>
                  <input name="profileLinks" value={formData.profileLinks} onChange={handleChange} type="text" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] transition-all text-sm" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-bold text-gray-700">Do you opt-in to receive WhatsApp messages from NowScripts Recruiting? <span className="text-[#FF5A5F]">*</span></label>
                  <p className="text-xs text-gray-500 mb-1">Messages will only be sent regarding your candidacy with NowScripts.</p>
                  <select required name="whatsappOptIn" value={formData.whatsappOptIn} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] transition-all text-sm">
                    <option value="">Select...</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-bold text-gray-700">Have you ever been employed by NowScripts or a NowScripts affiliate? <span className="text-[#FF5A5F]">*</span></label>
                  <select required name="previouslyEmployed" value={formData.previouslyEmployed} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] transition-all text-sm">
                    <option value="">Select...</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-bold text-gray-700">Tell us a little bit about you and why you think you would be a good fit at NowScripts? <span className="text-[#FF5A5F]">*</span></label>
                  <textarea required name="whyGoodFit" value={formData.whyGoodFit} onChange={handleChange} rows={4} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] transition-all text-sm resize-y"></textarea>
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <label className="text-[14px] font-bold text-gray-700">Internship Information: please select the cohort dates that work best for you. <span className="text-[#FF5A5F]">*</span></label>
                  <p className="text-xs text-gray-500 mb-2">We will host 10 and 24 week internships in 2027. The dates listed here are approximate and are subject to change. Please check all that apply:</p>
                  
                  <div className="flex flex-col gap-3 ml-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="radio" name="cohortDates" value="January to June (6 months)" onChange={handleChange} className="w-4 h-4 text-[#FF5A5F] focus:ring-[#FF5A5F]" required />
                      <span className="text-sm text-gray-700">January to June (6 months)</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="radio" name="cohortDates" value="May to July (10 weeks)" onChange={handleChange} className="w-4 h-4 text-[#FF5A5F] focus:ring-[#FF5A5F]" />
                      <span className="text-sm text-gray-700">May to July (10 weeks)</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="radio" name="cohortDates" value="June to August (10 weeks)" onChange={handleChange} className="w-4 h-4 text-[#FF5A5F] focus:ring-[#FF5A5F]" />
                      <span className="text-sm text-gray-700">June to August (10 weeks)</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="radio" name="cohortDates" value="None of these options work for me" onChange={handleChange} className="w-4 h-4 text-[#FF5A5F] focus:ring-[#FF5A5F]" />
                      <span className="text-sm text-gray-700">None of these options work for me</span>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-4">
                  <label className="text-[14px] font-bold text-gray-700">Location and Work Authorization: Are you currently eligible to work in India? <span className="text-[#FF5A5F]">*</span></label>
                  <select required name="eligibleToWork" value={formData.eligibleToWork} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] transition-all text-sm">
                    <option value="">Select...</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-bold text-gray-700">Do you require visa sponsorship, now or in the future, to continue working in India? <span className="text-[#FF5A5F]">*</span></label>
                  <select required name="requireVisa" value={formData.requireVisa} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]/20 focus:border-[#FF5A5F] transition-all text-sm">
                    <option value="">Select...</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

              </div>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <button type="submit" className="w-full bg-[#FF5A5F] hover:bg-[#E82C45] text-white font-bold py-4 px-8 rounded-md shadow-[0_4px_14px_rgba(255,90,95,0.3)] hover:shadow-[0_6px_20px_rgba(255,90,95,0.4)] transition-all text-[16px]">
                Submit Application
              </button>
              <p className="text-center text-xs text-gray-400 mt-4">
                This will automatically draft an email to our team containing your provided information.
              </p>
            </div>

          </form>
        </div>

      </div>

      <AmberFooter />
    </div>
  );
}
