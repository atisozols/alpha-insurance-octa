'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { validateCarRegistration, validateCheckout } from '@/utils/validation';

const CarRegistrationContext = createContext();

export const CarRegistrationProvider = ({ children }) => {
  const [carData, setCarData] = useState({ reg: '', vin: '' });
  const [phone, setPhone] = useState({ country_code: '+371', number: '' });
  const [email, setEmail] = useState('');
  const [octaDuration, setOctaDuration] = useState(1);
  const [companies, setCompanies] = useState({});
  const [sortedOffersForDuration, setSortedOffersForDuration] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState({});
  const [error, setError] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const [selectedOfferId, setSelectedOfferId] = useState(null);

  const companyIds = process.env.NEXT_PUBLIC_INSURANCE_COMPANIES.split(',');

  const setCarDataValues = (reg, vin) => {
    setCarData({ reg, vin });
    setCompanies({});
    setSortedOffersForDuration([]);
  };

  const clearCarData = () => {
    setCarData({ reg: '', vin: '' });
    setCompanies({});
    setSortedOffersForDuration([]);
    setSelectedOfferId(null);
    setEmail('');
    setCheckoutError('');
  };

  useEffect(() => {
    if (!carData.reg || !carData.vin) return;

    const { error: validationError } = validateCarRegistration(carData);
    if (validationError) {
      setError(validationError.details[0].message);
      return;
    }

    setError(null);

    const fetchCompanyData = async (companyId) => {
      setLoadingCompanies((prev) => ({ ...prev, [companyId]: true }));

      try {
        const endpoint = process.env.NEXT_PUBLIC_SERVER_URL;
        const response = await fetch(`${endpoint}/api/auto/${companyId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(carData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || `Error fetching ${companyId}`);
        }

        setCompanies((prev) => ({ ...prev, [companyId]: data }));
      } catch (err) {
        console.error(`Error fetching ${companyId}:`, err);
        setError(err.message); // Store the backend error message in context
      } finally {
        setLoadingCompanies((prev) => ({ ...prev, [companyId]: false }));
      }
    };

    companyIds.forEach((companyId) => {
      if (!companies[companyId]) fetchCompanyData(companyId);
    });
  }, [carData]);

  useEffect(() => {
    if (Object.keys(companies).length > 0) {
      const sorted = Object.values(companies)
        .map((company) => ({
          id: company.id,
          price: company.prices[octaDuration.toString()],
          logo: company.logo,
          duration: octaDuration,
        }))
        .sort((a, b) => a.price - b.price);

      setSortedOffersForDuration(sorted);
    }
  }, [companies, octaDuration]);

  const handleCheckout = async () => {
    const sanitizedPhone = {
      country_code: phone.country_code.replace('+', ''),
      number: phone.number,
    };

    const { error } = validateCheckout({
      carData,
      email,
      phone: sanitizedPhone,
      selectedOfferId,
      octaDuration,
    });

    if (error) {
      setCheckoutError(error.details[0].message);
      return;
    } else {
      setCheckoutError('');
    }

    try {
      setCheckoutLoading(true);
      const endpoint = process.env.NEXT_PUBLIC_SERVER_URL;
      const response = await fetch(`${endpoint}/api/payment/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          carData,
          email,
          phone: sanitizedPhone,
          selectedOfferId,
          octaDuration,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Neizdevās veikt maksājumu`);
      }
      setCheckoutLoading(false);
      window.location.href = data.paymentLink;
    } catch (error) {
      setCheckoutError(error.message);
      setCheckoutLoading(false);
    }

    console.log({ carData, email, phone: sanitizedPhone, selectedOfferId, octaDuration });
  };

  return (
    <CarRegistrationContext.Provider
      value={{
        carData,
        phone,
        setPhone,
        email,
        setEmail,
        octaDuration,
        companies,
        sortedOffersForDuration,
        loadingCompanies,
        error,
        checkoutError,
        checkoutLoading,
        setCheckoutLoading,
        setCheckoutError,
        selectedOfferId,
        setSelectedOfferId,
        setCarDataValues,
        clearCarData,
        setOctaDuration,
        handleCheckout,
      }}
    >
      {children}
    </CarRegistrationContext.Provider>
  );
};

export const useCarRegistrationContext = () => {
  const context = useContext(CarRegistrationContext);
  if (!context) {
    throw new Error('useCarRegistrationContext must be used within a CarRegistrationProvider');
  }
  return context;
};
