import { ProductApi } from "shopflow-product-listing";
import "../../index.css";
import TrashIcon from "./trash.svg?react";

export type CartItemProps = {
  item: ProductApi;
  quantity: number;
  onRemove: (id: string) => void;
};

const CartItem = ({ item, quantity, onRemove }: CartItemProps) => {
  return (
    <div className="cart-item flex justify-between items-center py-3 px-4 border border-green-300 rounded-md">
      <img
        src={item.thumbnail}
        alt={item.title}
        className="w-[54px] h-[54px] rounded"
      />
      <p className="flex-1 ml-4 text-sm text-black max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
        {item.title}
      </p>
      <p className="text-sm font-semibold text-black">
        R$ {item.price.toFixed(2)} x {quantity}
      </p>

      <button
        onClick={() => onRemove(item.id)}
        className="ml-4 text-red-500 hover:text-red-700 focus:outline-none"
        aria-label="Remove item"
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default CartItem;
