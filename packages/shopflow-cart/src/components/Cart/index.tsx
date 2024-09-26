import { List } from "react-virtualized";
import "../../index.css";
import CartItem, { CartItemProps } from "../CartItem";

export type CartProps = {
  cartItems: Extract<CartItemProps, "item">[];
  onCheckout: () => void;
};

const Cart = ({ cartItems, onCheckout }: CartProps) => {
  return (
    <div className="fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg p-4">
      <h2 className="text-lg font-bold mb-4">Compras</h2>
      <div className="mb-4">
        <List
          height={400}
          width={300}
          rowCount={cartItems.length}
          rowHeight={50}
          rowRenderer={({ index, key }) => (
            <CartItem key={key} item={cartItems[index]} />
          )}
        />
      </div>
      <div className="flex justify-between items-center">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={onCheckout}
        >
          Concluir compra
        </button>
        <button className="text-gray-500">Cancelar</button>
      </div>
    </div>
  );
};

export default Cart;
