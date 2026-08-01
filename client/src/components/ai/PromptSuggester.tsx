import React from "react";
import { Lightbulb, Code, BookOpen, Target } from "lucide-react";

interface PromptSuggesterProps {
  onSelect: (prompt: string) => void;
}

const SUGGESTIONS = [
  {
    icon: <Code size={18} className="text-purple-500" />,
    title: "Explain Business Rules",
    prompt: "Can you explain ServiceNow Business Rules simply with an example?"
  },
  {
    icon: <Target size={18} className="text-orange-500" />,
    title: "Quiz me on App Engine",
    prompt: "Give me a quick 3-question multiple choice quiz on App Engine."
  },
  {
    icon: <Lightbulb size={18} className="text-amber-500" />,
    title: "I'm stuck in Flow Designer",
    prompt: "I'm stuck trying to build a flow in Flow Designer. Can you help me troubleshoot?"
  },
  {
    icon: <BookOpen size={18} className="text-emerald-500" />,
    title: "Give me today's study plan",
    prompt: "Based on my enrolled roadmap, what should I study today?"
  }
];

export default function PromptSuggester({ onSelect }: PromptSuggesterProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
      {SUGGESTIONS.map((s, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(s.prompt)}
          className="flex items-center gap-3 p-4 bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md hover:bg-blue-50/50 rounded-xl transition-all text-left group"
        >
          <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-white transition-colors">
            {s.icon}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-[14px]">{s.title}</p>
            <p className="text-xs text-gray-500 truncate max-w-[200px] sm:max-w-[250px]">{s.prompt}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
