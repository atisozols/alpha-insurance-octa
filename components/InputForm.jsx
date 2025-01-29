'use client';
import { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useCarRegistrationContext } from '@/context/CarRegistrationContext';
import Button3D from './Button3D';

const InputForm = () => {
  const { setCarDataValues, clearCarData, loading } = useCarRegistrationContext();
  const [reg, setReg] = useState('');
  const [vin, setVin] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const [isRowLayout, setIsRowLayout] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsRowLayout(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const animationStyle = useSpring({
    height: collapsed
      ? 0
      : isRowLayout
        ? 120 // Smaller height for flex-row layout
        : 220, // Default height for flex-col layout
    opacity: collapsed ? 0 : 1,
    overflow: 'hidden',
  });

  const handleSubmit = () => {
    if (reg && vin) {
      setCarDataValues(reg, vin);
      setCollapsed(true);
    }
  };

  const handleButtonClick = () => {
    setCollapsed(false);
    clearCarData();
  };

  return (
    <div className="flex flex-col gap-7 p-5">
      <animated.div style={animationStyle} className="w-full">
        <div
          className={`mx-auto mt-2 flex w-full max-w-md flex-col items-center gap-5 ${isRowLayout ? 'md:max-w-xl md:flex-row' : ''}`}
        >
          <div className="flex w-full flex-col items-start gap-3">
            <label htmlFor="reg" className="text-lg font-medium">
              Reģistrācijas numurs
            </label>
            <input
              id="reg"
              type="text"
              className="w-full rounded-md border bg-transparent p-3 text-lg dark:border-[#222222]"
              placeholder="AA1234"
              value={reg}
              onChange={(e) => setReg(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col items-start gap-3">
            <label htmlFor="vin" className="text-lg font-medium">
              Apliecības numurs
            </label>
            <input
              id="vin"
              type="text"
              className="w-full rounded-md border bg-transparent p-3 text-lg dark:border-[#222222]"
              placeholder="A123456789"
              value={vin}
              onChange={(e) => setVin(e.target.value)}
            />
          </div>
        </div>
      </animated.div>

      <button disabled={loading} className="mx-auto max-w-xl font-bold">
        {collapsed ? (
          <Button3D onClick={handleButtonClick} checked={true}>
            <div className="flex w-52 items-center justify-center gap-2 text-sm sm:w-96 sm:text-lg">
              <span>
                Reģ: <span className="font-bold text-foreground">{reg}</span>
              </span>
              <span>
                VIN: <span className="font-bold text-foreground">{vin}</span>
              </span>
            </div>
          </Button3D>
        ) : (
          <Button3D onClick={handleSubmit}>
            <span className="w-52 text-center text-sm sm:w-96 sm:text-lg">
              Apskatīt piedāvājumu
            </span>
          </Button3D>
        )}
      </button>
    </div>
  );
};

export default InputForm;
