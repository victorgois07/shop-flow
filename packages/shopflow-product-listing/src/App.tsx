import "./App.css";
import { ProductApi } from "./components";
import ProductList from "./components/ProductList";

function App() {
  return (
    <div className="App">
      <ProductList
        onSelectProduct={function (_product: ProductApi): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
}

export default App;
