import "../../index.css";
import CartButton from "../CartButton";
import Logo from "./logo.svg?react";

export type HeaderProps = {
  isSidebarOpen: boolean;
  setSidebar: (value: boolean) => void;
  itemCount: number;
};

const Header = ({ isSidebarOpen, setSidebar, itemCount }: HeaderProps) => {
  return (
    <header
      id="headerbg"
      className="p-0 h-16 flex justify-between items-center"
    >
      <Logo className="ml-12" />
      <CartButton
        onClick={() => setSidebar(!isSidebarOpen)}
        itemCount={itemCount}
      />
    </header>
  );
};

export default Header;
