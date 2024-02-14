import axios from 'axios';
import { useQuery } from 'react-query';

const getTrafficSource = async () => {
  const response = await axios.get('https://developmentalsite-9a1468bb97a5.herokuapp.com/traffic-source/get-all');
  return response.data;
};

const useGetTrafficSource = () => {
  return useQuery('getTrafficSourceList', getTrafficSource);
};

export default useGetTrafficSource;
