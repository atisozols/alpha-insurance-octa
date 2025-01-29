'use client';
import React from 'react';
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

  return (
    <>
      {/* Light Mode Button */}
      <button
        onClick={() => onClick(duration)}
        className={`relative flex h-12 w-12 items-center justify-center rounded-full border border-b-[1px] bg-background text-lg font-semibold transition-all duration-150 ${borderColor} ${
          isSelected
            ? 'translate-y-1 [box-shadow:0_0px_0_0_#eeeeee,0_0px_0_0_#eeeeee]' // Selected effect (pressed)
            : '[box-shadow:0_4px_0_0_#eeeeee,0_6px_0_0_#eeeeee] active:translate-y-1 active:[box-shadow:0_0px_0_0_#eeeeee,0_0px_0_0_#eeeeee]'
        } dark:hidden`}
      >
        {duration}
      </button>

      {/* Dark Mode Button */}
      <button
        onClick={() => onClick(duration)}
        className={`relative hidden h-12 w-12 items-center justify-center rounded-full border border-b-[1px] bg-background text-lg font-semibold transition-all duration-150 ${borderColorDark} ${
          isSelected
            ? 'translate-y-1 [box-shadow:0_0px_0_0_#222222,0_0px_0_0_#222222]' // Selected effect (pressed)
            : '[box-shadow:0_4px_0_0_#222222,0_6px_0_0_#222222] active:translate-y-1 active:[box-shadow:0_0px_0_0_#222222,0_0px_0_0_#222222]'
        } dark:flex`}
      >
        {duration}
      </button>
    </>
  );
};

export default DurationButton;
