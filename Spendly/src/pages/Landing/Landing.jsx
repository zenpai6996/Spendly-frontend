import React from 'react';
import InteractiveHero from '@/components/Landing/Hero';
import { useUserAuth } from '@/hooks/useUserAuth';
import { FeatureSteps } from '@/components/Landing/Demo';
import spendlybanner1 from "@/assets/images/banner2.png";
import spendlybanner2 from "@/assets/images/banner4.png";
import spendlybanner3 from "@/assets/images/banner5.png";
import { Footer } from '@/components/Landing/Footer';


const features = [
  { 
    step: 'Step 1', 
    title: 'Income',
    content: 'Start using Spendly by adding an Income source.', 
    image: spendlybanner1 
  },
  { 
    step: 'Step 2',
    title: 'Expense',
    content: 'Understand your spending habits through detailed graphs based on your expenses.',
    image: spendlybanner2
  },
  { 
    step: 'Step 3',
    title: 'SpendlyAI',
    content: 'Use SpendlyAI to gain key insights into your finances and saving rates',
    image: spendlybanner3
  },
]


export default function Landing() {
 useUserAuth();

  return (
    <div className='bg-[#111]'>
      <InteractiveHero />
      <FeatureSteps 
        id='demo'
        features={features}
        title="Demo"
        autoPlayInterval={3000}
        imageHeight="h-[640px]"
        className='bg-[#111111] '
      />
      <Footer/>

    </div>
  );
}
