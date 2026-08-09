import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useAuth } from "./Auth";

type StudyTimeContextType = {
  totalSeconds: number;
  todaySeconds: number;
  weeklyData: number[]; // e.g. [Mon, Tue, Wed, Thu, Fri, Sat, Sun] in seconds
};

const StudyTimeContext = createContext<StudyTimeContextType>({
  totalSeconds: 0,
  todaySeconds: 0,
  weeklyData: [0, 0, 0, 0, 0, 0, 0],
});

export function useStudyTime() {
  return useContext(StudyTimeContext);
}

export function StudyTimeProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [todaySeconds, setTodaySeconds] = useState(0);
  const [weeklyData, setWeeklyData] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);

  // Load from local storage on mount
  useEffect(() => {
    const savedTotal = localStorage.getItem("nowscripts_study_total");
    if (savedTotal) setTotalSeconds(parseInt(savedTotal, 10));

    const savedToday = localStorage.getItem("nowscripts_study_today");
    const savedDate = localStorage.getItem("nowscripts_study_date");
    const today = new Date().toDateString();

    if (savedDate === today && savedToday) {
      setTodaySeconds(parseInt(savedToday, 10));
    } else {
      setTodaySeconds(0);
      localStorage.setItem("nowscripts_study_date", today);
      localStorage.setItem("nowscripts_study_today", "0");
    }
    
    const savedWeekly = localStorage.getItem("nowscripts_study_weekly");
    if (savedWeekly) {
      setWeeklyData(JSON.parse(savedWeekly));
    }
  }, []);

  // Timer logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isAuthenticated) {
      interval = setInterval(() => {
        // Only track if document is visible
        if (document.visibilityState === "visible") {
          setTotalSeconds((prev) => {
            const next = prev + 1;
            localStorage.setItem("nowscripts_study_total", next.toString());
            return next;
          });

          setTodaySeconds((prev) => {
            const next = prev + 1;
            localStorage.setItem("nowscripts_study_today", next.toString());
            return next;
          });
          
          setWeeklyData((prev) => {
            // Get current day index (0 = Monday, 6 = Sunday for our chart)
            let day = new Date().getDay() - 1;
            if (day === -1) day = 6; // Sunday
            
            const nextWeekly = [...prev];
            nextWeekly[day] += 1;
            localStorage.setItem("nowscripts_study_weekly", JSON.stringify(nextWeekly));
            return nextWeekly;
          });
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAuthenticated]);

  return (
    <StudyTimeContext.Provider value={{ totalSeconds, todaySeconds, weeklyData }}>
      {children}
    </StudyTimeContext.Provider>
  );
}
