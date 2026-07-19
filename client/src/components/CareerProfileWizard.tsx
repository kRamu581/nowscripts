import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, CheckCircle2, GraduationCap, Briefcase, Map, Target } from 'lucide-react';
import { httpRequest } from '../interceptor/axiosInterceptor';
import { url } from '../baseUrl';
import { useAuth } from '../contexts/Auth';
import toast from 'react-hot-toast';

interface CareerProfileWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const COMMON_SKILLS = [
  "ITSM", "CSM", "ITOM", "Flow Designer", "UI Builder", 
  "JavaScript", "GlideRecord", "Service Portal", "App Engine", "Integration Hub"
];

const CERTIFICATIONS = [
  "CSA (Certified System Administrator)",
  "CAD (Certified Application Developer)",
  "CIS - ITSM",
  "CIS - CSM",
  "CIS - HRSD",
  "CTA (Certified Technical Architect)",
  "CMA (Certified Master Architect)"
];

const EXPERIENCES = ["0-1 years", "1-3 years", "3-5 years", "5-10 years", "10+ years"];
const STUDY_HOURS = ["1-2 hours", "3-5 hours", "5-10 hours", "10+ hours"];

export default function CareerProfileWizard({ isOpen, onClose, onSuccess }: CareerProfileWizardProps) {
  const { user, handleUser } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [studentOrProfessional, setStudentOrProfessional] = useState<'Student' | 'Fresher' | 'Professional'>('Professional');
  const [currentRole, setCurrentRole] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  
  const [currentSkills, setCurrentSkills] = useState<string[]>([]);
  const [existingCertifications, setExistingCertifications] = useState<string[]>([]);
  
  const [targetCertification, setTargetCertification] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [careerGoal, setCareerGoal] = useState('');
  const [weeklyLearningTime, setWeeklyLearningTime] = useState('');

  const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

  const toggleSkill = (skill: string) => {
    setCurrentSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
  };

  const toggleCert = (cert: string) => {
    setExistingCertifications(prev => prev.includes(cert) ? prev.filter(c => c !== cert) : [...prev, cert]);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const careerProfile = {
        setupCompleted: true,
        studentOrProfessional,
        currentRole,
        yearsOfExperience,
        currentSkills,
        existingCertifications,
        targetCertification,
        targetRole,
        careerGoal,
        weeklyLearningTime
      };

      await httpRequest.put(`${url}/user/myprofile`, { careerProfile });
      
      // Update local context
      if (user) {
        handleUser({ ...user, careerProfile });
      }
      
      toast.success("Career profile saved successfully!");
      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Career Profile Setup</h2>
              <p className="text-sm text-gray-500 mt-1">Help us personalize your AI learning journey (Step {step} of 3)</p>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Which best describes you?</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {['Student', 'Fresher', 'Professional'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setStudentOrProfessional(status as any)}
                        className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                          studentOrProfessional === status 
                            ? 'border-now-primary bg-blue-50 text-now-primary' 
                            : 'border-gray-200 hover:border-gray-300 text-gray-600'
                        }`}
                      >
                        {status === 'Student' && <GraduationCap className="w-6 h-6" />}
                        {status === 'Fresher' && <Target className="w-6 h-6" />}
                        {status === 'Professional' && <Briefcase className="w-6 h-6" />}
                        <span className="font-medium">{status}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Current Role / Job Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. ServiceNow Developer, IT Support, Student"
                    value={currentRole}
                    onChange={(e) => setCurrentRole(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-now-primary focus:border-now-primary outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Years of ServiceNow Experience</label>
                  <select
                    value={yearsOfExperience}
                    onChange={(e) => setYearsOfExperience(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-now-primary focus:border-now-primary outline-none transition-all bg-white"
                  >
                    <option value="">Select experience level...</option>
                    {EXPERIENCES.map(exp => (
                      <option key={exp} value={exp}>{exp}</option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Current Technical Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {COMMON_SKILLS.map((skill) => (
                      <button
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
                          currentSkills.includes(skill)
                            ? 'bg-now-primary text-white border-now-primary'
                            : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Existing Certifications (Select all you hold)</label>
                  <div className="space-y-2">
                    {CERTIFICATIONS.map((cert) => (
                      <label key={cert} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
                        <input 
                          type="checkbox"
                          checked={existingCertifications.includes(cert)}
                          onChange={() => toggleCert(cert)}
                          className="w-4 h-4 text-now-primary rounded border-gray-300 focus:ring-now-primary"
                        />
                        <span className="text-gray-700 text-sm font-medium">{cert}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">What is your Target Role?</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Senior ServiceNow Architect"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-now-primary focus:border-now-primary outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Which Certification are you aiming for next?</label>
                  <select
                    value={targetCertification}
                    onChange={(e) => setTargetCertification(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-now-primary focus:border-now-primary outline-none transition-all bg-white"
                  >
                    <option value="">Select target certification...</option>
                    {CERTIFICATIONS.map(cert => (
                      <option key={cert} value={cert}>{cert}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Weekly Learning Commitment</label>
                  <select
                    value={weeklyLearningTime}
                    onChange={(e) => setWeeklyLearningTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-now-primary focus:border-now-primary outline-none transition-all bg-white"
                  >
                    <option value="">How much time can you dedicate?</option>
                    {STUDY_HOURS.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Primary Career Goal</label>
                  <textarea 
                    placeholder="e.g. I want to transition from a generic IT role to a specialized ServiceNow Developer position within 6 months."
                    value={careerGoal}
                    onChange={(e) => setCareerGoal(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-now-primary focus:border-now-primary outline-none transition-all resize-none h-24"
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer Navigation */}
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center">
            <button
              onClick={handlePrev}
              disabled={step === 1}
              className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                step === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            
            <div className="flex gap-1.5">
              {[1, 2, 3].map(i => (
                <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-6 bg-now-primary' : i < step ? 'w-2 bg-now-primary/50' : 'w-2 bg-gray-200'}`} />
              ))}
            </div>

            {step < 3 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-1 px-5 py-2 bg-now-primary text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors shadow-sm disabled:opacity-70"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <CheckCircle2 className="w-4 h-4" />
                )}
                Complete Profile
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
