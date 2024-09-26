import "../../index.css";

export type CartItemProps = {
  item: {
    image: string;
    name: string;
    price: number;
  };
};

const CartItem = ({ item }: CartItemProps) => {
  return (
    <div className="flex justify-between items-center border-b py-2">
      <img src={item.image} alt={item.name} className="w-12 h-12" />
      <p className="flex-1 ml-4">{item.name}</p>
      <span>R$ {item.price.toFixed(2)}</span>
    </div>
  );
};

export default CartItem;
