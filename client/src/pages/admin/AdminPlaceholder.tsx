import React from "react";
import { Wrench } from "lucide-react";

export default function AdminPlaceholder({ title }: { title: string }) {
  return (
    <div className="w-full h-full min-h-[60vh] flex flex-col items-center justify-center bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
      <div className="w-16 h-16 bg-now-primary/10 text-now-primary rounded-full flex items-center justify-center mb-6">
        <Wrench size={32} />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">{title}</h2>
      <p className="text-gray-500 max-w-md mx-auto">
        This module is currently under active development. Our engineering team is working hard to bring you advanced {title.toLowerCase()} capabilities soon.
      </p>
    </div>
  );
}
