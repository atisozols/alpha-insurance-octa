'use client';
import { useSpring, animated } from '@react-spring/web';
import { useCarRegistrationContext } from '@/context/CarRegistrationContext';

const CheckoutButton = () => {
  const { selectedOfferId, sortedOffersForDuration } = useCarRegistrationContext();

  const selectedOffer = sortedOffersForDuration.find((offer) => offer.id === selectedOfferId);
  const isFirstSelected =
    sortedOffersForDuration.length > 0 && sortedOffersForDuration[0]?.id === selectedOfferId;

  // Define background colors for light & dark mode
  const bgColor = isFirstSelected
    ? 'bg-emerald-300 hover:bg-emerald-400'
    : 'bg-blue-500 hover:bg-blue-600';
  const bgColorDark = isFirstSelected
    ? 'dark:bg-emerald-500 dark:hover:bg-emerald-600'
    : 'dark:bg-blue-700 dark:hover:bg-blue-800';

  // Define animation for the button
  const animationStyle = useSpring({
    transform: selectedOfferId ? 'translateY(0px)' : 'translateY(100px)',
    opacity: selectedOfferId ? 1 : 0,
    config: { tension: 170, friction: 26 },
  });

  if (!selectedOfferId) return null; // Do not render if no option is selected

  return (
    <animated.div
      style={animationStyle}
      className="fixed inset-x-0 bottom-10 flex items-start justify-center"
      onClick={() => console.log(`Proceeding with offer: ${selectedOfferId}`)}
    >
      <button
        className={`rounded-lg px-6 py-3 text-lg font-semibold shadow-lg transition-all duration-300 ${bgColor} text-white ${bgColorDark}`}
      >
        Apmaksāt: {selectedOffer.price.toFixed(2)} &euro;
      </button>
    </animated.div>
  );
};

export default CheckoutButton;
