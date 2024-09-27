import { lazy, useState } from "react";
import { Provider } from "react-redux";
import { ProductApi } from "shopflow-product-listing";
import { store } from "shopflow-shared";
import { LazyWrapper, Toast } from "./components";

const Cart = lazy(() => import("shopflowCart/Cart"));

function App() {
  const [isSidebarOpen, setSidebar] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [cartItems, setCartItems] = useState<
    Map<string, { product: ProductApi; quantity: number }>
  >(new Map());

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const toggleDrawer = () => {
    setSidebar(!isSidebarOpen);
  };

  const headerProps = {
    isSidebarOpen: isSidebarOpen,
    setSidebar: setSidebar,
    itemCount: Array.from(cartItems.values()).reduce(
      (acc, item) => acc + item.quantity,
      0
    ),
  };

  const onSelectProduct = (product: ProductApi) => {
    setCartItems((prev) => {
      const newMap = new Map(prev);
      if (newMap.has(product.id)) {
        newMap.set(product.id, {
          product,
          quantity: newMap.get(product.id)!.quantity + 1,
        });
      } else {
        newMap.set(product.id, { product, quantity: 1 });
      }
      return newMap;
    });
    triggerToast("Item adicionado ao carrinho");
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => {
      const newMap = new Map(prev);
      if (newMap.has(id)) {
        const currentQuantity = newMap.get(id)!.quantity;
        if (currentQuantity > 1) {
          newMap.set(id, {
            product: newMap.get(id)!.product,
            quantity: currentQuantity - 1,
          });
        } else {
          newMap.delete(id);
        }
      }
      return newMap;
    });
    triggerToast("Item removido do carrinho");
  };

  const onFinishSale = () => {
    setCartItems(new Map());
    setSidebar(false);
    triggerToast("Compra concluída!");
  };

  return (
    <Provider store={store}>
      <div className="grid grid-rows-[auto_1fr_auto] w-full h-full">
        <LazyWrapper
          importPath={() => import("shopflowHeader/Header")}
          componentProps={headerProps}
        />
        <LazyWrapper
          importPath={() => import("shopflowProductListing/ProductList")}
          componentProps={{ onSelectProduct }}
        />
        <Cart
          cartItems={cartItems}
          setCartItems={setCartItems}
          isDrawerOpen={isSidebarOpen}
          toggleDrawer={toggleDrawer}
          handleRemoveItem={handleRemoveItem}
          onFinishSale={onFinishSale}
        />
        <LazyWrapper importPath={() => import("shopflowFooter/Footer")} />
        {showToast && <Toast message={toastMessage} />}
      </div>
    </Provider>
  );
}

export default App;
