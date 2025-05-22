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
    <div className='flex'>
      <div className='w-screen h-screen md:w-[60vw] px-6 sm:px-8 md:px-12 pt-3 pb-12'>
        <h2 className='text-5xl  font-extrabold bg-gradient-to-r from-green-500 to-green-800 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_200%] text-center md:text-left '>
          Spendly
        </h2>
        {children}
      </div>
      <div className='hidden md:block w-[60vw] h-screen bg-green-200 bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative'>
        <div className='w-48 h-48 rounded-[40px] bg-green-600 absolute -top-26 -left-5'/>
        <div className='w-48 h-48 border-[20px] rounded-[40px] border-green-800 absolute top-[60%] left-140'/>
        <div className='w-48 h-48 rounded-[40px] bg-green-500 absolute -bottom-10 -left-15'/>

        <div className='grid grid-cols-1 z-20 cursor-pointer'>
          <StatsInfoCard
            icon={RandomIcon ? <RandomIcon /> : null}
            label="Track you Income and Expenses"
            value={randomValue}
            colors="bg-primary"
          />
        </div>

        <img 
          src={card} 
          className='w-64 lg:w-[70%] absolute bottom-5 right-20'
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

  // Easter egg: Show fun fact tooltip on hover
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
        bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100
        border-2 border-dashed border-green-300
        rounded-3xl shadow-2xl
        p-6 flex gap-6 items-center
        transition-all duration-500 ease-in-out
        hover:scale-105 hover:shadow-pink-400/40
        cursor-pointer
        cracked-egg-hover
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
          w-16 h-16 flex items-center justify-center
          text-[32px] rounded-full
          bg-gradient-to-tr from-pink-300 via-yellow-200 to-green-200
          shadow-lg border-4 border-white
          relative
          transition-all duration-300
          hover:rotate-12
        `}
        onClick={handleEggClick}
        title="Click me for a surprise!"
      >
        {eggMode ? <GiRabbit className="text-pink-700" /> : icon || <FaEgg className="text-yellow-500" />}
        
        <FaEgg className="absolute -bottom-2 -right-2 text-yellow-400 text-xl opacity-60 hover:opacity-100 transition" />
      </div>

      
      <div>
        <h6 className="text-xs text-gray-500 mb-1 font-mono tracking-wide">
          {label}
        </h6>
        <span className="text-[22px] font-extrabold text-green-700 drop-shadow-lg">
          $ {value}
        </span>
      </div>

      
      {showFact && (
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full bg-white border border-green-200 rounded-lg px-4 py-2 text-xs text-gray-700 shadow-xl z-30 animate-bounce">
          {fact}
        </div>
      )}

      
      <style >{`
        .cracked-egg-hover:hover {
          box-shadow: 0 0 0 4px #fff, 0 6px 24px 0 rgba(255, 192, 203, 0.3);
          background: repeating-linear-gradient(
            135deg,
            #fff,
            #fff 10px,
            #ffe4e6 10px,
            #ffe4e6 20px
          );
        }
        @keyframes confetti {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(2); }
        }
        .animate-confetti {
          background: url('/confetti.svg') center/cover no-repeat;
          animation: confetti 1.2s linear;
        }
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