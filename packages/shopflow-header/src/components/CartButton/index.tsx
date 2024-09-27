import "../../index.css";
import Menu from "./Menu.svg?react";

export type CartButtonProps = {
  itemCount: number;
  onClick: () => void;
};

const CartButton = ({ itemCount, onClick }: CartButtonProps) => {
  return (
    <button
      className="text-white p-0 rounded-full bg-gray-800 mr-12 relative"
      onClick={onClick}
    >
      <div className="absolute top-[-5px] right-[-5px] badge badge-error badge-sm">
        {itemCount}
      </div>
      <Menu />
    </button>
  );
};

export default CartButton;
