import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";
import HERO_IMG from "../assets/HERO_IMG.jpeg";
import { APP_FEATURES } from "../utils/data";

const LandingPage = () => {
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);

  const handleCTA = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <div className="w-full bg-[#FFFCEF]">
        <div className="container mx-auto px-6 pt-6 pb-10">
          {/* Header */}
          <header className="flex justify-between items-center mb-10">
            <div className="text-xl font-bold text-black">
              Interview Prep AI
            </div>

            <button
              className="bg-gradient-to-r from-[#ffbd24] to-[#e99a4b] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-black hover:text-white transition-colors"
              onClick={() => setOpenAuthModal(true)}
            >
              Login / SignUp
            </button>
          </header>

          {/* Hero Section */}
          <div className="flex flex-col md:flex-row items-start gap-10">
            {/* LEFT */}
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 text-xs text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300 mb-4">
                <LuSparkles /> AI Powered
              </div>

              <h1 className="text-4xl font-semibold text-black leading-tight">
                Ace Interviews with <br />
                <span className="text-orange-500">AI Powered</span> Learning
              </h1>
            </div>

            {/* RIGHT */}
            <div className="md:w-1/2">
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
      {/* Image Section */}
      <div className="w-full mt-6 mb-16">
        <div className="container mx-auto">
          <section className="flex items-center justify-center">
            <img
              src={HERO_IMG}
              alt="hero"
              className="w-[70vw] rounded-lg shadow-lg"
            />
          </section>
        </div>
        <div className="w-full min-h-full bg-[#FFFCEF] mt-10">
          <div className="container mx-auto px-4 pt-10 pb-20">
            <section className="mt-5">
              <h2 className="text-2xl font-medium text-center mb-12">
                Features That Make You Shine
              </h2>
              <div className="flex flex-col items-center gap-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                  {APP_FEATURES.slice(0, 3).map((feature) => (
                    <div
                      key={feature.id}
                      className="bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100"
                    >
                      <h3 className="text-base font-semibold">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
                {/* Remaining card  */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {APP_FEATURES.slice(3).map((feature) => (
                    <div
                      key={feature.id}
                      className="bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100"
                    >
                      <h3 className="text-base font-semibold">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="text-sm bg-gray-50 text-secondary text-center p-5 mt-5">
          Made with happy coding
        </div>
      </div>
    </>
  );
};

export default LandingPage;
