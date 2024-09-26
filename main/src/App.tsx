import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "shopflow-shared";

const Cart = lazy(() => import("shopflowCart/Cart"));
const Footer = lazy(() => import("shopflowFooter/Footer"));
const Header = lazy(() => import("shopflowHeader/Header"));

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<div>Loading Remote Component...</div>}>
        <Header />
      </Suspense>
      <Suspense fallback={<div>Loading Remote Component...</div>}>
        <Cart cartItems={[]} onCheckout={() => {}} />
      </Suspense>
      <Suspense fallback={<div>Loading Remote Component...</div>}>
        <Footer />
      </Suspense>
    </Provider>
  );
}

export default App;
