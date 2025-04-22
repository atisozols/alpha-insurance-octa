'use client';
import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const Button3D = ({ children, onClick, checked = false, selected = false, isFirst = false }) => {
  const borderColor =
    isFirst && selected ? 'border-emerald-300' : selected ? 'border-blue-500' : 'border-[#eeeeee]';

  const borderColorDark =
    isFirst && selected ? 'border-emerald-500' : selected ? 'border-blue-700' : 'border-[#222222]';

  // React Spring animation for button press effect (Light Mode)
  const animationStyle = useSpring({
    transform: checked ? 'translateY(5px)' : 'translateY(0px)',
    boxShadow: checked
      ? '0px 0px 0px #eeeeee, 0px 0px 0px #eeeeee' // Pressed state (flat)
      : '0px 5px 0px #eeeeee, 0px 5px 0px #eeeeee', // Default 3D effect
    config: { tension: 250, friction: 15, duration: 100 },
  });

  // React Spring animation for button press effect (Dark Mode)
  const animationStyleDark = useSpring({
    transform: checked ? 'translateY(5px)' : 'translateY(0px)',
    boxShadow: checked
      ? '0px 0px 0px #222222, 0px 0px 0px #222222' // Pressed state (flat)
      : '0px 5px 0px #222222, 0px 5px 0px #222222', // Default 3D effect
    config: { tension: 250, friction: 15, duration: 100 },
  });

  return (
    <>
      {/* Light Mode Button */}
      <animated.div
        onClick={onClick}
        style={animationStyle}
        className={`button relative flex w-full cursor-pointer select-none flex-col items-center justify-start gap-10 rounded-lg border border-b-[1px] bg-background p-5 transition-all duration-150 ${borderColor}`}
      >
        {isFirst && (
          <span className="absolute -top-3 translate-x-0 rounded-xl bg-emerald-300 p-1 px-2 text-xs font-semibold">
            Izdevīgi
          </span>
        )}
        {children}
      </animated.div>

      {/* Dark Mode Button
      <animated.div
        onClick={onClick}
        style={animationStyleDark}
        className={`button relative hidden w-full cursor-pointer select-none flex-col items-center justify-start gap-10 rounded-lg border border-b-[1px] bg-background p-5 transition-all duration-150 ${borderColorDark} dark:flex`}
      >
        {isFirst && (
          <span className="absolute -top-3 translate-x-0 rounded-xl bg-emerald-500 p-1 px-2 text-xs text-white">
            Izdevīgi
          </span>
        )}
        {children}
      </animated.div> */}
    </>
  );
};

export default Button3D;
