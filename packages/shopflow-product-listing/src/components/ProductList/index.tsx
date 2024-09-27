import { useCallback, useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import { ProductApi } from "./types";

export type ProductListProps = {
  onSelectProduct: (product: ProductApi) => void;
};

const ProductList = ({ onSelectProduct }: ProductListProps) => {
  const [products, setProducts] = useState<ProductApi[]>([]);

  const handleReload = useCallback(async () => {
    const data = await getProducts();
    setProducts(data);
  }, [setProducts]);

  useEffect(() => {
    handleReload();
  }, []);

  return (
    <div className="container mx-auto bg-white py-8 overflow-auto">
      <ul className="grid grid-cols-[minmax(auto,396px)_minmax(auto,396px)] md:grid-cols-[minmax(auto,396px)_minmax(auto,396px)_minmax(auto,396px)] gap-x-10 gap-y-14 justify-center relative pt-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 mb-10">
          <button
            onClick={handleReload}
            className="text-white p-3 rounded-full hover:shadow-md active:shadow-inner"
            style={{ background: "#02D72F" }}
          >
            Recarregar Produtos
          </button>
        </div>
        {products.slice(0, 6).map((product) => (
          <li
            key={product.id}
            className="flex flex-col justify-around border border-gray-300 rounded-xl py-2 px-8 w-96 max-h-[300px] max-w-[396px]"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-32 object-contain mb-5 mt-5"
            />
            <h2 className="text-[14px] text-black font-semibold mb-8 text-center">
              {product.title}
            </h2>
            <div className="flex justify-between mb-5">
              <p className="text-black text-lg font-bold">
                R${" "}
                {product.price
                  .toFixed(2)
                  .replace(".", ",")
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </p>
              <button
                className="text-white py-2 px-3 text-sm rounded-full hover:shadow-md active:shadow-inner"
                style={{ background: "#02D72F" }}
                onClick={() => onSelectProduct(product)}
              >
                COMPRAS
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
