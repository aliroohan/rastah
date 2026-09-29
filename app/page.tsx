"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhyRastah from "./components/WhyRastah";
import DemoClass from "./components/DemoClass";
import CourseDetails from "./components/CourseDetails";
import Tutor from "./components/Tutor";
import WhatsAppSection from "./components/WhatsAppSection";
import Footer from "./components/Footer";
import EnrollModal from "./components/EnrollModal";

export default function Home() {
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

  const handleOpenEnrollModal = () => {
    setIsEnrollModalOpen(true);
  };

  const handleCloseEnrollModal = () => {
    setIsEnrollModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* 1. Sticky Navigation Bar */}
      <Navbar onBuyClick={handleOpenEnrollModal} />

      {/* Main Landing Page Content */}
      <main className="flex-1">
        {/* 2. Hero Section with Interactive Live Store Simulation & CTAs */}
        <Hero onBuyClick={handleOpenEnrollModal} />

        {/* 3. Why Rastah Section */}
        <WhyRastah />

        {/* 4. Demo Class (YouTube Embed + Numbered Takeaways 01-05 + Buy Now Button) */}
        <DemoClass onBuyClick={handleOpenEnrollModal} />

        {/* 5. Course Details / Curriculum + "Get Your Course Now" Button */}
        <CourseDetails onBuyClick={handleOpenEnrollModal} />

        {/* 6. Tutor Section */}
        <Tutor />

        {/* 7. WhatsApp Contact Banner & Floating Quick Chat */}
        <WhatsAppSection />
      </main>

      {/* 8. Footer with Sections, Social Media (Insta, WhatsApp, Facebook, etc.) */}
      <Footer onBuyClick={handleOpenEnrollModal} />

      {/* 9. Interactive Enrolment & Checkout Modal for Rs. 2,000 */}
      <EnrollModal
        isOpen={isEnrollModalOpen}
        onClose={handleCloseEnrollModal}
      />
    </div>
  );
}
