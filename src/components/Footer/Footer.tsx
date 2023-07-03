import Logo from "../Logo/Logo";

const currentYear: number = new Date().getFullYear();

const Footer = () => {
    return (
      <div className="bg-gray-500 text-white py-4 px-6 fixed bottom-0 w-full flex justify-center">
        <span className="text-white text-lg">&copy; {currentYear}</span>              
      </div>
    );
  };
  
  export default Footer;