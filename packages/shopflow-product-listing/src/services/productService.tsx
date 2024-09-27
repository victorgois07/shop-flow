import axios from "axios";
import { ProductApi } from "../components";

const accessToken = "YOUR_ACCESS_TOKEN";
const searchTerm = "eletronico";

export const getProducts = async () => {
  try {
    const response = await axios.get<{ results: ProductApi[] }>(
      `https://api.mercadolibre.com/sites/MLB/search?q=${searchTerm}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const products = response.data.results;
    return products.sort(() => 0.5 - Math.random());
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return [];
  }
};
