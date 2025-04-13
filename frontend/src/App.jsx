import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function App() {
  const navg = useNavigate();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 7500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="h-screen relative overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
        <div className="absolute border-2 h-[40px] w-full border-b-amber-600 z-10"></div>
        {/* Animated Ball */}
        <div className="h-[100px] w-[100px] border-2 shadow-2xl shadow-gray-400 rounded-full main-ballAni absolute left-[1600px] top-[300px]"></div>

        {/* Main Content */}
        <div className="ml-[100px] mt-[150px] flex flex-col display relative">
          <h1 className="text-9xl font-sans font-stretch-expanded main-title">
            ScoreBoard
          </h1>
          <p className="text-4xl ml-2 font-mono main-promoline">
            Get Score of your Favourite Team
          </p>
        </div>

        {/* Left Button */}
        {showButton && (
          <div>
            <button
              className="absolute left-100 top-1/2 transform -translate-y-1/2 bg-[var(--primary)] text-[var(--primary-foreground)] px-6 py-3 rounded-full shadow-lg hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition duration-300"
              onClick={() => {
                navg("/match-finder");
              }}
            >
              &#8592; Match Finder
            </button>

            {/* Right Button */}
            <button className="absolute right-100 top-1/2 transform -translate-y-1/2 bg-[var(--primary)] text-[var(--primary-foreground)] px-6 py-3 rounded-full shadow-lg hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition duration-300" onClick={() => {
              navg('/live')
            }}>
              Live &#8594;
            </button>
          </div>
        )}
      </div>
    </>
  );
}
