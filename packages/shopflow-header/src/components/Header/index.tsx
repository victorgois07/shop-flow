import Logo from "./logo.svg?react";

const Header = () => {
  return (
    <header className="bg-green-500 p-4 flex justify-between items-center">
      <Logo className="h-8" />
      <button className="text-white p-2 rounded-full bg-gray-800">
        <span className="material-icons">shopping_cart</span>
      </button>
    </header>
  );
};

export default Header;
