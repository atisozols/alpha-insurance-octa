'use client';
import { useSpring, animated } from '@react-spring/web';
import { useCarRegistrationContext } from '@/context/CarRegistrationContext';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const CheckoutButton = () => {
  const { selectedOfferId, sortedOffersForDuration } = useCarRegistrationContext();
  const [showButton, setShowButton] = useState(false);

  const selectedOffer = sortedOffersForDuration.find((offer) => offer.id === selectedOfferId);

  useEffect(() => {
    setShowButton(!!selectedOfferId);
  }, [selectedOfferId]);

  const animationStyle = useSpring({
    transform: showButton ? 'translateY(0px)' : 'translateY(100px)',
    config: { tension: 170, friction: 26 },
  });

  if (!selectedOffer) return null;

  const isFirstSelected =
    sortedOffersForDuration.length > 0 && sortedOffersForDuration[0]?.id === selectedOfferId;

  const bgColor = isFirstSelected
    ? 'bg-emerald-300 hover:bg-emerald-400'
    : 'bg-blue-500 hover:bg-blue-600';
  const bgColorDark = isFirstSelected
    ? 'dark:bg-emerald-500 dark:hover:bg-emerald-600'
    : 'dark:bg-blue-700 dark:hover:bg-blue-800';

  return (
    <animated.div
      style={animationStyle}
      className="fixed inset-x-0 bottom-0 border-t border-t-[#eeeeee] bg-background p-5 text-lg sm:px-10 md:text-xl dark:border-t-[#222222]"
      onClick={() => console.log(`Proceeding with offer: ${selectedOfferId}`)}
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center sm:justify-between md:flex-row">
        <div className="flex w-full max-w-xs items-center justify-between gap-5 md:justify-normal">
          <Image
            src={selectedOffer.logo}
            alt={`${selectedOffer.id} logo`}
            width={100}
            height={100}
            className="h-12 w-auto dark:invert"
          />
          <div className="">
            {selectedOffer.duration} {selectedOffer.duration === 1 ? 'mēnesis' : 'mēneši'}:{' '}
            <span className="font-semibold">{selectedOffer.price} €</span>
          </div>
        </div>
        <button
          className={`mt-3 w-full max-w-xs cursor-pointer rounded-lg p-3 text-center font-semibold text-white md:mt-0 ${bgColor} ${bgColorDark}`}
        >
          Apmaksāt
        </button>
      </div>
    </animated.div>
  );
};

export default CheckoutButton;
