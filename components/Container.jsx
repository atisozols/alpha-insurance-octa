const Container = ({ children }) => {
  return (
    <div className="max-w-5xl p-5">
      <div className="flex flex-col gap-5">{children}</div>
    </div>
  );
};

export default Container;
