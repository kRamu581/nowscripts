import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate, NavLink, useLocation, Link } from "react-router-dom";
import { httpRequest } from "../interceptor/axiosInterceptor";
import { url } from "../baseUrl";
import { useAuth } from "../contexts/Auth";
import { motion } from "framer-motion";
import { 
 Target, Edit3, MapPin, Briefcase, ExternalLink, GraduationCap, Link as LinkIcon
} from "lucide-react";
import EditProfileModal from "../components/profile/EditProfileModal";
import SavedSection from "../components/SavedSection";
import Post from "../components/Post";

export default function Profile() {
 const { username, tab } = useParams();
 const { user } = useAuth();
 const navigate = useNavigate();
 const location = useLocation();

 const [isEditModalOpen, setIsEditModalOpen] = useState(false);

 const { data, refetch, isLoading } = useQuery({
 queryFn: () => httpRequest.get(`${url}/user/${username}`),
 queryKey: ["userProfile", username],
 retry: 1,
 onSuccess: (data) => {
 document.title = `${data.data.name} (@${data.data.username || username}) - NowScripts`;
 // If user navigated via /user/:id and it has a username, redirect
 if (location.pathname.startsWith('/user/')) {
 navigate(`/profile/${data.data.username || data.data._id}`, { replace: true });
 }
 },
 onError: () => {
 navigate('/404', { replace: true });
 }
 });

 useEffect(() => {
 refetch();
 }, [username, refetch]);

 if (isLoading || !data?.data) {
 return (
 <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-now-primary"></div>
 <p className="text-gray-500 font-medium">Loading Profile...</p>
 </div>
 );
 }

 const profile = data.data;
 const isMyProfile = user?._id === profile._id;
 const currentTab = tab || "home";

 const tabs = [
 { id: "home", label: "Home" },
 { id: "activity", label: "Activity" },
 { id: "projects", label: "Projects" },
 { id: "bookmarks", label: "Bookmarks" },
 { id: "interviews", label: "Interviews" },
 { id: "about", label: "About" },
 ];

 return (
 <div className="min-h-screen bg-white text-gray-900 transition-colors">
 <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
 <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
 
 {/* LEFT COLUMN: Main Content (70%) */}
 <div className="lg:w-[70%]">
 
 {/* Mobile Sidebar Content (Visible only on mobile/tablet) */}
 <div className="lg:hidden mb-10 flex flex-col items-center text-center">
 <img 
 src={profile.avatar || "https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2F1_dmbNkD5D-u45r44go_cf0g.png?alt=media&token=3ef51503-f601-448b-a55b-0682607ddc8a"} 
 alt={profile.name}
 className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-gray-50 shadow-md mb-4"
 />
 <h1 className="text-3xl font-extrabold tracking-tight">{profile.name}</h1>
 <p className="text-gray-500 font-medium mt-1">@{profile.username || profile._id.slice(0,8)}</p>
 
 {profile.bio && (
 <p className="text-gray-700 mt-4 max-w-md">{profile.bio}</p>
 )}

 {profile.currentLearningTrack && (
 <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 font-medium text-sm">
 <Target className="w-4 h-4" /> {profile.currentLearningTrack}
 </div>
 )}

 {isMyProfile && (
 <button 
 onClick={() => setIsEditModalOpen(true)}
 className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 :bg-gray-900 transition-colors"
 >
 <Edit3 className="w-4 h-4" /> Edit Profile
 </button>
 )}
 </div>

 {/* Profile Header (Desktop) */}
 <div className="hidden lg:block mb-10">
 <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2">{profile.name}</h1>
 <div className="flex items-center gap-4 text-gray-500 font-medium">
 <span>@{profile.username || profile._id.slice(0,8)}</span>
 {profile.location && (
 <>
 <span className="w-1 h-1 rounded-full bg-gray-300 "></span>
 <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {profile.location}</span>
 </>
 )}
 </div>
 </div>

 {/* Navigation Tabs */}
 <div className="border-b border-gray-200 overflow-x-auto hide_scroll mb-8">
 <div className="flex space-x-8 min-w-max">
 {tabs.map((t) => {
 const isActive = currentTab === t.id || (t.id === 'home' && !tab);
 return (
 <NavLink
 key={t.id}
 to={t.id === 'home' ? `/profile/${username}` : `/profile/${username}/${t.id}`}
 className={`pb-4 text-[15px] font-medium transition-colors relative whitespace-nowrap ${
 isActive 
 ? "text-gray-900 " 
 : "text-gray-500 hover:text-gray-700 :text-gray-300"
 }`}
 >
 {t.label}
 {isActive && (
 <motion.div 
 layoutId="profileTabUnderline"
 className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-900 "
 />
 )}
 </NavLink>
 );
 })}
 </div>
 </div>

 {/* Tab Content Area */}
 <div className="min-h-[400px]">
 {currentTab === 'home' && <ProfileHomeTab profile={profile} />}
 {currentTab === 'activity' && <ProfileActivityTab profile={profile} />}
 { currentTab === 'projects' && <ProfileProjectsTab profile={profile} /> }
 { currentTab === 'bookmarks' && <ProfileBookmarksTab profile={profile} /> }
 { currentTab === 'interviews' && <ProfileInterviewsTab profile={profile} /> }
 { currentTab === 'about' && <ProfileAboutTab profile={profile} /> }
 </div>

 </div>

 {/* RIGHT COLUMN: Sticky Sidebar (30%) */}
 <div className="hidden lg:block lg:w-[30%]">
 <div className="sticky top-24 space-y-8">
 
 {/* User Profile Card */}
 <div>
 <img 
 src={profile.avatar || "https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2F1_dmbNkD5D-u45r44go_cf0g.png?alt=media&token=3ef51503-f601-448b-a55b-0682607ddc8a"} 
 alt={profile.name}
 className="w-24 h-24 rounded-full object-cover shadow-sm mb-4"
 />
 <h2 className="text-xl font-bold">{profile.name}</h2>
 <p className="text-gray-500 font-medium mb-4">@{profile.username || profile._id.slice(0,8)}</p>
 
 {profile.bio && (
 <p className="text-gray-700 text-sm leading-relaxed mb-6">{profile.bio}</p>
 )}

 {profile.currentLearningTrack && (
 <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-100 text-gray-800 text-sm font-medium mb-6 w-full">
 <Target className="w-4 h-4 text-now-primary" /> {profile.currentLearningTrack}
 </div>
 )}

 {isMyProfile && (
 <button 
 onClick={() => setIsEditModalOpen(true)}
 className="w-full text-center px-4 py-2 rounded-full font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 :bg-gray-900 transition-colors text-sm"
 >
 Edit Profile
 </button>
 )}
 </div>

 {/* ServiceNow Progress Card */}
 {(profile.servicenow?.currentCertificationGoal || profile.servicenow?.currentModule) && (
 <div className="pt-6 border-t border-gray-200 ">
 <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">ServiceNow Progress</h3>
 
 <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 ">
 {profile.servicenow.currentCertificationGoal && (
 <div className="mb-4">
 <div className="flex justify-between items-center mb-2">
 <span className="font-semibold text-sm">{profile.servicenow.currentCertificationGoal} Prep</span>
 <span className="text-xs font-bold text-now-primary">{profile.servicenow.learningProgress || 0}%</span>
 </div>
 <div className="w-full bg-gray-200 rounded-full h-1.5">
 <div 
 className="bg-now-primary h-1.5 rounded-full" 
 style={{ width: `${profile.servicenow.learningProgress || 0}%` }}
 ></div>
 </div>
 </div>
 )}
 
 {profile.servicenow.currentModule && (
 <div className="text-sm">
 <span className="block text-gray-500 mb-1">Current Module:</span>
 <span className="font-medium text-gray-800 ">{profile.servicenow.currentModule}</span>
 </div>
 )}
 </div>
 </div>
 )}

 {/* Learning Statistics */}
 <div className="pt-6 border-t border-gray-200 ">
 <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Learning Stats</h3>
 <div className="grid grid-cols-2 gap-4">
 <div className="flex flex-col">
 <span className="text-2xl font-black">{profile.posts?.length || 0}</span>
 <span className="text-xs text-gray-500 font-medium">Community Posts</span>
 </div>
 <div className="flex flex-col">
 <span className="text-2xl font-black">{profile.followers?.length || 0}</span>
 <span className="text-xs text-gray-500 font-medium">Followers</span>
 </div>
 <div className="flex flex-col">
 <span className="text-2xl font-black">{profile.lists?.reduce((acc: number, list: any) => acc + (list.posts?.length || 0), 0) || 0}</span>
 <span className="text-xs text-gray-500 font-medium">Bookmarks</span>
 </div>
 <div className="flex flex-col">
 <span className="text-2xl font-black">{profile.learningStreak || 0}</span>
 <span className="text-xs text-gray-500 font-medium">Day Streak</span>
 </div>
 </div>
 </div>

 {/* Certifications Showcase */}
 {(profile.servicenow?.csaStatus === 'Certified' || profile.servicenow?.cadStatus === 'Certified' || profile.servicenow?.itsmStatus === 'Certified' || (profile.certifications && profile.certifications.length > 0)) && (
 <div className="pt-6 border-t border-gray-200 ">
 <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Certifications</h3>
 <div className="flex flex-wrap gap-2">
 {profile.servicenow?.csaStatus === 'Certified' && <span className="px-3 py-1 bg-[#1A1A1A] text-white border border-[#333] rounded text-xs font-bold shadow-sm">CSA</span>}
 {profile.servicenow?.cadStatus === 'Certified' && <span className="px-3 py-1 bg-[#1A1A1A] text-white border border-[#333] rounded text-xs font-bold shadow-sm">CAD</span>}
 {profile.servicenow?.itsmStatus === 'Certified' && <span className="px-3 py-1 bg-[#1A1A1A] text-white border border-[#333] rounded text-xs font-bold shadow-sm">ITSM</span>}
 {profile.certifications?.map((cert: string, i: number) => (
 <span key={i} className="px-3 py-1 bg-gray-100 text-gray-800 rounded text-xs font-bold shadow-sm">{cert}</span>
 ))}
 </div>
 </div>
 )}

 </div>
 </div>
 </div>
 </div>

 {isEditModalOpen && (
 <EditProfileModal profile={profile} onClose={() => setIsEditModalOpen(false)} refetch={refetch} />
 )}
 </div>
 );
}

// Sub-components for tabs
function ProfileHomeTab({ profile }: { profile: any }) {
 const { data: postsData, isLoading } = useQuery({
 queryFn: () => httpRequest.get(`${url}/post/user/${profile._id}`),
 queryKey: ["post", "user", profile._id],
 });

 if (isLoading) {
 return <div className="py-12 text-center text-gray-500 ">Loading posts...</div>;
 }

 const posts = postsData?.data || [];

 if (posts.length === 0) {
 return (
 <div className="py-12 text-center border border-dashed border-gray-200 rounded-xl">
 <p className="text-gray-500 ">No posts published yet.</p>
 </div>
 );
 }

 return (
 <div className="space-y-6">
 {posts.map((post: any) => (
 <Post key={post._id} {...post} author={{ _id: profile._id, name: profile.name, avatar: profile.avatar }} />
 ))}
 </div>
 );
}

function ProfileActivityTab({ profile }: { profile: any }) {
 return (
 <div className="space-y-6">
 <div className="py-12 text-center border border-dashed border-gray-200 rounded-xl">
 <p className="text-gray-500 ">Activity timeline coming soon.</p>
 </div>
 </div>
 );
}

function ProfileProjectsTab({ profile }: { profile: any }) {
 return (
 <div className="space-y-6">
 <div className="py-12 text-center border border-dashed border-gray-200 rounded-xl">
 <p className="text-gray-500 ">Projects showcase coming soon.</p>
 </div>
 </div>
 );
}

function ProfileBookmarksTab({ profile }: { profile: any }) {
 // SavedSection component handles its own data fetching based on logged-in user
 return (
 <div className="space-y-6">
 <SavedSection userId={profile._id} />
 </div>
 );
}

function ProfileAboutTab({ profile }: { profile: any }) {
 return (
 <div className="space-y-10">
 
 {/* Social Links */}
 {(profile.socialLinks?.github || profile.socialLinks?.linkedin || profile.socialLinks?.portfolio || profile.socialLinks?.website) && (
 <div>
 <h3 className="text-lg font-bold mb-4">Connect</h3>
 <div className="flex flex-wrap gap-4">
 {profile.socialLinks?.github && (
 <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-now-primary transition-colors">
 <LinkIcon className="w-4 h-4" /> GitHub
 </a>
 )}
 {profile.socialLinks?.linkedin && (
 <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
 <LinkIcon className="w-4 h-4" /> LinkedIn
 </a>
 )}
 {profile.socialLinks?.portfolio && (
 <a href={profile.socialLinks.portfolio} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-now-primary transition-colors">
 <Briefcase className="w-4 h-4" /> Portfolio
 </a>
 )}
 {profile.socialLinks?.website && (
 <a href={profile.socialLinks.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-now-primary transition-colors">
 <ExternalLink className="w-4 h-4" /> Website
 </a>
 )}
 </div>
 </div>
 )}

 {/* About Me */}
 <div>
 <h3 className="text-lg font-bold mb-4">About Me</h3>
 {profile.aboutMe ? (
 <div className="prose max-w-none text-gray-700 leading-relaxed">
 {profile.aboutMe.split('\n').map((paragraph: string, i: number) => (
 <p key={i}>{paragraph}</p>
 ))}
 </div>
 ) : (
 <p className="text-gray-500 italic">No description provided.</p>
 )}
 </div>

 {/* Experience / Role */}
 {profile.currentRole && (
 <div>
 <h3 className="text-lg font-bold mb-4">Experience</h3>
 <div className="flex items-start gap-4">
 <div className="p-3 rounded-lg bg-gray-50 border border-gray-100 ">
 <Briefcase className="w-5 h-5 text-gray-500" />
 </div>
 <div>
 <h4 className="font-bold">{profile.currentRole}</h4>
 <p className="text-gray-500 text-sm">Current Role</p>
 </div>
 </div>
 </div>
 )}

 {/* Education */}
 {profile.college && (
 <div>
 <h3 className="text-lg font-bold mb-4">Education</h3>
 <div className="flex items-start gap-4">
 <div className="p-3 rounded-lg bg-gray-50 border border-gray-100 ">
 <GraduationCap className="w-5 h-5 text-gray-500" />
 </div>
 <div>
 <h4 className="font-bold">{profile.college}</h4>
 <p className="text-gray-500 text-sm">Institution</p>
 </div>
 </div>
 </div>
 )}

 {/* Skills */}
 {profile.skills && profile.skills.length > 0 && (
 <div>
 <h3 className="text-lg font-bold mb-4">Skills</h3>
 <div className="flex flex-wrap gap-2">
 {profile.skills.map((skill: string, i: number) => (
 <span key={i} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-md">
 {skill}
 </span>
 ))}
 </div>
 </div>
 )}

 </div>
 );
}

function ProfileInterviewsTab({ profile }: { profile: any }) {
 const { data, isLoading } = useQuery({
 queryFn: () => httpRequest.get(`${url}/interviews?author=${profile._id}`),
 queryKey: ["interviews", "user", profile._id],
 });

 if (isLoading) {
 return <div className="py-12 text-center text-gray-500 ">Loading interview experiences...</div>;
 }

 const experiences = data?.data?.experiences || [];

 if (experiences.length === 0) {
 return (
 <div className="py-12 text-center border border-dashed border-gray-200 rounded-xl">
 <p className="text-gray-500 ">No interview experiences shared yet.</p>
 </div>
 );
 }

 return (
 <div className="space-y-6">
 {experiences.map((exp: any) => (
 <div key={exp._id} className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:border-now-primary/50 transition-colors">
 <div className="flex items-center justify-between mb-3">
 <div className="flex flex-col">
 <Link to={`/interviews/${exp._id}`} className="text-lg font-bold hover:text-now-primary transition-colors">
 {exp.role} at {exp.company}
 </Link>
 <span className="text-sm text-gray-500 mt-1">{exp.experienceLevel} • {exp.difficulty}</span>
 </div>
 <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${exp.status === 'Approved' ? 'bg-green-100 text-green-700' : exp.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
 {exp.status}
 </span>
 </div>
 <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
 <span className="flex items-center gap-1">👀 {exp.views} Views</span>
 <span className="flex items-center gap-1">👍 {exp.likes?.length || 0} Likes</span>
 </div>
 </div>
 ))}
 </div>
 );
}
