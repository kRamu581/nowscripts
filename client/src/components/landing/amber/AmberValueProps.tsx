import { HeartHandshake, ThumbsUp, Heart, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export function AmberValueProps() {
  const props = [
    {
      icon: <HeartHandshake className="w-[42px] h-[42px] relative z-10 text-gray-800" strokeWidth={1.2} />,
      title: "Instant & Easy Enrollments",
      description: "Time is money. Save both when you enroll with us.."
    },
    {
      icon: <ThumbsUp className="w-[42px] h-[42px] relative z-10 text-gray-800" strokeWidth={1.2} />,
      title: "Best Value Guarantee",
      description: (
        <>
          Find a lower price and we'll match it. No questions asked.. <Link to="#" className="font-semibold underline text-gray-900 hover:text-now-primary">Learn More</Link>
        </>
      )
    },
    {
      icon: <Heart className="w-[42px] h-[42px] relative z-10 text-gray-800" strokeWidth={1.2} />,
      title: "24x7 Assistance",
      description: "If you have a doubt or a query, we're always a call away.."
    },
    {
      icon: <ShieldCheck className="w-[42px] h-[42px] relative z-10 text-[#00B67A]" strokeWidth={1.2} />,
      title: "100% Verified Internships",
      description: "We promise to deliver what you see on the website.."
    }
  ];

  return (
    <section className="bg-white py-20 border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-black text-[#0B2538] mb-3">Why Choose NowScripts</h2>
        <p className="text-gray-500 mb-14 text-[17px]">
          Take the hassle out of securing your internship for the best years of your life
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
          {props.map((prop, idx) => (
            <div key={idx} className="flex flex-col items-start gap-4">
              <div className="relative mb-1">
                {/* Pink glow effect similar to the screenshot */}
                <div className="absolute inset-0 bg-pink-300 blur-xl opacity-40 rounded-full w-10 h-10 top-1 left-1"></div>
                {prop.icon}
              </div>
              <div>
                <h3 className="font-bold text-[#0B2538] text-[17px] mb-2">{prop.title}</h3>
                <p className="text-gray-500 text-[15px] leading-relaxed">
                  {prop.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
