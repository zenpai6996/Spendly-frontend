'use client';
import * as React from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

function CountingNumber({
  ref,
  number,
  fromNumber = 0,
  padStart = false,
  inView = false,
  inViewMargin = '0px',
  inViewOnce = true,
  decimalSeparator = '.',
  transition = { stiffness: 120, damping: 30 }, 
  decimalPlaces = 0,
  className,
  ...props
}) {
  const localRef = React.useRef(null);
  React.useImperativeHandle(ref, () => localRef.current);

  const getDuration = (num) => {
    const baseDuration = 1000; 
    const magnitude = Math.log10(Math.max(1, Math.abs(num)));
    const adjustedDuration = baseDuration * (1 - 0.3 * Math.min(magnitude / 6, 1));
    return Math.max(300, adjustedDuration); 
  };

  const motionVal = useMotionValue(fromNumber);
  const springVal = useSpring(motionVal, {
    ...transition,
    duration: getDuration(number) 
  });
  
  const inViewResult = useInView(localRef, {
    once: inViewOnce,
    margin: inViewMargin,
  });
  const isInView = !inView || inViewResult;

  React.useEffect(() => {
    if (isInView) {
      motionVal.set(number);
    }
  }, [isInView, number, motionVal]);

  React.useEffect(() => {
    const unsubscribe = springVal.on('change', (latest) => {
      if (localRef.current) {
        let formatted;
        
        if (Math.abs(number) >= 1000) {
          formatted = Math.round(latest).toLocaleString();
        } else {
          formatted = decimalPlaces > 0
            ? latest.toFixed(decimalPlaces)
            : Math.round(latest).toString();
          
          if (decimalPlaces > 0) {
            formatted = formatted.replace('.', decimalSeparator);
          }
        }

        if (padStart && Math.abs(number) < 1000) {
          const finalIntLength = Math.floor(Math.abs(number)).toString().length;
          const [intPart, fracPart] = formatted.split(decimalSeparator);
          const paddedInt = intPart?.padStart(finalIntLength, '0') ?? '';
          formatted = fracPart
            ? `${paddedInt}${decimalSeparator}${fracPart}`
            : paddedInt;
        }

        localRef.current.textContent = formatted;
      }
    });
    return () => unsubscribe();
  }, [springVal, decimalPlaces, padStart, number, decimalSeparator]);

  
  const initialText = (() => {
    if (Math.abs(number) >= 1000) {
      return '0'; 
    }
    return padStart
      ? '0'.padStart(Math.floor(Math.abs(number)).toString().length, '0') +
        (decimalPlaces > 0 ? decimalSeparator + '0'.repeat(decimalPlaces) : '')
      : '0' + (decimalPlaces > 0 ? decimalSeparator + '0'.repeat(decimalPlaces) : '');
  })();

  return (
    <span
      ref={localRef}
      data-slot="counting-number"
      className={className}
      {...props}
    >
      {initialText}
    </span>
  );
}

export { CountingNumber };