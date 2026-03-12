import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";
const LandingPage = () => {
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);

  const handleCTA = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <div className="w-full min-h-screen bg-[#FFFCEF]">
        <div className="container mx-auto px-6 pt-6 pb-32 relative">
          {/* Header */}
          <header className="flex justify-between items-center mb-16">
            <div className="text-xl font-bold text-black">
              Interview Prep AI
            </div>

            <button
              className="bg-linear-to-r from-[#ffbd24] to-[#e99a4b] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-black hover:text-white transition-colors"
              onClick={() => setOpenAuthModal(true)}
            >
              Login / SignUp
            </button>
          </header>

          {/* Hero Section */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2">
              <div className="inline-flex items-center gap-2 text-xs text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300 mb-4">
                <LuSparkles /> AI Powered
              </div>

              <h1 className="text-4xl font-semibold text-black mb-6 leading-tight">
                Ace Interviews with <br />
                <span className="text-orange-500">AI Powered</span> Learning
              </h1>

              <p className="text-gray-700 mb-6">
                Get role specific questions, expand answers when you need them,
                dive deeper into concepts, and organize everything your way.
                From preparation to mastery — your ultimate interview toolkit.
              </p>

              <button
                className="bg-black text-white px-7 py-3 rounded-full font-semibold hover:bg-orange-500 transition-colors"
                onClick={handleCTA}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full min-h-full relative z-10">
        <div className="">
          <section className="flex items-center justify-center -mt-36">
            <img src={HERO_IMG} alt="image" className="w-[80vw] rounded-lg" />
          </section>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
