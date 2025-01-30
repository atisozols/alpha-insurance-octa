'use client';
import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useCarRegistrationContext } from '@/context/CarRegistrationContext';

const DurationButton = ({ duration, isSelected, onClick }) => {
  const { sortedOffersForDuration, selectedOfferId } = useCarRegistrationContext();

  // Check if the selected offer is the first (cheapest) one
  const isFirstSelected =
    sortedOffersForDuration.length > 0 && sortedOffersForDuration[0]?.id === selectedOfferId;

  // Border color logic
  const borderColor =
    isFirstSelected && isSelected
      ? 'border-emerald-300' // Light mode emerald border
      : isSelected
        ? 'border-blue-500' // Light mode blue border
        : 'border-[#eeeeee]';

  const borderColorDark =
    isFirstSelected && isSelected
      ? 'border-emerald-500' // Dark mode emerald border
      : isSelected
        ? 'border-blue-700' // Dark mode blue border
        : 'border-[#222222]';

  // React Spring animation for button press effect
  const animationStyle = useSpring({
    transform: isSelected ? 'translateY(3px)' : 'translateY(0px)',
    boxShadow: isSelected
      ? '0px 0px 0px #eeeeee, 0px 0px 0px #eeeeee' // Pressed state (flat)
      : '0px 4px 0px #eeeeee, 0px 6px 0px #eeeeee', // Default 3D effect (light)
    config: { tension: 250, friction: 15, duration: 100 },
  });

  const animationStyleDark = useSpring({
    transform: isSelected ? 'translateY(3px)' : 'translateY(0px)',
    boxShadow: isSelected
      ? '0px 0px 0px #222222, 0px 0px 0px #222222' // Pressed state (flat)
      : '0px 3px 0px #222222, 0px 3px 0px #222222', // Default 3D effect (dark)
    config: { tension: 250, friction: 15, duration: 100 },
  });

  return (
    <>
      {/* Light Mode Button */}
      <animated.button
        onClick={() => onClick(duration)}
        style={animationStyle}
        className={`relative flex h-12 w-12 items-center justify-center rounded-full border border-b-[1px] bg-background text-lg font-semibold transition-all duration-150 ${borderColor} dark:hidden`}
      >
        {duration}
      </animated.button>

      {/* Dark Mode Button */}
      <animated.button
        onClick={() => onClick(duration)}
        style={animationStyleDark}
        className={`relative hidden h-12 w-12 items-center justify-center rounded-full border border-b-[1px] bg-background text-lg font-semibold transition-all duration-150 ${borderColorDark} dark:flex`}
      >
        {duration}
      </animated.button>
    </>
  );
};

export default DurationButton;
