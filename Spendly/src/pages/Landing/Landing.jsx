

import React from 'react';
import InteractiveHero from '@/components/Landing/Hero';
import { useUserAuth } from '@/hooks/useUserAuth';

export default function Landing() {
 useUserAuth();

  return (
    <div>
      <InteractiveHero />

      {/* Optional: Add other sections of your page below the hero */}
      {/*
      <section className="py-16 bg-white text-black">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Features Section</h2>
          <p>More content goes here...</p>
        </div>
      </section>
      */}
    </div>
  );
}
