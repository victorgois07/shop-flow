import { Cart } from "./components";

function App() {
  return (
    <>
      <Cart
        cartItems={[]}
        onCheckout={() => {
          console.log("TESTE");
        }}
      />
    </>
  );
}

export default App;
