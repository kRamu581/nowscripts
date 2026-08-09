import React from "react";
import ResumeCourseCard from "../components/dashboard/ResumeCourseCard";
import ProgressSummaryCard from "../components/dashboard/ProgressSummaryCard";
import ActivityStreakCard from "../components/dashboard/ActivityStreakCard";
import StudyStatisticsChart from "../components/dashboard/StudyStatisticsChart";
import TopCoursesCard from "../components/dashboard/TopCoursesCard";
import MotivationalBanner from "../components/dashboard/MotivationalBanner";
import GreetingCard from "../components/dashboard/GreetingCard";

export default function Dashboard() {
  return (
    <div className="min-h-[calc(100vh-64px)] lg:h-[calc(100vh-64px)] bg-[#FDFDFD] pt-6 pb-6 px-4 lg:px-8 overflow-y-auto lg:overflow-hidden">
      <div className="max-w-[1440px] mx-auto h-full">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
          
          {/* Left Column (Main Content) - span 8 on large screens */}
          <div className="lg:col-span-8 flex flex-col gap-6 lg:h-full">
            
            {/* Top Row: Greeting & Stats (2 columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:h-[260px]">
              <div className="h-[180px] md:h-full">
                <GreetingCard />
              </div>
              <div className="grid grid-cols-2 gap-4 md:gap-6 min-h-[280px] md:min-h-0 md:h-full">
                <ProgressSummaryCard />
                <ActivityStreakCard />
              </div>
            </div>

            {/* Bottom Row: Study Stats & Resume Course */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:flex-1 lg:min-h-0">
              <div className="md:col-span-7 h-[300px] lg:h-full">
                <StudyStatisticsChart />
              </div>
              <div className="md:col-span-5 h-[260px] lg:h-full">
                <ResumeCourseCard />
              </div>
            </div>

          </div>

          {/* Right Column (Sidebar) - span 4 on large screens */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:h-full">
            <div className="min-h-[240px] md:min-h-[280px] lg:flex-1 lg:min-h-0 h-auto lg:h-auto">
              <MotivationalBanner />
            </div>
            <div className="min-h-[380px] lg:flex-1 lg:min-h-0 h-auto lg:h-auto">
              <TopCoursesCard />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
