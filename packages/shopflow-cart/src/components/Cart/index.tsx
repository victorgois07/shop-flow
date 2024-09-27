import { ProductApi } from "shopflow-product-listing";
import "../../index.css";
import CartItem from "../CartItem";
import Close from "./Close.svg?react";

export type CartProps = {
  cartItems: Map<string, { product: ProductApi; quantity: number }>;
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  handleRemoveItem: (id: string) => void;
  onFinishSale: () => void;
};

const Cart = ({
  cartItems,
  isDrawerOpen,
  toggleDrawer,
  handleRemoveItem,
  onFinishSale,
}: CartProps) => {
  const totalItems = Array.from(cartItems.values()).reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const totalPrice = Array.from(cartItems.values()).reduce(
    (acc, { product, quantity }) => acc + product.price * quantity,
    0
  );

  return (
    <div className={`drawer drawer-end ${isDrawerOpen ? "open" : ""}`}>
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isDrawerOpen}
        onChange={toggleDrawer}
      />
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu bg-white text-base-content min-h-full max-w-[40vw] min-w-[627px] p-12 relative flex flex-col gap-4 shadow-lg rounded-lg">
          <button className="absolute top-4 right-4" onClick={toggleDrawer}>
            <Close className="w-6" />
          </button>

          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-black">Carrinho</h2>
              <h2 className="text-2xl text-black">{totalItems} Itens</h2>
            </div>
            <div className="divider mt-4"></div>
          </div>

          <div className="min-w-20 flex flex-col gap-4 flex-1 overflow-auto">
            {cartItems.size ? (
              Array.from(cartItems.entries()).map(([key, value]) => (
                <CartItem
                  key={key}
                  item={value.product}
                  quantity={value.quantity}
                  onRemove={handleRemoveItem}
                />
              ))
            ) : (
              <p className="text-center">Sem item no carrinho</p>
            )}
          </div>

          <div className="divider mb-2"></div>

          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-black">Total:</h2>
            <h2 className="text-lg font-bold text-black">
              R$ {totalPrice.toFixed(2)}
            </h2>
          </div>

          <div className="divider mb-2"></div>

          <div className="flex justify-between mt-4">
            <button
              className=" bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-5 rounded-full focus:outline-none"
              onClick={onFinishSale}
            >
              Concluir Compras
            </button>
            <button
              className=" text-black hover:text-gray-600 font-semibold py-3 px-5 focus:outline-none"
              onClick={toggleDrawer}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
