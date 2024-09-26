import Logo from "./logo.svg?react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 p-4 text-center text-gray-500">
      <Logo className="h-8 mx-auto mb-2" />
      <p>© 2024 VR Benefícios - Todos os direitos reservados</p>
    </footer>
  );
};

export default Footer;
