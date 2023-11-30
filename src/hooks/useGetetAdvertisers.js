import axios from 'axios';
import { useQuery } from 'react-query';

const fetchAdvertisers = async () => {
  const response = await axios.get('https://developmentalsite-9a1468bb97a5.herokuapp.com/advertisers');
  return response.data;
};

const useGetAdvertisers = () => {
  return useQuery('getData', fetchAdvertisers);
};

export default useGetAdvertisers;
