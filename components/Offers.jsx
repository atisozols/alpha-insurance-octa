'use client';
import { useCarRegistrationContext } from '@/context/CarRegistrationContext';
import Image from 'next/image';
import Button3D from './Button3D';
import DurationButton from './DurationButton';

const Offers = () => {
  const {
    carData,
    sortedOffersForDuration,
    loadingCompanies,
    selectedOfferId,
    setSelectedOfferId,
    octaDuration,
    setOctaDuration,
    error,
  } = useCarRegistrationContext();

  if (!carData.reg || !carData.vin) return null;

  const companyIds = process.env.NEXT_PUBLIC_INSURANCE_COMPANIES.split(',');

  if (error) {
    return (
      <div className="flex flex-col items-center gap-4 p-6">
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  const allOffers = companyIds.map((companyId) => {
    const offer = sortedOffersForDuration.find((o) => o.id === companyId);
    return {
      id: companyId,
      price: offer?.price ?? null,
      isLoading: loadingCompanies[companyId],
    };
  });

  const validOffers = allOffers.filter((offer) => offer.price !== null || offer.isLoading);

  const sortedOffers = validOffers.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));

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

      <div className="mx-auto grid w-64 justify-items-center gap-10 sm:w-full sm:grid-cols-2 md:grid-cols-3">
        {sortedOffers.length > 0 ? (
          sortedOffers.map((offer, index) => (
            <Button3D
              key={offer.id}
              onClick={() => setSelectedOfferId(selectedOfferId === offer.id ? null : offer.id)}
              checked={selectedOfferId === offer.id}
              selected={selectedOfferId === offer.id}
              isFirst={index === 0 && !offer.isLoading}
            >
              {offer.isLoading ? (
                <div className="flex h-16 items-center justify-center">
                  <span className="loading sm:loading-lg"></span>
                </div>
              ) : (
                <>
                  {offer.price !== null && (
                    <span className="text-4xl font-bold lg:text-5xl">
                      <span className="font-black">{offer.price.toFixed(2)}</span> &euro;
                    </span>
                  )}
                  <div className="flex h-full items-center justify-center">
                    <Image
                      src={`/${offer.id}.png`}
                      className="h-10 w-auto flex-grow sm:h-8"
                      width={140}
                      height={140}
                      alt={offer.id}
                    />
                  </div>
                </>
              )}
            </Button3D>
          ))
        ) : (
          <p className="text-gray-500">Nav pieejamu piedāvājumu.</p>
        )}
      </div>
    </div>
  );
};

export default Offers;
