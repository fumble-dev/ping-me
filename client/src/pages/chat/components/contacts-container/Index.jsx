import NewDm from "./components/new-dm/Index";
import ProfileInfo from "./components/profile-info/Index";

const ContactsContainer = () => {
  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] w-full bg-[#181920] border-r border-[#2f303b]">
      <div className="pt-3">
        <Logo />
      </div>

      <div className="my-6">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct Messages" />
          <NewDm/>
        </div>
      </div>

      <div className="my-6">
        <div className="flex items-center justify-between pr-10">
          <Title text="Channels" />
        </div>
      </div>

      <ProfileInfo />
    </div>
  );
};

export default ContactsContainer;

const Logo = () => {
  return (
    <div className="flex p-5 justify-start items-center gap-2">
      <svg
        id="logo-38"
        width="78"
        height="32"
        viewBox="0 0 78 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z" fill="#8338ec" />
        <path d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z" fill="#975aed" />
        <path d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z" fill="#a16ee8" />
      </svg>
      <span className="text-2xl font-semibold text-white tracking-wide">
        Ping Me
      </span>
    </div>
  );
};

const Title = ({ text }) => {
  return (
    <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-sm opacity-90">
      {text}
    </h6>
  );
};
