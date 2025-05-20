'use client';
import { useSpring, animated } from '@react-spring/web';
import { useCarRegistrationContext } from '@/context/CarRegistrationContext';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import countryCodes from '@/utils/countryCodes';

const CheckoutButton = () => {
  const {
    email,
    setEmail,
    checkoutLoading,
    phone,
    setPhone,
    checkoutError,
    selectedOfferId,
    sortedOffersForDuration,
    handleCheckout,
  } = useCarRegistrationContext();

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
      className="fixed inset-x-0 bottom-0 flex flex-col gap-5 border-t border-t-[#eeeeee] bg-background p-5 text-lg sm:px-10 md:flex-row md:text-xl"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center sm:justify-between md:flex-row">
        <div className="flex w-full max-w-xs items-center justify-between gap-5 md:max-w-lg md:justify-normal">
          <Image
            src={selectedOffer.logo}
            alt={`${selectedOffer.id} logo`}
            width={100}
            height={100}
            className="h-12 w-auto"
          />
          <div className="w-full text-right">
            {selectedOffer.duration} {selectedOffer.duration === 1 ? 'mēnesis' : 'mēneši'}:{' '}
            <span className="whitespace-nowrap font-semibold">
              {selectedOffer.price.toFixed(2)} €
            </span>
          </div>
        </div>
      </div>

      {/* Phone Input Field */}
      <div className="mx-auto flex w-full max-w-xs flex-col gap-2 md:ml-auto">
        <div className="flex gap-2">
          <select
            className="w-28 rounded-md border bg-transparent p-3 text-lg"
            value={phone.country_code}
            onChange={(e) => setPhone({ ...phone, country_code: e.target.value })}
            name="tel-country-code"
            autoComplete="tel-country-code"
          >
            {countryCodes.map((country) => (
              <option key={country.code} value={country.dial_code}>
                {country.emoji} {country.dial_code}
              </option>
            ))}
          </select>

          <input
            type="tel"
            placeholder="Tālruņa numurs"
            className="w-full rounded-md border bg-transparent p-3 text-lg"
            value={phone.number}
            onChange={(e) => setPhone({ ...phone, number: e.target.value })}
            name="tel"
            autoComplete="tel"
          />
        </div>

        {/* Email Input Field */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ievadiet e-pastu"
          className="w-full rounded-md border bg-transparent p-3 text-lg"
          name="email"
          autoComplete="email"
        />

        {checkoutError && <p className="py-1 text-center text-sm text-red-500">{checkoutError}</p>}

        {/* Payment Button */}
        <button
          disabled={checkoutLoading}
          onClick={handleCheckout}
          className={`flex w-full max-w-xs cursor-pointer items-center justify-center rounded-lg p-3 text-center text-base font-semibold text-white md:mt-0 ${
            checkoutError ? 'bg-gray-400' : `${bgColor} ${bgColorDark}`
          }`}
        >
          {checkoutLoading ? <span className="loading"></span> : 'Apmaksāt'}
        </button>
      </div>
    </animated.div>
  );
};

export default CheckoutButton;
