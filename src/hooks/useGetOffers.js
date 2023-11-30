import axios from 'axios';
import { useQuery } from 'react-query';

const getOffers = async () => {
  const response = await axios.get('https://developmentalsite-9a1468bb97a5.herokuapp.com/offers/');
  return response.data;
};

const useGetOffers = () => {
  return useQuery('getOffersList', getOffers);
};

export default useGetOffers;
