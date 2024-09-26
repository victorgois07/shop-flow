import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts(searchTerm);
      setProducts(data);
    };
  
    fetchData();
  }, [searchTerm]);

  return (
    <div className="container mx-auto p-10">
      <div>
        <h1 className="text-3xl font-bold mb-4">Lista de Produtos</h1>
        <div className="mb-4">
          <input 
            type="text" 
            value={searchTerm} 
            onChange={handleInputChange} 
            placeholder="Pesquise o que deseja"
            className="border p-2 rounded mr-2"
          />
        </div>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <li key={product.id} className="border rounded p-4">
            <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover" />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-green-600">Preço: R$ {product.price}</p>
            <a href={product.permalink} className="text-blue-500" target="_blank" rel="noopener noreferrer">
              Ver no Mercado Livre
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
