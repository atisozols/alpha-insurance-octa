'use client';

const Button3D = ({ children, onClick, checked = false, selected = false, isFirst = false }) => {
  const borderColor =
    isFirst && selected ? 'border-emerald-300' : selected ? 'border-blue-300' : 'border-[#eeeeee]';

  const borderColorDark =
    isFirst && selected ? 'border-emerald-500' : selected ? 'border-blue-700' : 'border-[#222222]';

  return (
    <>
      <div
        onClick={onClick}
        className={`button relative flex w-full cursor-pointer select-none flex-col items-center justify-start gap-10 rounded-lg border border-b-[1px] bg-background p-5 transition-all duration-150 ${
          checked
            ? 'translate-y-2 [box-shadow:0_0px_0_0_#eeeeee,0_0px_0_0_#eeeeee]'
            : '[box-shadow:0_5px_0_0_#eeeeee,0_8px_0_0_#eeeeee] active:translate-y-2 active:[box-shadow:0_0px_0_0_#eeeeee,0_0px_0_0_#eeeeee]'
        } ${borderColor} dark:hidden`}
      >
        {isFirst && (
          <span className="absolute -top-3 translate-x-0 rounded-xl bg-emerald-300 p-1 px-2 text-xs font-semibold">
            Izdevīgi
          </span>
        )}
        {children}
      </div>

      <div
        onClick={onClick}
        className={`button relative hidden w-full cursor-pointer select-none flex-col items-center justify-start gap-10 rounded-lg border border-b-[1px] bg-background p-5 transition-all duration-150 ${
          checked
            ? 'translate-y-2 [box-shadow:0_0px_0_0_#222222,0_0px_0_0_#222222]'
            : '[box-shadow:0_5px_0_0_#222222,0_8px_0_0_#222222] active:translate-y-2 active:[box-shadow:0_0px_0_0_#222222,0_0px_0_0_#222222]'
        } ${borderColorDark} dark:flex`}
      >
        {isFirst && (
          <span className="absolute -top-3 translate-x-0 rounded-xl bg-emerald-500 p-1 px-2 text-xs text-white">
            Izdevīgi
          </span>
        )}
        {children}
      </div>
    </>
  );
};

export default Button3D;
