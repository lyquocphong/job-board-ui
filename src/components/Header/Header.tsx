import Logo from "../Logo/Logo";

const Header = () => {
  return (
    <header className="w-full bg-zinc-950 flex justify-center items-center mb-2 p-6 flex-col">
      <Logo alt="Logo" src="https://www.bolt.works/app/themes/bolt-works/dist/images/bolt-logo.svg" />
    </header>
  );
};

export default Header;