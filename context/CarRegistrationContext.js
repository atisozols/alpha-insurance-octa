'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const CarRegistrationContext = createContext();

export const CarRegistrationProvider = ({ children }) => {
  const [carData, setCarData] = useState({ reg: '', vin: '' });
  const [octaDuration, setOctaDuration] = useState(1);
  const [companies, setCompanies] = useState([]);
  const [sortedOffersForDuration, setSortedOffersForDuration] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedOfferId, setSelectedOfferId] = useState(null);

  const setCarDataValues = (reg, vin) => {
    setCarData({ reg, vin });
  };

  const clearCarData = () => {
    setCarData({ reg: '', vin: '' });
    setCompanies([]);
    setSortedOffersForDuration([]);
    setSelectedOfferId(null);
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      if (!carData.reg || !carData.vin) return;

      setLoading(true);
      setError(null);

      const endpoint = process.env.NEXT_PUBLIC_SERVER_URL || '';
      console.log(endpoint);

      try {
        const response = await fetch(`${endpoint}/api/auto`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(carData),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setCompanies(data);
      } catch (err) {
        console.error('Error fetching companies:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [carData]);

  useEffect(() => {
    if (companies.length > 0) {
      const sorted = companies
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

  return (
    <CarRegistrationContext.Provider
      value={{
        carData,
        octaDuration,
        companies,
        sortedOffersForDuration,
        loading,
        error,
        selectedOfferId,
        setSelectedOfferId,
        setCarDataValues,
        clearCarData,
        setOctaDuration,
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
