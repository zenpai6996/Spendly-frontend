import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/utils/cn";
import { ShinyText } from "./Hero";
import { PinContainer } from "../ui/3d-pin";

interface Feature {
  step: string
  title?: string
  content: string
  image: string
}

interface FeatureStepsProps {
  id?: string,
  features: Feature[]
  className?: string
  title?: string
  autoPlayInterval?: number
  imageHeight?: string
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const featureCardVariants = {
  active: {
    scale: 1.02,
    transition: { duration: 0.3 }
  },
  inactive: {
    scale: 1,
    transition: { duration: 0.3 }
  }
};

export function FeatureSteps({
  id,
  features,
  className,
  title = "How to get Started",
  autoPlayInterval = 3000,
  imageHeight = "h-[400px]",
}: FeatureStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (autoPlayInterval / 100))
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length)
        setProgress(0)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [progress, features.length, autoPlayInterval]);

  return (
    <motion.div 
      id={id} 
      className={cn("p-8 md:p-12", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.h2 
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center"
          variants={itemVariants}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            className="items-center"
          >
            <ShinyText 
              text="Demo" 
              className="bg-[#1a1a1a] border border-gray-700 text-primary px-6 py-1 mb-15 rounded-full text-sm sm:text-xl font-medium cursor-pointer hover:border-primary/50 transition-colors" 
            />
          </motion.div>
        </motion.h2>

        <motion.div 
          className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10"
          variants={containerVariants}
        >
          <motion.div 
            className="order-2 md:order-1 space-y-8"
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-6 md:gap-8"
                initial={{ opacity: 0.3, x: -20 }}
                animate={{ 
                  opacity: index === currentFeature ? 1 : 0.3,
                  x: 0
                }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: index === currentFeature ? 1.02 : 1 }}
                variants={featureCardVariants}
              >
                <motion.div
                  className={cn(
                    "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2",
                    index === currentFeature
                      ? "bg-primary border-primary text-primary-foreground"
                      : "bg-muted border-muted-foreground",
                  )}
                  animate={{
                    scale: index === currentFeature ? 1.1 : 1,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                >
                  {index <= currentFeature ? (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-lg text-gray-50 font-bold"
                    >
                      ✓
                    </motion.span>
                  ) : (
                    <motion.span 
                      initial={{ opacity: 0.6 }}
                      animate={{ opacity: 1 }}
                      className="text-lg text-gray-50 font-semibold"
                    >
                      {index + 1}
                    </motion.span>
                  )}
                </motion.div>

                <motion.div 
                  className="flex-1"
                  variants={itemVariants}
                >
                  <motion.h3 
                    className="text-xl text-gray-50 md:text-2xl font-semibold"
                    whileHover={{ x: 5 }}
                  >
                    {feature.title || feature.step}
                  </motion.h3>
                  <motion.p 
                    className="text-sm text-gray-50 md:text-lg text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: index === currentFeature ? 1 : 0.6 }}
                  >
                    {feature.content}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

            <motion.div
            className={cn(
              "order-1 md:order-2 relative h-[200px] md:h-[300px] lg:h-[400px] overflow-hidden rounded-lg hidden md:block"
            )}
            variants={itemVariants}
          >
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={index}
                      className="absolute inset-0 rounded-lg overflow-hidden"
                      initial={{ y: 100, opacity: 0, rotateX: -20, scale: 0.9 }}
                      animate={{ 
                        y: 0, 
                        opacity: 1, 
                        rotateX: 0,
                        scale: 1,
                        transition: { 
                          type: "spring",
                          stiffness: 100,
                          damping: 10
                        }
                      }}
                      exit={{ 
                        y: -100, 
                        opacity: 0, 
                        rotateX: 20,
                        transition: { duration: 0.3 } 
                      }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <PinContainer title={feature.title}>
                        <motion.img
                        src={feature.image}
                        alt={feature.step}
                        className="w-full h-full object-center transition-transform transform"
                        width={1024}
                        height={500}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                      </PinContainer>
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-background via-background/50 to-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      />
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}