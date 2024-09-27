import "../../index.css";
import Logo from "./logo.svg?react";

const Footer = () => {
  return (
    <footer id="footercss" className="bg-white text-center text-black py-3 flex items-center space-x-7">
    <Logo className="h-12 ml-20" />
    <p className="mt-2 text-xs">© 2024 VR Benefícios - Todos os direitos reservados</p>
  </footer>
  );
};

export default Footer;
