/// <reference types="vite/client" />
declare module "shopflowCart/Cart" {
  import shopflowCart from "shopflow-cart";
  export default shopflowCart.Cart;
}
declare module "shopflowCart/CartItem" {
  import shopflowCart from "shopflow-cart";
  export default shopflowCart.CartItem;
}
declare module "shopflowFooter/Footer" {
  const component: React.ComponentType<any>;
  export default component;
}
declare module "shopflowHeader/Header" {
  const component: React.ComponentType<any>;
  export default component;
}
declare module "shopflowProductListing/ProductList" {
  const component: React.ComponentType<any>;
  export default component;
}
