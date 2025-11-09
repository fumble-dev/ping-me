const EmptyChatContainer = () => {
  return (
    <div className="flex-1 bg-[#1c1d25] flex flex-col justify-center items-center transition-all duration-500">
      <div className="text-white flex flex-col gap-5 items-center text-center leading-snug">
        <h3 className="poppins-medium text-3xl lg:text-4xl font-semibold">
          Hi<span className="text-purple-500">!</span> Welcome to{" "}
          <span className="text-purple-500">Ping Me</span>
        </h3>
      </div>
    </div>
  );
};

export default EmptyChatContainer;
