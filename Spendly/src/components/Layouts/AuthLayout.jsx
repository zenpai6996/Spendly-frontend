import React, { useState, useEffect } from 'react'
import card from "../../assets/images/card2.png"
import {     
  LuWallet,          
  LuPiggyBank,              
  LuDollarSign,     
  LuArrowUpDown,     
  LuCircleDollarSign, 
  LuTrendingUp,      
  LuCreditCard,             
} from "react-icons/lu";
import { FaEgg } from "react-icons/fa"; 
import { GiRabbit } from 'react-icons/gi';

const funFacts = [
  "Did you know? The largest Easter egg ever made weighed over 7,000 kg!",
  "Hidden bonus: Click the egg for a surprise!",
  "Easter eggs in code are fun to find!",
  "🐣 You found the secret message!",
];

const luIcons = [
  LuWallet,
  LuPiggyBank,
  LuDollarSign,
  LuArrowUpDown,
  LuCircleDollarSign,
  LuTrendingUp,
  LuCreditCard
];

const AuthLayout = ({children}) => {
  const [randomValue, setRandomValue] = useState(0);
  const [RandomIcon, setRandomIcon] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * luIcons.length);
    setRandomIcon(() => luIcons[randomIndex]);
  }, []);
  
  useEffect(() => {
    const min = 100000;
    const max = 500000;
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandomValue(randomNum.toLocaleString()); 
  }, []);

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='w-full min-h-screen md:w-[60vw] px-4 sm:px-6 md:px-12 py-1 md:py-12 flex items-center justify-center'>
       
        {children}
      </div>
      
      <div className='hidden md:flex w-[40vw] h-screen bg-gradient-to-br from-green-100 to-emerald-200 dark:from-green-900 dark:to-emerald-950 p-8 relative overflow-hidden'>
        <div className='absolute w-full h-full inset-0 overflow-hidden'>
          <div className='w-48 h-48 rounded-[40px] bg-green-600/30 dark:bg-emerald-800/50 absolute -top-26 -left-5'/>
          <div className='w-48 h-48 border-[20px] rounded-[40px] border-green-800/30 dark:border-emerald-800/50 absolute top-[60%] left-140'/>
          <div className='w-48 h-48 rounded-[40px] bg-green-500/30 dark:bg-emerald-700/50 absolute -bottom-10 -left-15'/>
        </div>

        <div className='relative z-20 w-full mt-16'>
          <StatsInfoCard
            icon={RandomIcon ? <RandomIcon /> : null}
            label="Track your Income and Expenses"
            value={randomValue}
            colors="bg-primary"
          />
        </div>

        <img 
          src={card} 
          className='w-64 lg:w-[70%] absolute bottom-5 right-20 transform hover:scale-105 transition-transform duration-300'
          alt="Credit card illustration"
        />
      </div>
    </div>
  )
}

export default AuthLayout

export const StatsInfoCard = ({ icon, label, value, color }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFact, setShowFact] = useState(false);
  const [eggMode, setEggMode] = useState(false);

  const handleCardClick = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const handleMouseEnter = () => setShowFact(true);
  const handleMouseLeave = () => setShowFact(false);

  const handleEggClick = (e) => {
    e.stopPropagation();
    setEggMode(true);
    setTimeout(() => setEggMode(false), 3000);
  };

  const fact = funFacts[Math.floor(Math.random() * funFacts.length)];

  return (
    <div
      className={`
        relative overflow-hidden
        bg-gradient-to-br from-white/90 via-white/80 to-white/90
        dark:from-gray-800/90 dark:via-gray-800/80 dark:to-gray-800/90
        border-2 border-dashed border-green-300 dark:border-emerald-700
        rounded-3xl shadow-lg
        p-6 flex gap-6 items-center
        transition-all duration-300 ease-in-out
        hover:scale-[1.02] hover:shadow-xl hover:shadow-pink-400/20 dark:hover:shadow-emerald-500/20
        cursor-pointer
        backdrop-blur-sm
      `}
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `confetti-fall ${Math.random() * 3 + 2}s linear forwards`,
                opacity: 0,
                transform: 'translateY(-100vh)',
              }}
            />
          ))}
        </div>
      )}

      <div
        className={`
          w-14 h-14 flex items-center justify-center
          text-[28px] rounded-full
          bg-gradient-to-tr from-pink-300 via-yellow-200 to-green-200
          dark:from-pink-500 dark:via-yellow-400 dark:to-green-500
          shadow-lg border-4 border-white dark:border-gray-700
          relative
          transition-all duration-300
          hover:rotate-12
        `}
        onClick={handleEggClick}
        title="Click me for a surprise!"
      >
        {eggMode ? <GiRabbit className="text-pink-700 dark:text-pink-300" /> : icon || <FaEgg className="text-yellow-500 dark:text-yellow-300" />}
        
        <FaEgg className="absolute -bottom-2 -right-2 text-yellow-400 dark:text-yellow-300 text-xl opacity-60 hover:opacity-100 transition" />
      </div>

      <div>
        <h6 className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium tracking-wide">
          {label}
        </h6>
        <span className="text-xl font-bold text-green-700 dark:text-emerald-400">
          $ {value}
        </span>
      </div>

      {showFact && (
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full bg-white dark:bg-gray-800 border border-green-200 dark:border-emerald-700 rounded-lg px-4 py-2 text-xs text-gray-700 dark:text-gray-300 shadow-xl z-30 animate-bounce">
          {fact}
        </div>
      )}

      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            opacity: 1;
            transform: translateY(-100vh) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translateY(100vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};