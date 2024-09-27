import { Cart } from "./components";

function App() {
  return (
    <>
      <Cart
        cartItems={[]}
        isDrawerOpen={false}
        toggleDrawer={function (): void {
          throw new Error("Function not implemented.");
        }}
        handleRemoveItem={function (id: number): void {
          throw new Error("Function not implemented.");
        }}
      />
    </>
  );
}

export default App;
