import axios from 'axios';

const accessToken = 'YOUR_ACCESS_TOKEN';

export const getProducts = async (searchTerm) => {
  try {
    const response = await axios.get(
      `https://api.mercadolibre.com/sites/MLB/search?q=${searchTerm}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
};
