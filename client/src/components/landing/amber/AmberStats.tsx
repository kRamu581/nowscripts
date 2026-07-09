import { BookOpen, Laptop, Map, CalendarCheck } from "lucide-react";

export function AmberStats() {
  const stats = [
    {
      icon: <BookOpen className="w-8 h-8 text-[#FF5A3C]" />,
      value: "253+",
      label: "Interview Questions"
    },
    {
      icon: <Laptop className="w-8 h-8 text-[#FF5A3C]" />,
      value: "100+",
      label: "Practice Labs"
    },
    {
      icon: <Map className="w-8 h-8 text-[#FF5A3C]" />,
      value: "15+",
      label: "Learning Roadmaps"
    },
    {
      icon: <CalendarCheck className="w-8 h-8 text-[#FF5A3C]" />,
      value: "2025-2026",
      label: "Updated Content"
    }
  ];

  return (
    <section className="bg-white py-12 border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
          {stats.map((stat, idx) => (
            <div key={idx} className={`flex items-center gap-4 ${idx !== 0 ? 'md:pl-8' : ''} ${idx % 2 !== 0 ? 'pl-4 md:pl-8' : ''}`}>
              <div className="shrink-0 bg-[#FFF0ED] p-3 rounded-xl">
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl font-black text-gray-900 leading-tight">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-gray-500">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
