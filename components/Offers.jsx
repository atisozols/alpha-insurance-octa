'use client';
import { useCarRegistrationContext } from '@/context/CarRegistrationContext';
import Image from 'next/image';
import Button3D from './Button3D';
import DurationButton from './DurationButton';

const Offers = () => {
  const {
    sortedOffersForDuration,
    loading,
    selectedOfferId,
    setSelectedOfferId,
    octaDuration,
    setOctaDuration,
  } = useCarRegistrationContext();

  if (!sortedOffersForDuration.length && !loading) return null;

  return (
    <div className="flex flex-col items-center gap-10 pb-32">
      <div className="flex gap-2">
        {[1, 3, 6, 9, 12].map((duration) => (
          <DurationButton
            key={duration}
            duration={duration}
            isSelected={octaDuration === duration}
            onClick={setOctaDuration}
          />
        ))}
      </div>

      {/* Offers Grid */}
      <div className="mx-auto grid w-64 justify-items-center gap-10 sm:w-full sm:grid-cols-2 md:grid-cols-3">
        {sortedOffersForDuration.map((offer, index) => (
          <Button3D
            key={offer.id}
            onClick={() => setSelectedOfferId(selectedOfferId === offer.id ? null : offer.id)}
            checked={selectedOfferId === offer.id}
            selected={selectedOfferId === offer.id}
            isFirst={index === 0} // Pass isFirst prop for custom border styling
          >
            <span className="text-4xl font-thin lg:text-5xl">
              <span className="font-black">{offer.price.toFixed(2)}</span> &euro;
            </span>
            <div className="flex h-full items-center justify-center">
              <Image
                src={`/${offer.id}.png`}
                className="h-10 w-auto flex-grow sm:h-8 dark:invert"
                width={140}
                height={140}
                alt={offer.id}
              />
            </div>
          </Button3D>
        ))}
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="flex items-center justify-center p-20">
          <span className="loading sm:loading-lg"></span>
        </div>
      )}
    </div>
  );
};

export default Offers;
